(function () {
  'use strict';

  var navLinks = document.getElementById('navLinks');
  var navToggle = document.getElementById('navToggle');

  if (navLinks && navToggle) {
    var closeMenu = function () {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Ouvrir le menu');
    };

    navToggle.addEventListener('click', function () {
      var open = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      navToggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    });

    navLinks.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeMenu();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        closeMenu();
        navToggle.focus();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 720 && navLinks.classList.contains('open')) closeMenu();
    });
  }

  var items = document.querySelectorAll('.section-head, .item, .sauce, .price-row, .info-card, .contact-inner');

  if (items.length) {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduce || !('IntersectionObserver' in window)) {
      for (var i = 0; i < items.length; i++) items[i].classList.add('visible');
    } else {
      for (var j = 0; j < items.length; j++) items[j].classList.add('reveal');

      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

      for (var k = 0; k < items.length; k++) io.observe(items[k]);
    }
  }
})();