/* =========================================================
   GLOBAL.JS
   Used on: ALL HTML pages
   Purpose: Mobile navigation + shared helpers
   ========================================================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}

/* Close mobile nav when clicking a link */
if (navLinks) {
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("show");
    });
  });
}

/* Highlight active nav link based on current URL */
const currentPage = window.location.pathname.split("/").pop();

document.querySelectorAll(".nav-links a").forEach((link) => {
  const linkPage = link.getAttribute("href").split("/").pop();

  if (linkPage === currentPage) {
    link.classList.add("active-link");
  }
});