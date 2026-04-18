/* === THE KID REPORTER — Live News Ticker (kids tech & science) === */

(function () {
  'use strict';

  // ── RSS feeds for kids-friendly tech & science news ──────────────────────
  // We proxy through allorigins.win to bypass CORS on the client side.
  // Sources: NASA Breaking News, Science News for Students, Smithsonian Kids
  var FEEDS = [
    'https://www.nasa.gov/rss/dyn/breaking_news.rss',
    'https://www.sciencenewsforstudents.org/feed',
    'https://kids.nationalgeographic.com/feed/rss/'
  ];

  var PROXY = 'https://api.allorigins.win/get?url=';

  // Curated fallback headlines shown while loading (or if all feeds fail)
  var FALLBACKS = [
    'NASA\'s Perseverance rover spots ancient river delta on Mars 🚀',
    'Scientists teach robots to feel temperature just like human skin 🤖',
    'New AI can identify 10,000 species of plants from a single photo 🌱',
    'Middle schoolers build a satellite — and it actually launched! 🛸',
    'Researchers discover a black hole closer to Earth than ever recorded 🌌',
    'Teen inventor creates a water purifier from used plastic bottles ♻️',
    'Coral reefs growing back thanks to underwater 3D printers 🌊',
    'Scientists find a new color that the human eye has never seen before 👁️',
    'Young coders win world championship with a climate change game 💻',
    'A spider-inspired glue could replace stitches in surgery 🕷️',
  ];

  var tickerEl = document.getElementById('js-ticker');
  if (!tickerEl) return;

  // ── Helpers ───────────────────────────────────────────────────────────────
  function parseRSSItems(xmlText, maxItems) {
    try {
      var parser = new DOMParser();
      var doc    = parser.parseFromString(xmlText, 'application/xml');
      var items  = Array.from(doc.querySelectorAll('item')).slice(0, maxItems || 5);
      return items.map(function (item) {
        var title = item.querySelector('title');
        return title ? title.textContent.trim() : null;
      }).filter(Boolean);
    } catch (e) {
      return [];
    }
  }

  function isSafeForKids(title) {
    // Lightweight filter — skip headlines containing adult/violent topics
    var blocked = /\b(war|kill|murder|shoot|dead|death|terror|bomb|crash|gun|sex|drug)\b/i;
    return !blocked.test(title);
  }

  function renderTicker(headlines) {
    // Duplicate the list so the CSS marquee loops seamlessly
    var all = headlines.concat(headlines);
    tickerEl.innerHTML = all.map(function (h) {
      return '<li class="ticker-item">' + escapeHTML(h) + '</li>';
    }).join('');
  }

  function escapeHTML(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // ── Fetch one RSS feed via proxy ──────────────────────────────────────────
  function fetchFeed(feedUrl) {
    return fetch(PROXY + encodeURIComponent(feedUrl), { cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : Promise.reject(r.status); })
      .then(function (data) { return parseRSSItems(data.contents, 6); })
      .catch(function () { return []; });
  }

  // ── Main: fetch all feeds in parallel, merge, filter, render ─────────────
  function loadTicker() {
    // Show fallbacks immediately so the ticker isn't blank
    renderTicker(FALLBACKS);

    Promise.all(FEEDS.map(fetchFeed)).then(function (results) {
      var merged = [];
      results.forEach(function (items) {
        items.forEach(function (h) {
          if (isSafeForKids(h) && merged.indexOf(h) === -1) {
            merged.push(h);
          }
        });
      });

      // Only replace fallbacks if we got real headlines
      if (merged.length >= 3) {
        renderTicker(merged);
      }
    });
  }

  // ── Boot on DOMContentLoaded (already deferred since script is at bottom) ─
  loadTicker();

  // Refresh every 10 minutes
  setInterval(loadTicker, 10 * 60 * 1000);

})();
