/* ==========================================================
   StudyNest — Main Application JavaScript
   ========================================================== */

(function () {
  'use strict';  /* ─── Room Data (Categorized: 5 items for each space type) ─── */
  const rooms = [
    // ─── 1. Solo Silent Pods (5 Unique Items) ───
    {
      id: '1', name: 'Silent Solo Pod Alpha', type: 'silent-pod', categoryName: 'Solo Silent Pods',
      imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
      noiseLevel: '0 dB — Total Silence', hourlyRate: 8, rating: 4.9, capacity: 1,
      tagline: 'Zero-noise acoustic pod',
      features: ['Full soundproof walls', 'Adjustable LED desk lamp', 'Dual power outlets'],
      availability: 'Available', specs: { powerOutlets: 2 }
    },
    {
      id: '5', name: 'Focus Pod Beta (Acoustic Chamber)', type: 'silent-pod', categoryName: 'Solo Silent Pods',
      imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=600&q=80',
      noiseLevel: '0 dB — Absolute Soundproof', hourlyRate: 10, rating: 4.9, capacity: 1,
      tagline: 'Air-purified quiet reading nook',
      features: ['Multi-layer rockwool damping', 'HEPA air filtration', 'Warm ambient glow lamp'],
      availability: 'Available', specs: { powerOutlets: 2 }
    },
    {
      id: '7', name: 'Quiet Vault Omega (Acoustic Sanctuary)', type: 'silent-pod', categoryName: 'Solo Silent Pods',
      imageUrl: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=600&q=80',
      noiseLevel: '0 dB — Active Noise-Canceling', hourlyRate: 12, rating: 5.0, capacity: 1,
      tagline: 'Sanctuary for intense deep study',
      features: ['Active noise-canceling wall panels', 'Posture-fit ergonomic lounger', 'Oxygenated air intake'],
      availability: 'Available', specs: { powerOutlets: 4 }
    },
    {
      id: '14', name: 'Zenith Soundproof Pod Delta', type: 'silent-pod', categoryName: 'Solo Silent Pods',
      imageUrl: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80',
      noiseLevel: '0 dB — Circadian Lighting Pod', hourlyRate: 11, rating: 4.9, capacity: 1,
      tagline: 'Circadian lighting focus pod',
      features: ['Circadian blue-light focus tuning', 'Keypad digital PIN access', 'Wireless phone charging pad'],
      availability: 'Available', specs: { powerOutlets: 3 }
    },
    {
      id: '15', name: 'Isolation Reading Capsule Epsilon', type: 'silent-pod', categoryName: 'Solo Silent Pods',
      imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
      noiseLevel: '0 dB — Bio-Rest & Study Pod', hourlyRate: 13, rating: 5.0, capacity: 1,
      tagline: 'Ergonomic study capsule',
      features: ['Zero-gravity ergonomic recliner', 'Personal temperature control', 'Binaural beats audio port'],
      availability: 'Available', specs: { powerOutlets: 4 }
    },

    // ─── 2. Executive Studios (5 Unique Items) ───
    {
      id: '2', name: 'Executive Scholar Studio', type: 'private-study', categoryName: 'Executive Studios',
      imageUrl: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=600&q=80',
      noiseLevel: '< 10 dB — Whisper Quiet', hourlyRate: 15, rating: 4.8, capacity: 1,
      tagline: 'Premium private workspace',
      features: ['4K monitor included', 'Ergonomic sit-stand desk', 'Personal climate control'],
      availability: 'Available', specs: { powerOutlets: 4 }
    },
    {
      id: '6', name: 'Professor\'s Research Suite', type: 'private-study', categoryName: 'Executive Studios',
      imageUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=600&q=80',
      noiseLevel: '< 10 dB — Scholar Quiet Zone', hourlyRate: 18, rating: 4.9, capacity: 2,
      tagline: 'Mahogany desk & research repository',
      features: ['Dual 32" 4K displays', 'Brass reading lamps', 'Dedicated book shelving'],
      availability: 'Available', specs: { powerOutlets: 6 }
    },
    {
      id: '8', name: 'Fellowship Corner Studio', type: 'private-study', categoryName: 'Executive Studios',
      imageUrl: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=600&q=80',
      noiseLevel: '< 10 dB — Sound-Insulated Office', hourlyRate: 16, rating: 4.8, capacity: 1,
      tagline: 'Insulated private office suite',
      features: ['Herman Miller Aeron chair', 'Universal multi-port dock', 'Glass whiteboard panel'],
      availability: 'Available', specs: { powerOutlets: 4 }
    },
    {
      id: '11', name: 'Senior Academic Research Suite', type: 'private-study', categoryName: 'Executive Studios',
      imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
      noiseLevel: '< 10 dB — Ultra-Quiet Research Office', hourlyRate: 20, rating: 4.9, capacity: 2,
      tagline: 'Dual monitor data analysis suite',
      features: ['Dual 4K Thunderbolt displays', '10Gbps Dedicated Fiber', 'Motorized sit-stand workstation'],
      availability: 'Available', specs: { powerOutlets: 8 }
    },
    {
      id: '13', name: 'Private Doctoral Study Lounge', type: 'private-study', categoryName: 'Executive Studios',
      imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80',
      noiseLevel: '< 5 dB — Preservation Silence', hourlyRate: 19, rating: 4.9, capacity: 1,
      tagline: 'Thesis & manuscript writing suite',
      features: ['UV-filtered anti-glare task light', 'HD Manuscript document scanner', 'Leather reading armchair'],
      availability: 'Available', specs: { powerOutlets: 6 }
    },

    // ─── 3. Group Hubs (5 Unique Items) ───
    {
      id: '3', name: 'Collaborative Research Hub', type: 'group-discussion', categoryName: 'Group Suites',
      imageUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=600&q=80',
      noiseLevel: '30 dB — Low Discussion', hourlyRate: 25, rating: 4.7, capacity: 6,
      tagline: 'Teamwork-ready research suite',
      features: ['86" interactive whiteboard', 'Wireless screen casting', '6 ergonomic seats'],
      availability: 'Limited', specs: { powerOutlets: 8 }
    },
    {
      id: '9', name: 'Innovation Project Suite', type: 'group-discussion', categoryName: 'Group Suites',
      imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
      noiseLevel: '25 dB — Soundproof Glass Suite', hourlyRate: 28, rating: 4.9, capacity: 8,
      tagline: 'Brainstorm & project room',
      features: ['Dual 65" conference displays', 'Modular moving desks', 'Acoustic glass perimeter'],
      availability: 'Available', specs: { powerOutlets: 10 }
    },
    {
      id: '10', name: 'Mastermind Group Room', type: 'group-discussion', categoryName: 'Group Suites',
      imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80',
      noiseLevel: '25 dB — Padded Team Room', hourlyRate: 30, rating: 4.8, capacity: 10,
      tagline: 'HD Video conferencing hub',
      features: ['Logitech Rally 4K bar', 'Full-wall magnetic glass board', '10 ergonomic chairs'],
      availability: 'Available', specs: { powerOutlets: 12 }
    },
    {
      id: '12', name: 'Acoustic Voiceover & Podcast Hub', type: 'group-discussion', categoryName: 'Group Suites',
      imageUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80',
      noiseLevel: '0 dB — Broadcast Soundproof', hourlyRate: 26, rating: 4.9, capacity: 4,
      tagline: 'Studio podcast & group recording suite',
      features: ['Shure SM7B Condenser Mics', 'Rødecaster Pro Audio Interface', 'Acoustic diffuser walls'],
      availability: 'Available', specs: { powerOutlets: 8 }
    },
    {
      id: '16', name: 'Academic Team Workshop Studio', type: 'group-discussion', categoryName: 'Group Suites',
      imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80',
      noiseLevel: '20 dB — Interactive Workshop', hourlyRate: 32, rating: 5.0, capacity: 12,
      tagline: 'Grand seminar & workshop studio',
      features: ['Dual 85" Ultra-HD Smart Displays', 'Ceiling-array boundary mics', 'Modular collaborative seating'],
      availability: 'Available', specs: { powerOutlets: 16 }
    }
  ];

  let activeFilter = 'all';
  let darkMode = localStorage.getItem('studynest-dark') === 'true';
  let isRtl = localStorage.getItem('studynest-rtl') === 'true';

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
    $$('.dark-toggle').forEach(function (btn) {
      var labelSpan = btn.querySelector('.theme-label');
      if (labelSpan) {
        btn.innerHTML = (darkMode ? '<i data-lucide="sun"></i>' : '<i data-lucide="moon"></i>') +
          '<span class="theme-label">' + (darkMode ? 'Light Mode' : 'Dark Mode') + '</span>';
      } else {
        btn.innerHTML = darkMode ? '<i data-lucide="sun"></i>' : '<i data-lucide="moon"></i>';
      }
      if (typeof lucide !== 'undefined') lucide.createIcons({ nodes: [btn] });
    });
  }

  function toggleRtl() {
    isRtl = !isRtl;
    if (isRtl) {
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      document.documentElement.removeAttribute('dir');
    }
    localStorage.setItem('studynest-rtl', isRtl);
    updateRtlButton();
    showToast(isRtl ? 'RTL Layout Enabled' : 'LTR Layout Enabled (Default)', 'info');
  }

  function updateRtlButton() {
    $$('.rtl-toggle').forEach(function (btn) {
      btn.classList.toggle('active', isRtl);
      btn.setAttribute('title', isRtl ? 'Switch to LTR Mode' : 'Switch to RTL Mode');
      var labelSpan = btn.querySelector('.rtl-label');
      if (labelSpan) {
        labelSpan.textContent = isRtl ? 'LTR Mode' : 'RTL Mode';
      }
    });
  }

  function highlightNav() {
    const page = document.body.dataset.page || 'home';
    $$('.nav__links a, .nav__mobile a').forEach(function (a) {
      const navTarget = a.getAttribute('data-nav');
      if (navTarget) {
        if (page === 'service-details') {
          a.classList.toggle('active', navTarget === 'services');
        } else {
          a.classList.toggle('active', navTarget === page);
        }
      }
    });
  }

  function buildCardHtml(room) {
    var featuresList = (room.features || []).map(function (f) {
      return '<li><i data-lucide="check-circle-2"></i><span>' + f + '</span></li>';
    }).join('');

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
        '<ul class="card__features">' + featuresList + '</ul>' +
      '</div>' +
      '<div class="card__footer">' +
        '<a class="btn btn--sm btn--ghost" href="service-details.html?id=' + room.id + '">View Specs</a>' +
        '<a class="btn btn--sm btn--primary" href="service-details.html?id=' + room.id + '"><i data-lucide="calendar"></i><span>Reserve</span></a>' +
      '</div>' +
    '</div>';
  }

  function renderRoomCards() {
    var grid = $('#rooms-grid');
    if (!grid) return;

    var isIndexPage = document.body.dataset.page === 'home' || !document.body.dataset.page;

    var listToShow;
    if (isIndexPage) {
      // On index page, show ONLY 3 room cards in total (1 representing each featured type)
      var p1 = rooms.find(function (r) { return r.type === 'silent-pod'; });
      var p2 = rooms.find(function (r) { return r.type === 'private-study'; });
      var p3 = rooms.find(function (r) { return r.type === 'group-discussion'; });
      listToShow = [p1, p2, p3].filter(Boolean);
    } else {
      listToShow = rooms.filter(function (r) {
        return activeFilter === 'all' || r.type === activeFilter;
      });
    }

    grid.innerHTML = listToShow.map(buildCardHtml).join('');
    if (typeof lucide !== 'undefined') lucide.createIcons({ nodes: [grid] });
  }

  function setFilter(filter) {
    activeFilter = filter || 'all';
    $$('.filter-tab').forEach(function (t) {
      t.classList.toggle('active', t.dataset.filter === activeFilter);
    });
    renderRoomCards();
  }

  function renderMatrixCards() {
    var grid = $('#matrix-grid');
    if (!grid) return;
    grid.innerHTML = rooms.map(function (room) {
      var isAvail = room.availability === 'Available';
      return '<div class="matrix-card">' +
        '<div>' +
          '<div class="matrix-card__head">' +
            '<div>' +
              '<h4 class="matrix-card__name">' + room.name + '</h4>' +
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
          '<a class="btn btn--sm btn--primary btn--full" href="service-details.html?id=' + room.id + '"><i data-lucide="calendar"></i><span>Reserve This Unit</span></a>' +
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
    var categoryEl = $('#detail-category-badge');
    var imgEl = $('#detail-room-img');
    var featuresEl = $('#detail-features-list');

    if (nameEl) nameEl.textContent = room.name;
    if (priceEl) priceEl.textContent = '$' + room.hourlyRate + ' / hr';
    if (descEl) descEl.textContent = room.tagline + ' — purpose-built for unbroken concentration, academic research, and deep work sessions.';
    if (noiseEl) noiseEl.textContent = room.noiseLevel;
    if (capEl) capEl.textContent = room.capacity + ' ' + (room.capacity === 1 ? 'Person' : 'People');
    if (powerEl) powerEl.textContent = room.specs.powerOutlets + ' AC & USB Outlets';
    if (categoryEl) categoryEl.textContent = room.categoryName || 'Acoustic Suite';
    if (imgEl && room.imageUrl) imgEl.src = room.imageUrl;

    if (featuresEl && room.features) {
      featuresEl.innerHTML = room.features.map(function(f) {
        return '<li><i data-lucide="check-circle-2"></i><span>' + f + '</span></li>';
      }).join('');
      if (typeof lucide !== 'undefined') lucide.createIcons({ nodes: [featuresEl] });
    }
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

  function togglePasswordVisibility(btn) {
    var group = btn.closest('.password-input-group');
    if (!group) return;
    var input = group.querySelector('input');
    if (!input) return;
    var isPass = input.type === 'password';
    input.type = isPass ? 'text' : 'password';
    btn.innerHTML = isPass ? '<i data-lucide="eye-off"></i>' : '<i data-lucide="eye"></i>';
    btn.setAttribute('aria-label', isPass ? 'Hide password' : 'Show password');
    if (typeof lucide !== 'undefined') lucide.createIcons({ nodes: [btn] });
  }

  function init() {
    if (darkMode) document.body.classList.add('dark-mode');
    if (isRtl) {
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      document.documentElement.removeAttribute('dir');
    }
    updateDarkIcon();
    updateRtlButton();
    highlightNav();

    $$('.dark-toggle').forEach(function (btn) {
      btn.addEventListener('click', toggleDark);
    });

    $$('.rtl-toggle').forEach(function (btn) {
      btn.addEventListener('click', toggleRtl);
    });

    $$('.password-toggle-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        togglePasswordVisibility(btn);
      });
    });

    var toggleBtn = $('.nav__toggle');
    var mobileMenu = $('.nav__mobile');
    if (toggleBtn && mobileMenu) {
      toggleBtn.addEventListener('click', function () {
        mobileMenu.classList.toggle('open');
      });
    }

    $$('.filter-tab').forEach(function (tab) {
      tab.addEventListener('click', function (e) {
        e.preventDefault();
        var selectedFilter = tab.dataset.filter || 'all';
        setFilter(selectedFilter);
        var label = tab.textContent.trim() || 'spaces';
        showToast('Showing ' + label, 'info');
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

  window.togglePasswordVisibility = togglePasswordVisibility;
  window.StudyNest = window.StudyNest || {};
  window.StudyNest.rooms = rooms;
  window.StudyNest.showToast = showToast;
  window.StudyNest.togglePasswordVisibility = togglePasswordVisibility;
  window.StudyNest.bookRoom = function (id) {
    var room = rooms.find(function (r) { return r.id === id; });
    var name = room ? room.name : 'Study Space';
    showToast('Redirecting to reserve ' + name + '...', 'success');
    setTimeout(function () {
      window.location.href = 'dashboard.html?room=' + id;
    }, 1000);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
