/* Conexão.fr — comportamento compartilhado (nav, consentimento de cookies, eventos para o GTM) */
(function () {
  'use strict';

  var doc = document;
  var lang = (doc.documentElement.lang || 'pt-BR').slice(0, 2).toLowerCase();
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }

  /* ---------- NAV ---------- */
  var nav = doc.getElementById('siteNav');
  var toggle = doc.getElementById('navToggle');
  var links = doc.getElementById('navLinks');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('is-scrolled', window.scrollY > 12);
    }, { passive: true });
  }
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- CONSENTIMENTO (Consent Mode v2) ---------- */
  var TEXT = {
    pt: {
      msg: 'Usamos cookies de medição (Google Analytics e Google Ads) para entender como o site é usado e avaliar nossas campanhas. Você escolhe: sem o seu aceite, nenhum cookie de medição é gravado.',
      accept: 'Aceitar', reject: 'Recusar', more: 'Saiba mais', href: '/privacidade/'
    },
    fr: {
      msg: 'Nous utilisons des cookies de mesure (Google Analytics et Google Ads) pour comprendre l’usage du site et évaluer nos campagnes. Vous décidez : sans votre accord, aucun cookie de mesure n’est déposé.',
      accept: 'Accepter', reject: 'Refuser', more: 'En savoir plus', href: '/fr/confidentialite/'
    },
    en: {
      msg: 'We use measurement cookies (Google Analytics and Google Ads) to understand how the site is used and to evaluate our campaigns. It’s your choice: without your consent, no measurement cookie is stored.',
      accept: 'Accept', reject: 'Reject', more: 'Learn more', href: '/en/privacy/'
    }
  };
  var T = TEXT[lang] || TEXT.pt;
  var KEY = 'cx_consent';

  /* Agenda do Google Calendar: só é carregada após clique (ou após aceite de cookies),
     para não gravar cookies de terceiros antes de uma ação do visitante. */
  var schedulerLoaded = false;
  function loadScheduler(auto) {
    var box = doc.getElementById('scheduler');
    if (!box || schedulerLoaded) return;
    var frame = box.querySelector('iframe[data-src]');
    if (!frame) return;
    schedulerLoaded = true;
    frame.src = frame.getAttribute('data-src');
    frame.hidden = false;
    var ph = box.querySelector('[data-scheduler-placeholder]');
    if (ph) ph.hidden = true;
    window.dataLayer.push({ event: 'scheduler_load', page_language: lang, auto_loaded: !!auto });
  }
  doc.querySelectorAll('[data-load-scheduler]').forEach(function (b) {
    b.addEventListener('click', function () { loadScheduler(false); });
  });

  function applyConsent(granted) {
    if (granted) loadScheduler(true);
    var v = granted ? 'granted' : 'denied';
    gtag('consent', 'update', {
      ad_storage: v, ad_user_data: v, ad_personalization: v, analytics_storage: v
    });
    window.dataLayer.push({ event: 'consent_update', consent_granted: granted });
  }
  function saveConsent(granted) {
    try { localStorage.setItem(KEY, granted ? 'granted' : 'denied'); } catch (e) {}
  }
  function readConsent() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }

  var banner = null;
  function buildBanner() {
    banner = doc.createElement('div');
    banner.className = 'consent';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-live', 'polite');
    banner.setAttribute('aria-label', 'Cookies');
    banner.innerHTML =
      '<p>' + T.msg + ' <a href="' + T.href + '">' + T.more + '</a></p>' +
      '<div class="consent-actions">' +
      '<button type="button" class="btn btn-primary" data-consent="accept">' + T.accept + '</button>' +
      '<button type="button" class="btn btn-reject" data-consent="reject">' + T.reject + '</button>' +
      '</div>';
    doc.body.appendChild(banner);
    banner.addEventListener('click', function (e) {
      var b = e.target.closest('[data-consent]');
      if (!b) return;
      var granted = b.getAttribute('data-consent') === 'accept';
      saveConsent(granted);
      applyConsent(granted);
      banner.classList.remove('is-visible');
    });
  }
  function showBanner() {
    if (!banner) buildBanner();
    banner.classList.add('is-visible');
  }

  var stored = readConsent();
  if (stored === 'granted' || stored === 'denied') {
    applyConsent(stored === 'granted');
  } else {
    showBanner();
  }
  doc.querySelectorAll('[data-open-consent]').forEach(function (el) {
    el.addEventListener('click', showBanner);
  });

  /* ---------- EVENTOS PARA O GTM ---------- */
  function sectionOf(el) {
    var s = el.closest('section, header, footer');
    return s ? (s.id || s.tagName.toLowerCase()) : 'page';
  }
  function push(name, extra) {
    var o = { event: name, page_language: lang };
    for (var k in extra) { if (Object.prototype.hasOwnProperty.call(extra, k)) o[k] = extra[k]; }
    window.dataLayer.push(o);
  }

  doc.addEventListener('click', function (e) {
    var a = e.target.closest('a');
    if (!a) return;
    var href = a.getAttribute('href') || '';
    var where = sectionOf(a);

    if (href.indexOf('mailto:') === 0) {
      push('contact_click', { contact_method: 'email', click_location: where });
    } else if (href.indexOf('tel:') === 0) {
      push('contact_click', { contact_method: 'phone', click_location: where });
    } else if (href.indexOf('linkedin.com') > -1) {
      push('contact_click', { contact_method: 'linkedin', click_location: where });
    } else if (a.closest('.lang-switch') || a.closest('.footer-col[data-lang-links]')) {
      push('language_switch', { target_language: a.textContent.trim().slice(0, 2).toLowerCase() });
    } else if (a.classList.contains('btn') && href.charAt(0) === '#') {
      push('cta_click', { cta_text: a.textContent.trim(), cta_target: href, click_location: where });
    }
  });

  doc.querySelectorAll('details.case-details').forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (d.open) push('case_expand', { case_name: d.getAttribute('data-case') || 'case' });
    });
  });

  var scheduler = doc.getElementById('scheduler');
  if (scheduler && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          push('view_scheduler', {});
          io.disconnect();
        }
      });
    }, { threshold: 0.4 });
    io.observe(scheduler);
  }
})();
