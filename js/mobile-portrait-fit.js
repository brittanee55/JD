
(function () {
  function fitMobileHero() {
    if (!window.matchMedia("(max-width: 768px) and (orientation: portrait)").matches) return;

    document.documentElement.style.overflowX = "hidden";
    document.body.style.overflowX = "hidden";

    var selectors = [
      ".home-hero", ".hero", ".page-hero",
      ".hero-visual", ".hero-image", ".hero-bg",
      ".background-hero", ".home-hero-visual", ".home-hero-image",
      ".atlas-hero", ".atlas-home-hero"
    ];

    selectors.forEach(function (selector) {
      document.querySelectorAll(selector).forEach(function (el) {
        el.style.maxWidth = "100vw";
        el.style.overflowX = "hidden";
      });
    });

    document.querySelectorAll(".home-hero img, .hero img, .page-hero img, .hero-visual img, .hero-image img").forEach(function (img) {
      img.style.width = "100vw";
      img.style.maxWidth = "100vw";
      img.style.height = "auto";
      img.style.objectFit = "contain";
      img.style.objectPosition = "center top";
      img.style.transform = "none";
      img.style.display = "block";
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", fitMobileHero);
  } else {
    fitMobileHero();
  }

  window.addEventListener("resize", fitMobileHero);
  window.addEventListener("orientationchange", function () {
    setTimeout(fitMobileHero, 250);
  });
})();
