/* Live star count for the header link. No number is shown unless the
   GitHub API (or a fresh cache of that response) returns an integer. */
(function () {
  var link = document.getElementById("star-link");
  if (!link) return;

  var countEl = link.querySelector(".star-count");
  var key = "dawlunix-stars";
  var maxAge = 10 * 60 * 1000;
  var url = "https://api.github.com/repos/a6gitti/dawlunix-site";

  function wholeNumber(n) {
    return typeof n === "number" && isFinite(n) && n >= 0 && Math.floor(n) === n;
  }

  function show(n) {
    if (!wholeNumber(n) || !countEl) return;
    countEl.textContent = String(n);
    countEl.hidden = false;
    link.setAttribute(
      "aria-label",
      "Star DawLunix on GitHub, " + n + (n === 1 ? " star" : " stars")
    );
  }

  function stores() {
    var found = [];
    [localStorage, sessionStorage].forEach(function (store) {
      try {
        var probe = key + ":probe";
        store.setItem(probe, "1");
        store.removeItem(probe);
        found.push(store);
      } catch (e) {}
    });
    return found;
  }

  function readCache() {
    var list = stores();
    var i;
    for (i = 0; i < list.length; i++) {
      try {
        var raw = list[i].getItem(key);
        if (!raw) continue;
        var data = JSON.parse(raw);
        if (!data || !wholeNumber(data.count) || typeof data.at !== "number") continue;
        if (Date.now() - data.at > maxAge) continue;
        return data.count;
      } catch (e) {}
    }
    return null;
  }

  function writeCache(n) {
    var payload = JSON.stringify({ count: n, at: Date.now() });
    stores().forEach(function (store) {
      try {
        store.setItem(key, payload);
      } catch (e) {}
    });
  }

  var cached = readCache();
  if (cached !== null) {
    show(cached);
    return;
  }

  fetch(url, { headers: { Accept: "application/vnd.github+json" } })
    .then(function (res) {
      if (!res.ok) throw new Error("status");
      return res.json();
    })
    .then(function (data) {
      var n = data && data.stargazers_count;
      if (!wholeNumber(n)) return;
      writeCache(n);
      show(n);
    })
    .catch(function () {});
})();
