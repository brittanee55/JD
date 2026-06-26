
(function () {
  function isMobileWidth() {
    return window.matchMedia("(max-width: 768px)").matches;
  }

  function findNavLinks(nav) {
    return nav.querySelector(".nav-links, .jd-splash-links, .jd-one-line-links, .same-as-home-links, .fixed-inner-links, .universal-red-links, .screenshot-home-links");
  }

  function ensureButton(nav) {
    var existing = nav.querySelector(".hka-mobile-menu-toggle, .menu-btn");
    if (existing) {
      existing.classList.add("hka-mobile-menu-toggle");
      existing.setAttribute("aria-label", "Open navigation menu");
      existing.setAttribute("aria-expanded", "false");
      existing.type = "button";
      existing.innerHTML = "☰";
      return existing;
    }

    var button = document.createElement("button");
    button.className = "hka-mobile-menu-toggle";
    button.type = "button";
    button.setAttribute("aria-label", "Open navigation menu");
    button.setAttribute("aria-expanded", "false");
    button.innerHTML = "☰";
    nav.appendChild(button);
    return button;
  }

  function closeMenu(links, button) {
    links.classList.remove("mobile-open");
    document.body.classList.remove("mobile-menu-open");
    button.setAttribute("aria-expanded", "false");
    button.innerHTML = "☰";
  }

  function setupMobileNav() {
    document.querySelectorAll("nav").forEach(function (nav) {
      var links = findNavLinks(nav);
      if (!links) return;

      var button = ensureButton(nav);
      if (button.dataset.hkaReady === "true") return;
      button.dataset.hkaReady = "true";

      button.addEventListener("click", function () {
        if (!isMobileWidth()) return;

        var isOpen = links.classList.toggle("mobile-open");
        document.body.classList.toggle("mobile-menu-open", isOpen);
        button.setAttribute("aria-expanded", String(isOpen));
        button.innerHTML = isOpen ? "×" : "☰";
      });

      links.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
          if (!isMobileWidth()) return;
          closeMenu(links, button);
        });
      });
    });
  }

  function closeOnResize() {
    if (isMobileWidth()) return;
    document.body.classList.remove("mobile-menu-open");
    document.querySelectorAll(".mobile-open").forEach(function (el) {
      el.classList.remove("mobile-open");
    });
    document.querySelectorAll(".hka-mobile-menu-toggle").forEach(function (button) {
      button.setAttribute("aria-expanded", "false");
      button.innerHTML = "☰";
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupMobileNav);
  } else {
    setupMobileNav();
  }

  window.addEventListener("resize", closeOnResize);
})();
