(function () {
  'use strict';

  var easeOutExpo = 'cubic-bezier(0.16, 1, 0.3, 1)';

  function animateIn(el, delay) {
    el.style.transition =
      'opacity 0.65s ' + easeOutExpo + ' ' + delay + 'ms' +
      ', transform 0.65s ' + easeOutExpo + ' ' + delay + 'ms';
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      });
    });
  }

  // ── TYPEWRITER EFFECT ──
  function typeWriter(el, text, speed, onDone) {
    var i = 0;
    function tick() {
      if (i < text.length) {
        el.textContent += text.charAt(i);
        i++;
        setTimeout(tick, speed);
      } else if (onDone) {
        onDone();
      }
    }
    tick();
  }

  // ── SCROLL REVEAL ──
  function initScrollReveal() {
    var targets = document.querySelectorAll('.section-label, .section-heading, .section-grid, .about-left, .about-right, .skills-grid, .skill-group, .work-grid, .work-card, .contact-desc, .contact-btns, .social-links');

    if (!('IntersectionObserver' in window)) {
      for (var i = 0; i < targets.length; i++) {
        targets[i].style.opacity = '1';
        targets[i].style.transform = 'translateY(0)';
      }
      return;
    }

    for (var i = 0; i < targets.length; i++) {
      targets[i].style.opacity = '0';
      targets[i].style.transform = 'translateY(16px)';
      targets[i].style.willChange = 'opacity, transform';
    }

    var observer = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          var el = entries[i].target;
          el.style.transition =
            'opacity 0.6s ' + easeOutExpo + ', transform 0.6s ' + easeOutExpo;
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          observer.unobserve(el);
        }
      }
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    for (var j = 0; j < targets.length; j++) {
      observer.observe(targets[j]);
    }
  }

  // ── INIT ──
  function init() {
    var heroEls = document.querySelectorAll('.animated');
    var delays = [0, 80, 240, 320];
    for (var i = 0; i < heroEls.length; i++) {
      if (delays[i] !== undefined) {
        animateIn(heroEls[i], delays[i]);
      }
    }

    // Typewriter: name
    var nameEl = document.getElementById('typewriter-name');
    var gradeEl = document.getElementById('typewriter-grade');

    if (nameEl && gradeEl) {
      setTimeout(function () {
        typeWriter(nameEl, 'Minh Phát', 90, function () {
          // After name finishes, start typing the grade line
          var cursor = document.querySelector('.cursor-blink');
          if (cursor) cursor.style.animation = 'none';
          setTimeout(function () {
            if (cursor) cursor.style.animation = 'blink 0.8s step-end infinite';
            typeWriter(gradeEl, 'Grade 11 — just a normal high school student.', 45, function () {
              var cursor2 = document.querySelector('.cursor-blink');
              if (cursor2) {
                setTimeout(function () {
                  cursor2.style.opacity = '0';
                }, 1200);
              }
            });
          }, 400);
        });
      }, 600);
    }

    initScrollReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
