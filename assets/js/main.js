/* =====================================================================
   VATO STYLE — interactions
   ===================================================================== */
(function () {
  'use strict';

  /* ---- Year ---- */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  /* ---- Sticky header shadow ---- */
  var header = document.getElementById('header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-stuck', window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---- Mobile drawer ---- */
  var burger = document.getElementById('burger');
  var drawer = document.getElementById('drawer');
  var drawerClose = document.getElementById('drawerClose');
  function closeDrawer() { if (drawer) drawer.classList.remove('open'); document.body.style.overflow = ''; }
  if (burger && drawer) {
    burger.addEventListener('click', function () {
      drawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
    drawerClose.addEventListener('click', closeDrawer);
    drawer.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeDrawer);
    });
  }

  /* ---- Hero slider ---- */
  (function heroSlider() {
    var slides = Array.prototype.slice.call(document.querySelectorAll('.hero__slide'));
    if (!slides.length) return;
    var dotsWrap = document.getElementById('heroDots');
    var curEl = document.getElementById('heroCur');
    var prev = document.getElementById('heroPrev');
    var next = document.getElementById('heroNext');
    var i = 0, timer;

    slides.forEach(function (_, idx) {
      var b = document.createElement('button');
      b.setAttribute('aria-label', 'Go to slide ' + (idx + 1));
      if (idx === 0) b.classList.add('active');
      b.addEventListener('click', function () { go(idx); reset(); });
      dotsWrap.appendChild(b);
    });
    var dots = Array.prototype.slice.call(dotsWrap.children);

    function go(n) {
      slides[i].classList.remove('active');
      dots[i].classList.remove('active');
      i = (n + slides.length) % slides.length;
      slides[i].classList.add('active');
      dots[i].classList.add('active');
      if (curEl) curEl.textContent = ('0' + (i + 1)).slice(-2);
    }
    function reset() { clearInterval(timer); timer = setInterval(function () { go(i + 1); }, 6500); }

    if (prev) prev.addEventListener('click', function () { go(i - 1); reset(); });
    if (next) next.addEventListener('click', function () { go(i + 1); reset(); });
    reset();
  })();

  /* ---- Horizontal card slider (services) ---- */
  function attachSlider(trackId, prevId, nextId) {
    var track = document.getElementById(trackId);
    if (!track) return;
    var prev = document.getElementById(prevId);
    var next = document.getElementById(nextId);
    function step() {
      var card = track.querySelector('.fcard');
      return card ? card.getBoundingClientRect().width + 24 : 360;
    }
    if (prev) prev.addEventListener('click', function () { track.scrollBy({ left: -step(), behavior: 'smooth' }); });
    if (next) next.addEventListener('click', function () { track.scrollBy({ left: step(), behavior: 'smooth' }); });
  }
  attachSlider('svcTrack', 'svcPrev', 'svcNext');

  /* ---- Scroll reveal ---- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---- Active nav link on scroll ---- */
  var navLinks = document.querySelectorAll('.nav a[href^="#"]');
  var sections = Array.prototype.slice.call(navLinks).map(function (a) {
    return document.querySelector(a.getAttribute('href'));
  });
  if ('IntersectionObserver' in window && sections.filter(Boolean).length) {
    var sObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          navLinks.forEach(function (a) {
            a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id);
          });
        }
      });
    }, { threshold: 0.4 });
    sections.forEach(function (s) { if (s) sObs.observe(s); });
  }

  /* ---- Forms (demo handling, no backend) ---- */
  var quickQuote = document.getElementById('quickQuote');
  if (quickQuote) {
    quickQuote.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = quickQuote.querySelector('[name="name"]').value.trim();
      var phone = quickQuote.querySelector('[name="phone"]').value.trim();
      if (!name || !phone) { alert('Please add your name and phone number so we can call you back.'); return; }
      window.location.href = 'quote.html';
    });
  }

  var newsForm = document.getElementById('newsForm');
  if (newsForm) {
    newsForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = newsForm.querySelector('[name="email"]').value.trim();
      if (!email || email.indexOf('@') < 0) { alert('Please enter a valid email address.'); return; }
      newsForm.style.display = 'none';
      var note = document.getElementById('newsNote');
      if (note) note.style.display = 'block';
    });
  }

  var bigForm = document.getElementById('quoteForm');
  if (bigForm) {
    bigForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;
      bigForm.querySelectorAll('[required]').forEach(function (f) {
        if (!f.value.trim()) ok = false;
      });
      if (!ok) { alert('Please complete all required fields.'); return; }
      bigForm.style.display = 'none';
      var s = document.getElementById('quoteSuccess');
      if (s) { s.classList.add('show'); s.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
    });
  }
})();
