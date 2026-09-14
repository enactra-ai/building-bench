
// The leaderboard, live: sortable columns, re-columning tabs, a search, and
// facet chips. Lifted from the benchmark site's own assets/site.js (the
// `[data-board]` block, its meters and its sliding tab indicator) and trimmed
// to what a section inside this page needs — no theme toggle, no lightbox, no
// build-stamp polling, none of which belong to a board embedded in a pitch.
(function () {
  'use strict';
  var RM = matchMedia('(prefers-reduced-motion:reduce)').matches;

  /* The bar under the sorted number arrives, unless the reader asked for no
     motion or the tab is hidden (a frozen animation never delivers a value). */
  function meters(scope) {
    (scope || document).querySelectorAll('.lb-meter').forEach(function (m, i) {
      m.style.setProperty('--d', Math.min(i, 24) * 18 + 'ms');
      m.classList.add('go');
      if (RM || document.hidden) { m.classList.add('shown'); return; }
      setTimeout(function () { m.classList.add('shown'); }, 900);
    });
  }

  /* The sliding underline on the track tabs. */
  function ink(box) {
    var mark = box.querySelector('.lb-ink');
    if (!mark) {
      mark = document.createElement('span');
      mark.className = 'lb-ink';
      box.insertBefore(mark, box.firstChild);
    }
    function to(el) {
      if (!el) return;
      mark.style.width = el.offsetWidth + 'px';
      mark.style.transform = 'translateX(' + el.offsetLeft + 'px)';
      mark.classList.add('ready');
    }
    var pick = function () {
      return box.querySelector('[aria-selected=true]') || box.querySelector('.on');
    };
    to(pick());
    box._inkTo = function () { to(pick()); };
    addEventListener('resize', box._inkTo);
    box.addEventListener('mouseleave', box._inkTo);
    Array.prototype.forEach.call(box.children, function (el) {
      if (el === mark) return;
      el.addEventListener('mouseenter', function () { to(el); });
    });
  }

  document.querySelectorAll('[data-board]').forEach(function (host) {
    var raw = document.getElementById(host.getAttribute('data-board'));
    if (!raw) return;
    var data;
    try { data = JSON.parse(raw.textContent); } catch (e) { return; }
    var cols = data.columns || [], rows = data.rows || [];
    var tracks = data.tracks || [{id: 'all', label: 'All',
                                  columns: cols.map(function (c) { return c.key; })}];
    var head = host.querySelector('thead'), body = host.querySelector('tbody');
    var tabs = host.querySelector('.lb-tracks');
    var search = host.querySelector('input[type=search]');
    var count = host.querySelector('.count');
    var more = host.querySelector('.lb-more');
    var empty = host.querySelector('.lb-empty');
    var state = {track: tracks[0].id, sort: data.sort || tracks[0].columns[0],
                 dir: -1, q: '', open: false, facets: {}};
    var PAGE = data.page || 15;

    function byKey(k) {
      for (var i = 0; i < cols.length; i++) if (cols[i].key === k) return cols[i];
      return null;
    }
    function shown() {
      var t = tracks.filter(function (x) { return x.id === state.track; })[0];
      return (t.columns || []).map(byKey).filter(Boolean);
    }
    function fmt(col, v) {
      if (v === null || v === undefined || v !== v)
        return '<span class="lb-none">' + (col.absent || '&ndash;') + '</span>';
      if (col.kind === 'text') return String(v);
      var dp = col.dp === undefined ? 3 : col.dp;
      var s = (typeof v === 'number')
        ? (dp === 0 ? Math.round(v).toLocaleString('en-US') : v.toFixed(dp))
        : String(v);
      return (col.pre || '') + s + (col.post || '');
    }
    /* The range a column's bar is drawn against, over every row — not just
       the ones on screen, so paging does not rescale the picture. */
    function span(col) {
      var vs = rows.map(function (r) { return r.values[col.key]; })
                   .filter(function (v) { return typeof v === 'number' && v === v; });
      if (!vs.length) return null;
      var lo = Math.min.apply(null, vs), hi = Math.max.apply(null, vs);
      if (col.floor !== undefined) lo = Math.min(lo, col.floor);
      return {lo: lo, hi: hi};
    }

    function draw(animate) {
      var use = shown();
      head.innerHTML = '<tr><th class="l rank">#</th><th class="l who">' +
        (data.who || 'model') + '</th>' + use.map(function (c) {
          var on = state.sort === c.key;
          return '<th' + (on ? ' aria-sort="' + (state.dir < 0 ? 'descending' :
            'ascending') + '"' : '') + ' data-k="' + c.key + '" title="' +
            (c.help || c.label) + '">' + c.label +
            '<span class="dir">' + (state.dir < 0 ? '↓' : '↑') +
            '</span></th>';
        }).join('') + '</tr>';
      head.querySelectorAll('th[data-k]').forEach(function (th) {
        th.addEventListener('click', function () {
          var k = th.getAttribute('data-k');
          if (state.sort === k) state.dir = -state.dir;
          else { state.sort = k; state.dir = (byKey(k) || {}).best === 'low' ? 1 : -1; }
          draw(true);
        });
      });

      var q = state.q.toLowerCase();
      var keep = rows.filter(function (r) {
        if (q && (r.label + ' ' + (r.sub || '') + ' ' + (r.org || ''))
                 .toLowerCase().indexOf(q) < 0) return false;
        for (var f in state.facets) {
          if (!state.facets[f] || !state.facets[f].length) continue;
          if (state.facets[f].indexOf(String(r.facets && r.facets[f])) < 0)
            return false;
        }
        return true;
      });
      keep.sort(function (a, b) {
        var x = a.values[state.sort], y = b.values[state.sort];
        var xn = typeof x === 'number' && x === x, yn = typeof y === 'number' && y === y;
        if (!xn && !yn) return 0;
        if (!xn) return 1;          /* a missing number sorts last either way */
        if (!yn) return -1;
        return (x - y) * state.dir;
      });
      var cut = state.open ? keep.length : Math.min(keep.length, PAGE);
      var bars = {};
      use.forEach(function (c) { if (c.bar) bars[c.key] = span(c); });

      body.innerHTML = keep.slice(0, cut).map(function (r, i) {
        var cells = use.map(function (c) {
          var v = r.values[c.key];
          var lead = c.key === state.sort;
          var band = (r.band || {})[c.key];
          var s = '<td' + (c.kind === 'text' ? ' class="l"' : '') + '>' +
            '<span class="' + (lead ? 'lb-lead' : '') + '">' + fmt(c, v) + '</span>' +
            (band ? '<span class="lb-band">&plusmn;' + band.toFixed(c.dp === undefined
              ? 3 : c.dp) + '</span>' : '');
          /* A bar under every number in every column drew the table twice.
             Only the column being sorted on gets one, and only a hairline. */
          if (c.bar && lead && bars[c.key] && typeof v === 'number' && v === v) {
            var sp = bars[c.key], k = sp.hi === sp.lo ? 1
              : (v - sp.lo) / (sp.hi - sp.lo);
            if (c.best === 'low') k = 1 - k;
            s += '<div class="lb-meter" style="--fill:' +
                 Math.max(0.02, Math.min(1, k)).toFixed(3) + '"><i style="background:' +
                 (r.series ? 'var(--series-' + r.series + ', var(--accent))' : 'var(--accent)') +
                 '"></i></div>';
          }
          return s + '</td>';
        }).join('');
        var who = '<div class="lb-who">' +
          (r.series ? '<i style="background:var(--series-' + r.series +
            ', var(--accent))"></i>' : '') +
          '<span><b>' + r.label + '</b>' +
          (r.tags || (r.tag ? [{text: r.tag, kind: r.tagkind}] : []))
            .map(function (t) {
              return '<span class="lb-tag' + (t.kind ? ' ' + t.kind : '') +
                     '">' + t.text + '</span>'; }).join('') +
          (r.sub ? '<em>' + r.sub + '</em>' : '') + '</span></div>';
        return '<tr' + (r.optimal ? ' class="opt"' : '') + ' style="--i:' + i + '">' +
          /* The position in the current sort, nothing more. The source board
             prints its statistical "place" here (1,1,2,4,4,...), a number
             whose convention needs its own page to explain; out of that
             context it reads as a broken ranking. The uncertainty the places
             encoded still shows — as the ± bands, and in the note below. */
          '<td class="l rank">' + (i + 1) + '</td>' +
          '<td class="l who">' + who + '</td>' + cells + '</tr>';
      }).join('');

      if (animate && !RM) {
        body.classList.remove('lb-in');
        void body.offsetWidth;
        body.classList.add('lb-in');
      }
      meters(body);
      if (empty) empty.hidden = keep.length > 0;
      if (count) count.textContent = keep.length
        ? 'Showing ' + Math.min(cut, keep.length) + ' of ' + keep.length +
          (data.noun ? ' ' + data.noun : '')
        : '';
      if (more) {
        more.hidden = keep.length <= PAGE;
        more.textContent = state.open ? 'Show fewer'
          : '+ Show ' + (keep.length - PAGE) + ' more';
      }
    }

    if (tabs) {
      ink(tabs);
      tabs.querySelectorAll('button[data-track]').forEach(function (b) {
        b.addEventListener('click', function () {
          state.track = b.getAttribute('data-track');
          var t = tracks.filter(function (x) { return x.id === state.track; })[0];
          if (t && t.sort) {
            state.sort = t.sort;
            state.dir = (byKey(t.sort) || {}).best === 'low' ? 1 : -1;
          } else if (t && (t.columns || []).indexOf(state.sort) < 0) {
            state.sort = t.columns[0];
          }
          tabs.querySelectorAll('button[data-track]').forEach(function (o) {
            o.setAttribute('aria-selected', o === b ? 'true' : 'false'); });
          if (tabs._inkTo) tabs._inkTo();
          draw(true);
        });
      });
    }
    if (search) {
      var timer = null;
      search.addEventListener('input', function () {
        clearTimeout(timer);
        timer = setTimeout(function () { state.q = search.value; draw(true); }, 110);
      });
    }
    if (more) more.addEventListener('click', function () {
      state.open = !state.open; draw(true); });

    /* Facet chips scoped to this board's own section, so a second board on
       the page could not be filtered by the wrong row of chips. */
    var scope = host.closest('.subsection') || document;
    scope.querySelectorAll('[data-facet]').forEach(function (b) {
      b.addEventListener('click', function () {
        var f = b.getAttribute('data-facet'), v = b.getAttribute('data-value');
        var list = state.facets[f] || (state.facets[f] = []);
        var at = list.indexOf(v);
        if (at < 0) list.push(v); else list.splice(at, 1);
        b.setAttribute('aria-pressed', at < 0 ? 'true' : 'false');
        draw(true);
      });
    });
    var clear = scope.querySelector('[data-facet-clear]');
    if (clear) clear.addEventListener('click', function () {
      state.facets = {}; state.q = '';
      if (search) search.value = '';
      scope.querySelectorAll('[data-facet]').forEach(function (b) {
        b.setAttribute('aria-pressed', 'false'); });
      draw(true);
    });

    draw(false);
    host.setAttribute('data-ready', '1');
  });
})();

