
(function () {
  function getNavLinks(nav) {
    return nav.querySelector(".nav-links, .jd-splash-links, .jd-one-line-links, .same-as-home-links, .fixed-inner-links, .universal-red-links, .screenshot-home-links");
  }

  function getBrand(nav) {
    return nav.querySelector(".logo, .julian-logo, .jd-splash-logo, .jd-one-line-logo, .same-as-home-logo, .fixed-inner-logo, .universal-red-logo, .navbar-brand");
  }

  function getLogin(nav) {
    return nav.querySelector(".login-signup-btn, .jd-splash-login, .same-as-home-login, .fixed-inner-login, .universal-red-login");
  }

  function makeMenu(nav) {
    if (nav.dataset.hkaPremiumMenuReady === "true") return;
    var links = getNavLinks(nav);
    if (!links) return;

    nav.dataset.hkaPremiumMenuReady = "true";

    nav.querySelectorAll(".menu-btn, .mobile-menu-toggle, .hka-mobile-menu-toggle, .hamburger, .hka-premium-menu-button").forEach(function (btn) {
      btn.remove();
    });

    var brand = getBrand(nav);
    var login = getLogin(nav);

    var button = document.createElement("button");
    button.className = "hka-premium-menu-button";
    button.type = "button";
    button.setAttribute("aria-label", "Open menu");
    button.setAttribute("aria-expanded", "false");
    button.innerHTML = "<span>☰</span>";
    nav.appendChild(button);

    var overlay = document.createElement("div");
    overlay.className = "hka-premium-menu-overlay";
    overlay.setAttribute("aria-hidden", "true");

    var panel = document.createElement("aside");
    panel.className = "hka-premium-menu-panel";
    panel.setAttribute("aria-label", "Mobile navigation");

    var brandImg = "";
    if (brand) {
      var img = brand.querySelector("img");
      if (img) brandImg = '<img src="' + img.getAttribute("src") + '" alt="" />';
    }

    var linkHTML = "";
    links.querySelectorAll("a").forEach(function (a) {
      var href = a.getAttribute("href") || "#";
      var label = a.textContent.trim();
      if (label) linkHTML += '<a href="' + href + '">' + label + "</a>";
    });

    var loginHref = login ? (login.getAttribute("href") || "#") : "authentication/login.html";

    panel.innerHTML =
      '<div class="hka-premium-menu-head">' +
        '<div class="hka-premium-menu-brand">' + brandImg + '<span>JD</span></div>' +
        '<button class="hka-premium-menu-close" type="button" aria-label="Close menu">×</button>' +
      '</div>' +
      '<nav class="hka-premium-menu-links" aria-label="Mobile menu links">' + linkHTML + '</nav>' +
      '<a class="hka-premium-menu-login" href="' + loginHref + '">♙ Login / Sign Up</a>' +
      '<p class="hka-premium-menu-note">Human Knowledge Atlas</p>';

    document.body.appendChild(overlay);
    document.body.appendChild(panel);

    var closeBtn = panel.querySelector(".hka-premium-menu-close");

    function openMenu() {
      document.body.classList.add("hka-menu-open");
      button.setAttribute("aria-expanded", "true");
      overlay.setAttribute("aria-hidden", "false");
    }

    function closeMenu() {
      document.body.classList.remove("hka-menu-open");
      button.setAttribute("aria-expanded", "false");
      overlay.setAttribute("aria-hidden", "true");
    }

    button.addEventListener("click", openMenu);
    overlay.addEventListener("click", closeMenu);
    closeBtn.addEventListener("click", closeMenu);

    panel.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeMenu();
    });
  }

  function init() {
    document.querySelectorAll("nav").forEach(makeMenu);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
