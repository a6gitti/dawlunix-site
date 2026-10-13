/* Play the showcase clip unless the visitor asked for less motion.
   Without this script, or with reduced motion, the poster frame stays put. */
(function () {
  var video = document.getElementById("showcase-video");
  if (!video || !window.matchMedia) return;

  var query = window.matchMedia("(prefers-reduced-motion: reduce)");

  function still() {
    video.autoplay = false;
    video.removeAttribute("autoplay");
    video.controls = true;
    video.preload = "none";
    video.pause();
    video.load();
  }

  function play() {
    video.controls = false;
    video.muted = true;
    video.loop = true;
    video.preload = "auto";
    video.autoplay = true;
    var pending = video.play();
    if (pending && pending.catch) {
      pending.catch(function () {
        video.controls = true;
      });
    }
  }

  function apply() {
    if (query.matches) still();
    else play();
  }

  apply();
  if (query.addEventListener) query.addEventListener("change", apply);
  else if (query.addListener) query.addListener(apply);
})();
