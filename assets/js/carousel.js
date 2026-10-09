/* Photo carousels.
   Auto-advances, but stops as soon as anyone interacts, when the pointer is
   over it, when something inside has keyboard focus, or when the tab is
   hidden. Nothing auto-advances if the visitor has asked for reduced motion.
   Markup comes from _includes/carousel.html; no configuration here. */

(function () {
  "use strict";

  var INTERVAL = 5500;
  var calm = window.matchMedia("(prefers-reduced-motion: reduce)");

  function setup(root) {
    var track = root.querySelector("[data-track]");
    var slides = Array.prototype.slice.call(root.querySelectorAll(".carousel-slide"));
    var dots = Array.prototype.slice.call(root.querySelectorAll("[data-goto]"));
    var caption = root.querySelector("[data-caption]");

    var captions = [];
    try {
      captions = JSON.parse(root.getAttribute("data-captions") || "[]");
    } catch (e) {
      captions = [];
    }

    // One photo needs no controls.
    if (slides.length < 2) {
      var dotList = root.querySelector("[data-dots]");
      var navBtns = root.querySelector(".carousel-nav");
      if (dotList) dotList.hidden = true;
      if (navBtns) navBtns.hidden = true;
      return;
    }

    var index = 0;
    var timer = null;
    var stopped = false;

    function show(next) {
      index = (next + slides.length) % slides.length;
      track.style.transform = "translateX(" + index * -100 + "%)";

      slides.forEach(function (s, i) {
        if (i === index) s.removeAttribute("aria-hidden");
        else s.setAttribute("aria-hidden", "true");
      });

      dots.forEach(function (d, i) {
        d.setAttribute("aria-current", i === index ? "true" : "false");
      });

      if (caption) caption.textContent = captions[index] || "";
    }

    function start() {
      if (stopped || calm.matches || timer) return;
      timer = window.setInterval(function () { show(index + 1); }, INTERVAL);
    }

    function pause() {
      if (timer) { window.clearInterval(timer); timer = null; }
    }

    // A deliberate click or key means the visitor is driving now.
    function takeOver() { stopped = true; pause(); }

    root.querySelector("[data-next]").addEventListener("click", function () {
      takeOver(); show(index + 1);
    });
    root.querySelector("[data-prev]").addEventListener("click", function () {
      takeOver(); show(index - 1);
    });
    dots.forEach(function (d) {
      d.addEventListener("click", function () {
        takeOver(); show(parseInt(d.getAttribute("data-goto"), 10));
      });
    });

    root.addEventListener("mouseenter", pause);
    root.addEventListener("mouseleave", start);
    root.addEventListener("focusin", pause);
    root.addEventListener("focusout", start);

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) pause(); else start();
    });

    calm.addEventListener("change", function () {
      if (calm.matches) pause(); else start();
    });

    show(0);
    start();
  }

  function init() {
    Array.prototype.forEach.call(
      document.querySelectorAll("[data-carousel]"), setup
    );
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
