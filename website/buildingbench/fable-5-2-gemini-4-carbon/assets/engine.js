"use strict";
// The 3D engine: one shared WebGL renderer, one scene per loaded submission,
// and a Viewer per canvas that keeps the same interface the prototype's
// procedural viewer had (rotationX / rotationY / zoom / paused / group /
// draw(dt) / destroy()), so the page code above it did not have to change.
//
// Every mesh drawn here is the building.glb an agent handed in to the
// benchmark, re-encoded for the page (textures at most 512 px, JPEG for
// opaque maps) and gzipped. Geometry is untouched.
(function () {
  const THREE = window.THREE, ADD = window.__ADDONS;
  const activeViewers = new Set();
  window.activeViewers = activeViewers;
  let lastFrame = performance.now();

  /* ------------------------------------------------------------ renderer */
  let gl = null, ENV = null;
  function renderer() {
    if (gl) return gl;
    gl = new THREE.WebGLRenderer({ antialias: true, alpha: true, premultipliedAlpha: true, powerPreference: "high-performance" });
    gl.setPixelRatio(1);
    gl.outputColorSpace = THREE.SRGBColorSpace;
    gl.toneMapping = THREE.NoToneMapping;
    gl.shadowMap.enabled = true;
    gl.shadowMap.type = THREE.PCFSoftShadowMap;
    gl.setClearColor(0x000000, 0);
    ENV = new THREE.PMREMGenerator(gl).fromScene(new ADD.RoomEnvironment(), 0.04).texture;
    return gl;
  }

  // The benchmark's own light rig (city_bench.building_light/1), the numbers
  // the board's renders use: sun in the south-east at 50 degrees, a pale sky,
  // and a muted environment. One rig for the page, moved into whichever scene
  // is being drawn.
  const RIG = (window.BB_DATA && window.BB_DATA.rig) || {};
  const RIG_GROUP = new THREE.Group();
  const SUN = new THREE.DirectionalLight(0xffffff, RIG.sun_intensity ?? 1.7);
  SUN.color.setRGB(...(RIG.sun_colour || [1, 0.97, 0.92]));
  SUN.castShadow = true;
  SUN.shadow.mapSize.set(1024, 1024);
  SUN.shadow.bias = -0.0006;
  SUN.shadow.normalBias = 0.02;
  const SKY = new THREE.HemisphereLight(0xbcd4f0, 0x6b6157, RIG.sky_intensity ?? 0.45);
  SKY.color.setRGB(...(RIG.sky_colour || [0.7, 0.8, 0.94]));
  SKY.groundColor.setRGB(...(RIG.ground_colour || [0.36, 0.34, 0.31]));
  // A ground that shows only the shadow that lands on it, so the page's own
  // background reads through everywhere else.
  const GROUND = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.ShadowMaterial({ opacity: 0.22, transparent: true }));
  GROUND.rotation.x = -Math.PI / 2;
  GROUND.receiveShadow = true;
  RIG_GROUP.add(SUN, SUN.target, SKY, GROUND);

  function rigFor(asset) {
    const reach = Math.max(RIG.reach_m || 400, asset.radius * 1.6);
    const az = THREE.MathUtils.degToRad(RIG.sun_azimuth_deg ?? 135), el = THREE.MathUtils.degToRad(RIG.sun_elevation_deg ?? 50);
    SUN.position.set(Math.cos(el) * Math.sin(az), Math.sin(el), -Math.cos(el) * Math.cos(az)).multiplyScalar(reach).add(asset.centre);
    SUN.target.position.copy(asset.centre);
    const s = SUN.shadow.camera, r = asset.radius * 1.15;
    s.left = -r; s.right = r; s.top = r; s.bottom = -r; s.near = 1; s.far = reach * 3;
    s.updateProjectionMatrix();
    GROUND.position.set(asset.centre.x, asset.floor, asset.centre.z);
    GROUND.scale.set(asset.radius * 8, asset.radius * 8, 1);
    asset.scene.add(RIG_GROUP);
  }

  /* -------------------------------------------------------------- assets */
  // BB_ASSETS maps a key to either a gzipped-base64 glb (the self-contained
  // page) or an assets/… path (the split copy for hosting). Same bytes, one
  // fetch earlier.
  const ASSETS = window.BB_ASSETS || {};
  const cache = new Map();       // key -> {promise, asset, refs, last}
  const loader = new ADD.GLTFLoader();
  const gunzip = buf => new Response(new Blob([buf]).stream().pipeThrough(new DecompressionStream("gzip"))).arrayBuffer();
  function bytesFor(key) {
    const src = ASSETS[key];
    if (!src) return Promise.reject(new Error("No submission asset for " + key));
    const fetched = src.lastIndexOf("assets/", 0) === 0 ? fetch(src) : fetch("data:application/octet-stream;base64," + src);
    return fetched.then(r => { if (!r.ok) throw new Error("HTTP " + r.status); return r.arrayBuffer(); }).then(gunzip);
  }
  function parse(buf) { return new Promise((resolve, reject) => loader.parse(buf, "", resolve, reject)); }
  function acquire(key) {
    let entry = cache.get(key);
    if (!entry) {
      entry = { refs: 0, last: performance.now(), asset: null };
      // A dropped connection is not a bad file: one retry, and a failure leaves
      // the cache so the next mount can try again.
      const attempt = () => bytesFor(key).then(parse);
      entry.promise = attempt().catch(() => new Promise(r => setTimeout(r, 1500)).then(attempt)).then(gltf => {
        const root = gltf.scene;
        root.traverse(node => { if (node.isMesh) { node.castShadow = true; node.receiveShadow = true; } });
        const box = new THREE.Box3().setFromObject(root);
        const centre = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const corners = [];
        for (const x of [box.min.x, box.max.x]) for (const y of [box.min.y, box.max.y]) for (const z of [box.min.z, box.max.z]) corners.push(new THREE.Vector3(x, y, z));
        const scene = new THREE.Scene();
        scene.environment = ENV || (renderer(), ENV);
        scene.environmentIntensity = RIG.environment_intensity ?? 0.4;
        scene.add(root);
        entry.asset = { key, root, scene, box, centre, corners, radius: Math.max(size.length() / 2, 1), floor: box.min.y };
        return entry.asset;
      });
      entry.promise.catch(() => { if (cache.get(key) === entry) cache.delete(key); });
      cache.set(key, entry);
    }
    entry.refs++; entry.last = performance.now();
    return entry;
  }
  function release(entry) { if (!entry) return; entry.refs = Math.max(0, entry.refs - 1); entry.last = performance.now(); evict(); }
  const KEEP = 40;
  function evict() {
    const idle = [...cache.values()].filter(e => e.refs === 0 && e.asset);
    if (cache.size <= KEEP) return;
    idle.sort((a, b) => a.last - b.last);
    for (const e of idle) {
      if (cache.size <= KEEP) break;
      e.asset.root.traverse(n => {
        if (!n.isMesh) return;
        n.geometry?.dispose();
        for (const m of [].concat(n.material || [])) { for (const s of ["map", "normalMap", "roughnessMap", "metalnessMap", "emissiveMap", "aoMap", "alphaMap"]) m[s]?.dispose(); m.dispose(); }
      });
      cache.delete(e.asset.key);
    }
  }

  /* -------------------------------------------------------------- viewer */
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  class Viewer {
    constructor(canvas, options = {}) {
      this.canvas = canvas;
      this.ctx = canvas.getContext("2d", { alpha: true });
      this.rotationY = options.rotationY ?? -0.65;
      this.rotationX = options.rotationX ?? 0.35;
      this.zoom = options.zoom ?? 1;
      this.centerX = options.centerX ?? 0.5;
      this.speed = options.speed ?? 0.22;
      this.group = options.group || null;
      this.paused = false; this.dragging = false; this.lastPointer = null;
      this.destroyed = false; this.hasDrawn = false; this.failed = null;
      this.camera = new THREE.PerspectiveCamera(36, 1, 0.1, 5000);
      this.entry = null; this.asset = null;
      this.bind();
      activeViewers.add(this);
      if (options.assetKey) this.load(options.assetKey);
    }
    load(key) {
      release(this.entry);
      this.entry = acquire(key); this.asset = null; this.failed = null;
      const entry = this.entry;
      entry.promise.then(asset => { if (this.entry === entry && !this.destroyed) { this.asset = asset; this.hasDrawn = false; } },
                         err => { if (this.entry === entry) { this.failed = err; console.error("BuildingBench: submission failed to load", key, err); } });
      return entry.promise;
    }
    bind() {
      this.onDown = e => { this.dragging = true; this.lastPointer = [e.clientX, e.clientY]; this.canvas.setPointerCapture?.(e.pointerId); };
      this.onMove = e => { if (!this.dragging) return; const dx = e.clientX - this.lastPointer[0], dy = e.clientY - this.lastPointer[1]; this.rotationY += dx * .012; this.rotationX = clamp(this.rotationX + dy * .008, -.05, 1.3); this.lastPointer = [e.clientX, e.clientY]; if (this.group) { this.group.rotationX = this.rotationX; this.group.rotationY = this.rotationY; } };
      this.onUp = () => { this.dragging = false; this.lastPointer = null; };
      this.onWheel = e => { e.preventDefault(); this.zoom = clamp(this.zoom - e.deltaY * .0007, .6, 2.2); if (this.group) this.group.zoom = this.zoom; };
      this.onKey = e => { const keys = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "+", "=", "-"]; if (!keys.includes(e.key)) return; e.preventDefault(); this.paused = true; if (e.key === "ArrowLeft") this.rotationY -= .12; if (e.key === "ArrowRight") this.rotationY += .12; if (e.key === "ArrowUp") this.rotationX = clamp(this.rotationX + .1, -.05, 1.3); if (e.key === "ArrowDown") this.rotationX = clamp(this.rotationX - .1, -.05, 1.3); if (e.key === "+" || e.key === "=") this.zoom = clamp(this.zoom + .08, .6, 2.2); if (e.key === "-") this.zoom = clamp(this.zoom - .08, .6, 2.2); if (this.group) Object.assign(this.group, { rotationX: this.rotationX, rotationY: this.rotationY, zoom: this.zoom, paused: true }); };
      this.canvas.addEventListener("wheel", this.onWheel, { passive: false }); this.canvas.addEventListener("keydown", this.onKey);
      this.canvas.addEventListener("pointerdown", this.onDown); this.canvas.addEventListener("pointermove", this.onMove); this.canvas.addEventListener("pointerup", this.onUp); this.canvas.addEventListener("pointercancel", this.onUp);
    }
    resize() {
      const rect = this.canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.round(rect.width * dpr)), h = Math.max(1, Math.round(rect.height * dpr));
      if (this.canvas.width !== w || this.canvas.height !== h) { this.canvas.width = w; this.canvas.height = h; }
      this.w = rect.width; this.h = rect.height; this.dpr = dpr;
    }
    // Orbit the model's centre. The distance is fitted to the bounding box
    // seen from this direction, not to the sphere, so a wide flat building
    // fills its card the way a tower does.
    aim() {
      const a = this.asset, cam = this.camera;
      const az = this.rotationY, el = this.rotationX;
      const dir = new THREE.Vector3(Math.cos(el) * Math.sin(az), Math.sin(el), Math.cos(el) * Math.cos(az)).normalize();
      const aspect = this.w / this.h;
      cam.aspect = aspect; cam.fov = 34;
      const vfov = THREE.MathUtils.degToRad(cam.fov), tanV = Math.tan(vfov / 2), tanH = tanV * aspect;
      const probe = new THREE.Object3D();
      probe.position.copy(a.centre).add(dir); probe.up.set(0, 1, 0); probe.lookAt(a.centre); probe.updateMatrixWorld();
      const right = new THREE.Vector3().setFromMatrixColumn(probe.matrixWorld, 0);
      const up = new THREE.Vector3().setFromMatrixColumn(probe.matrixWorld, 1);
      let dist = 0;
      for (const c of a.corners) { const q = c.clone().sub(a.centre); const z = q.dot(dir); dist = Math.max(dist, z + Math.abs(q.dot(right)) / tanH, z + Math.abs(q.dot(up)) / tanV); }
      dist = Math.max(dist * 1.08, a.radius * 0.2) / this.zoom;
      const target = a.centre.clone().addScaledVector(right, -(this.centerX - 0.5) * 2 * dist * tanH);
      cam.near = Math.max(0.1, dist / 200); cam.far = Math.max(2000, dist * 20 + a.radius * 4);
      cam.position.copy(target).addScaledVector(dir, dist);
      cam.up.set(0, 1, 0); cam.lookAt(target); cam.updateProjectionMatrix();
    }
    draw(dt) {
      if (this.destroyed || !this.canvas.isConnected) return;
      const rect = this.canvas.getBoundingClientRect();
      if (rect.width < 2 || rect.height < 2 || document.hidden) return;
      if (this.hasDrawn && !window.__BB_CAPTURE_ALL__ && (rect.bottom < 0 || rect.top > window.innerHeight)) return;
      this.resize();
      if (this.group) { this.rotationX = this.group.rotationX; this.rotationY = this.group.rotationY; this.zoom = this.group.zoom; }
      if (!this.group && !this.paused && !this.dragging && !reduced()) this.rotationY += this.speed * dt;
      const ctx = this.ctx, W = this.canvas.width, H = this.canvas.height;
      if (!this.asset) {
        if (this.hasDrawn) return;
        ctx.clearRect(0, 0, W, H);
        if (this.failed) { ctx.fillStyle = "#93673f"; ctx.font = `${Math.max(9, Math.round(10 * this.dpr))}px Arial`; ctx.textAlign = "center"; ctx.fillText("mesh unavailable", W / 2, H / 2); this.hasDrawn = true; }
        return;
      }
      const g = renderer();
      g.setSize(W, H, false);
      this.aim();
      rigFor(this.asset);
      g.render(this.asset.scene, this.camera);
      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(g.domElement, 0, 0, W, H, 0, 0, W, H);
      this.hasDrawn = true;
    }
    destroy() {
      this.destroyed = true; activeViewers.delete(this);
      release(this.entry); this.entry = null; this.asset = null;
      this.canvas.removeEventListener("pointerdown", this.onDown); this.canvas.removeEventListener("pointermove", this.onMove); this.canvas.removeEventListener("pointerup", this.onUp); this.canvas.removeEventListener("pointercancel", this.onUp); this.canvas.removeEventListener("wheel", this.onWheel); this.canvas.removeEventListener("keydown", this.onKey);
    }
  }
  window.GLBViewer = Viewer;
  window.destroyViewersWithin = root => { activeViewers.forEach(v => { if (root.contains(v.canvas)) v.destroy(); }); };
  window.BB_ENGINE = { cache, renderer, preload: key => acquire(key).promise.then(a => (release(cache.get(key)), a)) };

  /* ------------------------------------------------------------- the clock */
  function loop(now) {
    requestAnimationFrame(loop);
    if (now - lastFrame < 32) return;
    const dt = Math.min(.05, (now - lastFrame) / 1000); lastFrame = now;
    const groups = new Set([...activeViewers].filter(v => v.group && !v.destroyed).map(v => v.group));
    if (!document.hidden && !reduced()) groups.forEach(g => { if (!g.paused && ![...activeViewers].some(v => v.group === g && v.dragging)) g.rotationY += dt * .14; });
    activeViewers.forEach(v => { try { v.draw(dt); } catch (err) { v.failed = err; v.asset = null; console.error('BuildingBench: viewer draw failed', err); } });
  }
  requestAnimationFrame(loop);
})();
