
// The leaderboard's two figures, live: hover or focus a bar or a dot and it
// names the model and everything measured about it. Lifted from the benchmark
// site's own assets/site.js (its `.lb-plot[data-plot]` block), trimmed to one
// plot on one page. The source's entrance animation is left behind with it —
// the chart is drawn as soon as it is on the page.
(function () {
  'use strict';
  document.querySelectorAll('[data-plot]').forEach(function (box) {
    var tip = box.querySelector('.lb-tip');
    if (!tip) return;
    /* Out of the card it was drawn in, and onto the page: it is positioned in
       viewport coordinates from here on, so a card that clips its children
       cannot cut the tooltip in half. */
    /* ... inside a host of its own that carries the .ea class, so the pitch CSS scoped
       under .ea still reaches it once it has left the card. */
    var host = document.getElementById('ea-tip-host');
    if (!host) { host = document.createElement('div'); host.id = 'ea-tip-host'; host.className = 'ea';
                 document.body.appendChild(host); }
    host.appendChild(tip);

    function show(node) {
      var name = node.getAttribute('data-name') || '';
      var rows;
      try { rows = JSON.parse(node.getAttribute('data-tip') || '[]'); }
      catch (e) { rows = []; }
      tip.innerHTML = '<b>' + name + '</b><dl>' + rows.map(function (r) {
        return '<dt>' + r[0] + '</dt><dd>' + r[1] + '</dd>';
      }).join('') + '</dl>';
      /* point at the mark itself -- a bar's column hit area runs the full height of the chart */
      var r = (node.querySelector('.bar, .chip') || node).getBoundingClientRect();
      tip.classList.remove('below');
      tip.style.left = (r.left + r.width / 2) + 'px';
      tip.style.top = r.top + 'px';
      tip.classList.add('on');
      /* Where it will BE, computed from its own size and the percentages in
         the stylesheet — not read back off getBoundingClientRect(). The
         transform is animated, so measuring it in the same tick returns
         wherever the transition happens to be, and the flip decision would
         then be made from a box that is still moving. */
      var w = tip.offsetWidth, h = tip.offsetHeight;
      if (r.top - h * 1.24 < 6) {
        tip.classList.add('below');
        tip.style.top = r.bottom + 'px';
      }
      var left = (r.left + r.width / 2) - w / 2, edge = 8, shift = 0;
      if (left < edge) shift = edge - left;
      else if (left + w > window.innerWidth - edge)
        shift = window.innerWidth - edge - (left + w);
      if (shift) tip.style.left = (parseFloat(tip.style.left) + shift) + 'px';
      box.querySelectorAll('.node').forEach(function (n) {
        n.classList.toggle('dim', n !== node); });
      node.classList.add('hot');
    }
    function hide() {
      tip.classList.remove('on');
      box.querySelectorAll('.node').forEach(function (n) {
        n.classList.remove('dim'); n.classList.remove('hot'); });
    }
    box.querySelectorAll('.node').forEach(function (n) {
      n.addEventListener('mouseenter', function () { show(n); });
      n.addEventListener('focus', function () { show(n); });
      n.addEventListener('mouseleave', hide);
      n.addEventListener('blur', hide);
    });
    box.addEventListener('mouseleave', hide);
    /* Fixed to the viewport, so it does not travel with the point it belongs
       to: a scroll would leave it pointing at whatever moved underneath. */
    window.addEventListener('scroll', hide, {passive: true});
    window.addEventListener('resize', hide);

  });
})();

