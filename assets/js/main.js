// =========================================================
// Jesús García — Portfolio de diseño y branding — main.js
// =========================================================
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var isTouch = window.matchMedia("(hover: none)").matches;

  // ---------- Nav scroll state ----------
  var nav = document.getElementById("nav");
  function onScroll() {
    if (!nav) return;
    nav.classList.toggle("scrolled", window.scrollY > 40);
    updateProgress();
  }
  window.addEventListener("scroll", onScroll, { passive: true });

  // ---------- Scroll progress bar ----------
  var progressBar = document.getElementById("scrollProgress");
  function updateProgress() {
    if (!progressBar) return;
    var h = document.documentElement;
    var scrollTop = h.scrollTop || document.body.scrollTop;
    var scrollHeight = (h.scrollHeight || document.body.scrollHeight) - h.clientHeight;
    var pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    progressBar.style.width = pct + "%";
  }
  updateProgress();

  // ---------- Mobile nav toggle ----------
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var open = navLinks.classList.toggle("open");
      navToggle.classList.toggle("open", open);
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    navLinks.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        navLinks.classList.remove("open");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ---------- Scroll reveal ----------
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("in");
    });
  }

  // ---------- Subtle cursor tilt on project media (desktop only) ----------
  if (!isTouch && !reduceMotion) {
    document.querySelectorAll(".project-media").forEach(function (el) {
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform =
          "rotateY(" + (x * 5).toFixed(2) + "deg) rotateX(" + (-y * 5).toFixed(2) + "deg)";
      });
      el.addEventListener("mouseleave", function () {
        el.style.transform = "rotateY(0deg) rotateX(0deg)";
      });
    });
  }

  // ---------- Active nav section indicator ----------
  var sections = ["sobre-mi", "servicios", "proyectos", "proceso", "credenciales", "contacto"]
    .map(function (id) {
      return document.getElementById(id);
    })
    .filter(Boolean);
  var navItems = document.querySelectorAll(".nav-links a[data-sec]");
  if ("IntersectionObserver" in window && sections.length) {
    var secIo = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            navItems.forEach(function (a) {
              a.classList.toggle("active", a.dataset.sec === entry.target.id);
            });
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    sections.forEach(function (s) {
      secIo.observe(s);
    });
  }

  // ---------- Current year in footer ----------
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
