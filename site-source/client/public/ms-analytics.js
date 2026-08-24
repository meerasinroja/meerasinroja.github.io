/* Meera Social page analytics — beacons views / time / clicks / mouse heat to BrandHub Pro.
   Pitch pages set window.MS_SLUG before loading this; every other page reports as site:<path>.
   Add ?heat=1&key=<maintenance key> to any page URL to draw its heat map overlay in place. */
(function () {
  var API = "https://brandhub-pro-claude-production.up.railway.app";
  var SLUG = (window.MS_SLUG || ("site:" + ((location.pathname || "/").replace(/\/+$/, "") || "/"))).toLowerCase();
  var vid;
  try {
    vid = localStorage.getItem("ms_vid");
    if (!vid) { vid = Math.random().toString(36).slice(2) + Date.now().toString(36); localStorage.setItem("ms_vid", vid); }
  } catch (e) { vid = "anon"; }

  // Her own browsers never count as brand views: opening any page once with ?me=1 (or the
  // ?heat=1 heat-map view) marks this browser as the owner and it stops reporting for good.
  var P0 = new URLSearchParams(location.search), isOwner = false;
  try {
    if (P0.get("me") === "1" || P0.get("heat") === "1") {
      localStorage.setItem("ms_owner", "1");
      // Analytics exclusion above is deliberately global (her clicks never count anywhere).
      // The per-page hidden-content reveal must NOT reuse that global flag — a heat-map check
      // on one lead's page (or any page) must not silently unlock a DIFFERENT lead's hidden
      // sections forever. Each pitch page checks its own "ms_owner_page:<slug>" key instead.
      if (window.MS_SLUG) localStorage.setItem("ms_owner_page:" + window.MS_SLUG, "1");
    }
    isOwner = localStorage.getItem("ms_owner") === "1";
  } catch (e) {}
  // A ?me=1 / ?heat=1 visit also registers the NETWORK it came from as hers (server keeps the
  // IP), so her other devices on the same wifi stop counting too.
  if (P0.get("me") === "1" || P0.get("heat") === "1") {
    try { navigator.sendBeacon(API + "/api/page-analytics", new Blob([JSON.stringify({ slug: SLUG, vid: vid, owner: 1, events: [] })], { type: "text/plain" })); } catch (e) {}
  }
  var q = [], flushT = null;
  function flush() {
    if (flushT) { clearTimeout(flushT); flushT = null; }
    if (!q.length) return;
    var payload = JSON.stringify({ slug: SLUG, vid: vid, events: q.splice(0, 300) });
    var sent = false;
    try { sent = navigator.sendBeacon(API + "/api/page-analytics", new Blob([payload], { type: "text/plain" })); } catch (e) {}
    if (!sent) { try { fetch(API + "/api/page-analytics", { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain" }, body: payload, keepalive: true }); } catch (e) {} }
  }
  function push(e) { if (isOwner) return; q.push(e); if (q.length >= 40) flush(); else if (!flushT) flushT = setTimeout(flush, 4000); }
  function docH() { return Math.max(document.documentElement.scrollHeight, 1); }
  function docW() { return Math.max(document.documentElement.scrollWidth, 1); }

  push({ t: "v", vw: window.innerWidth, vh: window.innerHeight });

  var maxSp = 0;
  setInterval(function () { if (document.visibilityState === "visible") push({ t: "b", sec: 5 }); }, 5000);
  window.addEventListener("scroll", function () {
    var sp = Math.min(100, (100 * (window.scrollY + window.innerHeight)) / docH());
    if (sp > maxSp) maxSp = sp;
  }, { passive: true });
  var lastMove = 0;
  window.addEventListener("mousemove", function (ev) {
    var now = Date.now();
    if (now - lastMove < 700) return;
    lastMove = now;
    push({ t: "m", x: ev.pageX / docW(), y: ev.pageY / docH() });
  }, { passive: true });
  window.addEventListener("click", function (ev) {
    push({ t: "c", x: ev.pageX / docW(), y: ev.pageY / docH() });
    var a = ev.target && ev.target.closest ? ev.target.closest('a[href^="mailto:"],a[href^="tel:"],a[href^="sms:"]') : null; // any call/text/email tap counts as reaching back
    if (a) { push({ t: "e" }); flush(); }
  }, true);
  function goodbye() { push({ t: "s", sp: maxSp }); flush(); }
  window.addEventListener("visibilitychange", function () { if (document.visibilityState === "hidden") goodbye(); });
  window.addEventListener("pagehide", goodbye);

  // Heat-map overlay (owner only, needs the key): ?heat=1&key=…
  var p = new URLSearchParams(location.search);
  if (p.get("heat") === "1") {
    fetch(API + "/api/page-analytics/points?slug=" + encodeURIComponent(SLUG) + "&key=" + encodeURIComponent(p.get("key") || ""))
      .then(function (r) { return r.json(); })
      .then(function (j) {
        var o = document.createElement("div");
        o.style.cssText = "position:absolute;left:0;top:0;width:100%;height:" + docH() + "px;pointer-events:none;z-index:99999";
        (j.points || []).forEach(function (pt) {
          var d = document.createElement("div");
          var c = pt.t === "c" ? "rgba(220,60,40,.4)" : "rgba(40,90,220,.12)";
          var s = pt.t === "c" ? 34 : 46;
          d.style.cssText = "position:absolute;width:" + s + "px;height:" + s + "px;border-radius:50%;transform:translate(-50%,-50%);left:" + (pt.x * 100) + "%;top:" + (pt.y * docH()) + "px;background:radial-gradient(circle," + c + " 0%,rgba(0,0,0,0) 70%)";
          o.appendChild(d);
        });
        document.body.appendChild(o);
      }).catch(function () {});
  }
})();
