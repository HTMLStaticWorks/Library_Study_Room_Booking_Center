/* ==========================================================
   StudyNest — Main Application JavaScript
   ========================================================== */

(function () {
  'use strict';

  /* ─── Room Data ─── */
  const rooms = [
    {
      id: '1', name: 'Silent Solo Pod Alpha', type: 'silent-pod',
      imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
      noiseLevel: '0 dB — Total Silence', hourlyRate: 8, rating: 4.9, capacity: 1,
      tagline: 'Zero-noise acoustic pod',
      features: ['Full soundproof walls', 'Adjustable LED desk lamp', 'Dual power outlets'],
      availability: 'Available', specs: { powerOutlets: 2 }
    },
    {
      id: '2', name: 'Executive Scholar Studio', type: 'private-study',
      imageUrl: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=600&q=80',
      noiseLevel: '< 10 dB — Whisper Quiet', hourlyRate: 15, rating: 4.8, capacity: 1,
      tagline: 'Premium private workspace',
      features: ['4K monitor included', 'Ergonomic sit-stand desk', 'Personal climate control'],
      availability: 'Available', specs: { powerOutlets: 4 }
    },
    {
      id: '3', name: 'Collaborative Research Hub', type: 'group-discussion',
      imageUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=600&q=80',
      noiseLevel: '30 dB — Low Discussion', hourlyRate: 25, rating: 4.7, capacity: 6,
      tagline: 'Teamwork-ready research suite',
      features: ['86" interactive whiteboard', 'Wireless screen casting', '6 ergonomic seats'],
      availability: 'Limited', specs: { powerOutlets: 8 }
    },
    {
      id: '4', name: 'Digital Media Lab', type: 'media-lab',
      imageUrl: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=600&q=80',
      noiseLevel: '20 dB — Near Silent', hourlyRate: 20, rating: 4.6, capacity: 4,
      tagline: 'High-performance workstation',
      features: ['Dual 4K display setup', 'High-speed ethernet', 'Studio-grade lighting'],
      availability: 'Available', specs: { powerOutlets: 6 }
    },
    {
      id: '5', name: 'Focus Reading Alcove', type: 'silent-pod',
      imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=600&q=80',
      noiseLevel: '5 dB — Near Silence', hourlyRate: 10, rating: 4.9, capacity: 2,
      tagline: 'Intimate quiet reading nook',
      features: ['Warm ambient lighting', 'Curated reference shelf', 'Charging station'],
      availability: 'Available', specs: { powerOutlets: 2 }
    },
    {
      id: '6', name: 'Grand Literature Hall', type: 'private-study',
      imageUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=600&q=80',
      noiseLevel: '15 dB — Whisper Zone', hourlyRate: 5, rating: 4.8, capacity: 12,
      tagline: 'Classical open reading space',
      features: ['Brass reading lamps', 'Leather seating', 'Librarian assistance'],
      availability: 'Available', specs: { powerOutlets: 12 }
    }
  ];

  let activeFilter = 'all';
  let darkMode = localStorage.getItem('studynest-dark') === 'true';

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }

  function showToast(msg, type) {
    type = type || 'info';
    var container = $('#toast-container');
    if (!container) return;
    var toast = document.createElement('div');
    toast.className = 'toast toast--' + type;
    var iconName = type === 'success' ? 'check-circle' : type === 'error' ? 'alert-circle' : 'info';
    toast.innerHTML = '<i data-lucide="' + iconName + '"></i><span>' + msg + '</span>';
    container.appendChild(toast);
    if (typeof lucide !== 'undefined') lucide.createIcons({ nodes: [toast] });
    setTimeout(function () {
      toast.classList.add('removing');
      setTimeout(function () { toast.remove(); }, 300);
    }, 3500);
  }

  function toggleDark() {
    darkMode = !darkMode;
    document.body.classList.toggle('dark-mode', darkMode);
    localStorage.setItem('studynest-dark', darkMode);
    updateDarkIcon();
  }

  function updateDarkIcon() {
    var btn = $('.dark-toggle');
    if (!btn) return;
    btn.innerHTML = darkMode ? '<i data-lucide="sun"></i>' : '<i data-lucide="moon"></i>';
    if (typeof lucide !== 'undefined') lucide.createIcons({ nodes: [btn] });
  }

  function highlightNav() {
    const page = document.body.dataset.page || 'home';
    $$('.nav__links a, .nav__mobile a').forEach(function (a) {
      const navTarget = a.getAttribute('data-nav');
      if (navTarget) {
        a.classList.toggle('active', navTarget === page);
      }
    });
  }

  function renderRoomCards() {
    var grid = $('#rooms-grid');
    if (!grid) return;
    var filtered = rooms.filter(function (r) {
      return activeFilter === 'all' || r.type === activeFilter;
    });
    grid.innerHTML = filtered.map(function (room) {
      return '<div class="card" data-room-id="' + room.id + '">' +
        '<div class="card__img-wrap">' +
          '<img src="' + room.imageUrl + '" alt="' + room.name + '" loading="lazy">' +
          '<div class="card__img-tag"><i data-lucide="volume-x"></i><span>' + room.noiseLevel + '</span></div>' +
          '<div class="card__img-price">$' + room.hourlyRate + '/hr</div>' +
        '</div>' +
        '<div class="card__body">' +
          '<div class="card__title-row">' +
            '<h3 class="card__title">' + room.name + '</h3>' +
            '<div class="card__rating"><i data-lucide="star"></i><span>' + room.rating + '</span></div>' +
          '</div>' +
          '<p class="card__meta">Capacity: ' + room.capacity + ' ' + (room.capacity === 1 ? 'Person' : 'People') + ' • ' + room.tagline + '</p>' +
          '<ul class="card__features">' +
            room.features.map(function (f) {
              return '<li><i data-lucide="check-circle-2"></i><span>' + f + '</span></li>';
            }).join('') +
          '</ul>' +
        '</div>' +
        '<div class="card__footer">' +
          '<a class="btn btn--sm btn--ghost" href="service-details.html?id=' + room.id + '">View Specs</a>' +
          '<button class="btn btn--sm btn--primary" onclick="StudyNest.bookRoom(\'' + room.id + '\')"><i data-lucide="calendar"></i><span>Reserve</span></button>' +
        '</div>' +
      '</div>';
    }).join('');
    if (typeof lucide !== 'undefined') lucide.createIcons({ nodes: [grid] });
  }

  function setFilter(filter) {
    activeFilter = filter;
    $$('.filter-tab').forEach(function (t) {
      t.classList.toggle('active', t.dataset.filter === filter);
    });
    renderRoomCards();
  }

  function renderMatrixCards() {
    var grid = $('#matrix-grid');
    if (!grid) return;
    grid.innerHTML = rooms.map(function (room) {
      var isAvail = room.availability === 'Available';
      return '<div class="matrix-card">' +
        '<div style="display:flex;flex-direction:column;gap:0.75rem">' +
          '<div class="matrix-card__head">' +
            '<div>' +
              '<h3 class="matrix-card__name">' + room.name + '</h3>' +
              '<p class="matrix-card__noise">' + room.noiseLevel + '</p>' +
            '</div>' +
            '<span class="' + (isAvail ? 'badge--available' : 'badge--limited') + '">' + room.availability + '</span>' +
          '</div>' +
          '<div class="matrix-card__specs">' +
            '<div><p class="matrix-card__spec-label">Cap</p><p class="matrix-card__spec-value">' + room.capacity + ' Person</p></div>' +
            '<div><p class="matrix-card__spec-label">Rate</p><p class="matrix-card__spec-value matrix-card__spec-value--accent">$' + room.hourlyRate + '/hr</p></div>' +
            '<div><p class="matrix-card__spec-label">Power</p><p class="matrix-card__spec-value">' + room.specs.powerOutlets + ' Outlets</p></div>' +
          '</div>' +
          '<div class="matrix-card__schedule">' +
            '<p class="matrix-card__schedule-label">Today\'s Schedule</p>' +
            '<div class="matrix-card__slots">' +
              '<span class="slot slot--booked">09:00 AM</span>' +
              '<span class="slot slot--open">11:00 AM</span>' +
              '<span class="slot slot--open">02:00 PM</span>' +
              '<span class="slot slot--booked">06:00 PM</span>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="matrix-card__footer">' +
          '<button class="btn btn--sm btn--primary btn--full" onclick="StudyNest.bookRoom(\'' + room.id + '\')"><i data-lucide="calendar"></i><span>Reserve This Unit</span></button>' +
        '</div>' +
      '</div>';
    }).join('');
    if (typeof lucide !== 'undefined') lucide.createIcons({ nodes: [grid] });
  }

  function initRoomDetailPage() {
    if (document.body.dataset.page !== 'service-details') return;
    const params = new URLSearchParams(window.location.search);
    const roomId = params.get('id') || '1';
    const room = rooms.find(r => r.id === roomId) || rooms[0];

    var nameEl = $('#detail-room-name');
    var priceEl = $('#detail-room-price');
    var descEl = $('#detail-room-desc');
    var noiseEl = $('#detail-noise');
    var capEl = $('#detail-capacity');
    var powerEl = $('#detail-power');

    if (nameEl) nameEl.textContent = room.name;
    if (priceEl) priceEl.textContent = '$' + room.hourlyRate + ' / hr';
    if (descEl) descEl.textContent = room.tagline + ' — engineered for unbroken concentration and deep work sessions.';
    if (noiseEl) noiseEl.textContent = room.noiseLevel;
    if (capEl) capEl.textContent = room.capacity + ' Person';
    if (powerEl) powerEl.textContent = room.specs.powerOutlets + ' AC & USB Outlets';
  }

  function initScrollTop() {
    var btn = $('.scroll-top');
    if (!btn) return;
    window.addEventListener('scroll', function () {
      btn.classList.toggle('visible', window.scrollY > 400);
    });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function init() {
    if (darkMode) document.body.classList.add('dark-mode');
    updateDarkIcon();
    highlightNav();

    var darkBtn = $('.dark-toggle');
    if (darkBtn) darkBtn.addEventListener('click', toggleDark);

    var toggleBtn = $('.nav__toggle');
    var mobileMenu = $('.nav__mobile');
    if (toggleBtn && mobileMenu) {
      toggleBtn.addEventListener('click', function () {
        mobileMenu.classList.toggle('open');
      });
    }

    $$('.filter-tab').forEach(function (tab) {
      tab.addEventListener('click', function () {
        setFilter(tab.dataset.filter);
      });
    });

    var searchForm = $('#quick-search-form');
    if (searchForm) {
      searchForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var date = $('#search-date').value;
        showToast('Filtering available study slots for ' + date + '...', 'info');
      });
    }

    var refreshBtn = $('.room-matrix__refresh');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', function () {
        showToast('Refreshing live slot sensors...', 'info');
      });
    }

    var today = new Date().toISOString().split('T')[0];
    $$('input[type="date"]').forEach(function (inp) {
      if (!inp.value) inp.value = today;
    });

    renderRoomCards();
    renderMatrixCards();
    initRoomDetailPage();
    initScrollTop();

    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  window.StudyNest = window.StudyNest || {};
  window.StudyNest.rooms = rooms;
  window.StudyNest.showToast = showToast;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
