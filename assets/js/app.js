// Enhances the static download links with the actual latest-release tag
// and APK asset, falling back to the releases page if the API is
// unreachable or rate-limited.
(function () {
  var API_URL = "https://api.github.com/repos/ZYDRAXYL/QuetzaLib-APP/releases/latest";
  var downloadButtons = [
    document.getElementById("download-btn"),
    document.getElementById("download-btn-2"),
  ].filter(Boolean);
  var metaEls = [
    document.getElementById("release-meta"),
    document.getElementById("release-meta-2"),
  ].filter(Boolean);

  fetch(API_URL, { headers: { Accept: "application/vnd.github+json" } })
    .then(function (res) {
      if (!res.ok) throw new Error("GitHub API responded " + res.status);
      return res.json();
    })
    .then(function (release) {
      var apkAsset = (release.assets || []).find(function (a) {
        return /\.apk$/i.test(a.name);
      });
      var targetUrl = apkAsset ? apkAsset.browser_download_url : release.html_url;

      downloadButtons.forEach(function (btn) {
        btn.href = targetUrl;
        btn.textContent = "Download " + release.tag_name;
      });

      var publishedDate = release.published_at
        ? new Date(release.published_at).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : null;

      metaEls.forEach(function (el) {
        el.textContent = apkAsset
          ? "Latest release " +
            release.tag_name +
            (publishedDate ? " · " + publishedDate : "") +
            " · " +
            (apkAsset.size / (1024 * 1024)).toFixed(1) +
            " MB"
          : "Latest release " + release.tag_name + " — no APK asset attached";
      });
    })
    .catch(function () {
      // Static links already point at /releases/latest, which redirects
      // correctly even without the API call, so no fallback UI is needed.
    });
})();
