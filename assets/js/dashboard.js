/* ==========================================================
   StudyNest — Dashboard Application JavaScript
   ========================================================== */

(function () {
  'use strict';

  function getStoredBookings() {
    try {
      const data = localStorage.getItem('studynest-bookings');
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function saveBookings(b) {
    try {
      localStorage.setItem('studynest-bookings', JSON.stringify(b));
    } catch (e) {}
  }

  let bookings = getStoredBookings();
  let bookingCounter = bookings.length > 0 ? Math.max(...bookings.map(b => parseInt(b.id) || 1000)) + 1 : 1001;

  const historyData = [
    { space: 'Silent Solo Pod Alpha', date: 'Aug 10, 2026', time: '09:00 AM – 12:00 PM', duration: '3 Hours', status: 'Completed' },
    { space: 'Executive Scholar Studio', date: 'Aug 08, 2026', time: '02:00 PM – 06:00 PM', duration: '4 Hours', status: 'Completed' },
    { space: 'Collaborative Research Hub', date: 'Aug 04, 2026', time: '06:00 PM – 09:00 PM', duration: '3 Hours', status: 'Completed' },
  ];

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }

  function generatePIN() {
    return String(Math.floor(1000 + Math.random() * 9000));
  }

  function renderDashboardPasses() {
    var container = $('#passes-container');
    var activeCount = $('#active-count');
    if (activeCount) activeCount.textContent = bookings.length;
    if (!container) return;

    if (bookings.length === 0) {
      container.innerHTML =
        '<div class="dash-empty">' +
          '<div class="dash-empty__icon"><i data-lucide="calendar"></i></div>' +
          '<h3>No active bookings right now</h3>' +
          '<p>Ready for your next deep focus block? Reserve a soundproofed pod or private studio.</p>' +
          '<a class="btn btn--primary btn--sm" href="services.html">Reserve Study Room</a>' +
        '</div>';
    } else {
      container.innerHTML =
        '<div class="passes-grid">' +
        bookings.map(function (b) {
          return '<div class="pass-card" data-booking-id="' + b.id + '">' +
            '<div class="pass-card__body">' +
              '<div class="pass-card__head">' +
                '<span class="pass-card__id">Pass #' + b.id + '</span>' +
                '<span class="badge badge--status badge--status-confirmed">' + b.status.toUpperCase() + '</span>' +
              '</div>' +
              '<h3 class="pass-card__room">' + b.roomName + '</h3>' +
              '<p class="pass-card__seat">' + b.seatNumber + '</p>' +
              '<div class="pass-card__details">' +
                '<div class="pass-card__detail"><i data-lucide="calendar"></i><span>' + b.date + '</span></div>' +
                '<div class="pass-card__detail"><i data-lucide="clock"></i><span>' + b.timeSlot + ' (' + b.durationHours + ' hrs)</span></div>' +
              '</div>' +
              '<div class="pass-card__pin">' +
                '<div>' +
                  '<p class="pass-card__pin-label">Keypad Passcode</p>' +
                  '<p class="pass-card__pin-code">' + b.passCode + '</p>' +
                '</div>' +
                '<button class="pass-card__pin-copy" onclick="StudyNest.copyPIN(\'' + b.passCode + '\')" title="Copy PIN"><i data-lucide="copy"></i></button>' +
              '</div>' +
            '</div>' +
            '<div class="pass-card__footer">' +
              '<span class="pass-card__price">Total: $' + b.totalPrice + '</span>' +
              '<button class="btn--danger-text" onclick="StudyNest.cancelBooking(\'' + b.id + '\')"><i data-lucide="trash-2"></i><span>Cancel Slot</span></button>' +
            '</div>' +
          '</div>';
        }).join('') +
        '</div>';
    }
    if (typeof lucide !== 'undefined') lucide.createIcons({ nodes: [container] });
  }

  function renderQuickBookOptions() {
    var sel = $('#quick-room-select');
    if (!sel) return;
    var rooms = window.StudyNest.rooms || [];
    sel.innerHTML = rooms.map(function (r) {
      return '<option value="' + r.id + '">' + r.name + ' ($' + r.hourlyRate + '/h)</option>';
    }).join('');
  }

  function renderHistoryTable() {
    var tbody = $('#history-tbody');
    if (!tbody) return;
    tbody.innerHTML = historyData.map(function (h) {
      return '<tr>' +
        '<td>' + h.space + '</td>' +
        '<td>' + h.date + '</td>' +
        '<td>' + h.time + '</td>' +
        '<td>' + h.duration + '</td>' +
        '<td><span class="status-done">' + h.status + '</span></td>' +
      '</tr>';
    }).join('');
  }

  function bookRoom(roomId) {
    var rooms = window.StudyNest.rooms || [];
    var room = rooms.find(function (r) { return r.id === roomId; });
    if (!room) return;

    var today = new Date().toISOString().split('T')[0];
    bookingCounter++;
    var newBooking = {
      id: String(bookingCounter),
      roomId: room.id,
      roomName: room.name,
      date: today,
      timeSlot: '02:00 PM – 05:00 PM',
      durationHours: 3,
      seatNumber: 'Seat A-0' + (Math.floor(Math.random() * 9) + 1),
      totalPrice: room.hourlyRate * 3,
      passCode: generatePIN(),
      status: 'confirmed'
    };
    bookings.push(newBooking);
    saveBookings(bookings);
    if (window.StudyNest.showToast) window.StudyNest.showToast('Successfully booked ' + room.name + ' for ' + today + '!', 'success');

    if (document.body.dataset.page === 'dashboard') {
      renderDashboardPasses();
    } else {
      setTimeout(function () {
        window.location.href = 'dashboard.html';
      }, 1000);
    }
  }

  function cancelBooking(bookingId) {
    bookings = bookings.filter(function (b) { return b.id !== bookingId; });
    saveBookings(bookings);
    if (window.StudyNest.showToast) window.StudyNest.showToast('Booking #' + bookingId + ' has been cancelled.', 'error');
    renderDashboardPasses();
  }

  function copyPIN(pin) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(pin);
    }
    if (window.StudyNest.showToast) window.StudyNest.showToast('Passcode PIN ' + pin + ' copied to clipboard!', 'info');
  }

  function handleQuickBook(e) {
    e.preventDefault();
    var roomId = $('#quick-room-select').value;
    var date = $('#quick-date').value;
    var time = $('#quick-time').value;
    var rooms = window.StudyNest.rooms || [];
    var room = rooms.find(function (r) { return r.id === roomId; });
    if (!room) return;

    bookingCounter++;
    bookings.push({
      id: String(bookingCounter),
      roomId: room.id,
      roomName: room.name,
      date: date || new Date().toISOString().split('T')[0],
      timeSlot: time,
      durationHours: 3,
      seatNumber: 'Seat A-0' + (Math.floor(Math.random() * 9) + 1),
      totalPrice: room.hourlyRate * 3,
      passCode: generatePIN(),
      status: 'confirmed'
    });
    saveBookings(bookings);
    if (window.StudyNest.showToast) window.StudyNest.showToast('Successfully booked ' + room.name + ' for ' + date + '!', 'success');
    renderDashboardPasses();
  }

  function initDashboardTabs() {
    var tabBtns = document.querySelectorAll('.dash-nav-item[data-tab]');
    var tabPanels = document.querySelectorAll('.dash-tab-panel');
    if (!tabBtns.length) return;

    tabBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var tabId = btn.getAttribute('data-tab');
        tabBtns.forEach(function (b) { b.classList.remove('active'); });
        tabPanels.forEach(function (p) { p.classList.remove('active'); });

        btn.classList.add('active');
        var targetPanel = document.getElementById('panel-' + tabId);
        if (targetPanel) {
          targetPanel.classList.add('active');
        }
        var titleEl = document.getElementById('dash-top-title');
        if (titleEl) {
          var titleMap = {
            'book': 'Passes',
            'account': 'Settings',
            'history': 'History'
          };
          titleEl.textContent = titleMap[tabId] || 'Dashboard';
        }
      });
    });
  }

  function initMobileSidebar() {
    var hamburgerBtn = $('#dash-hamburger-btn');
    var closeBtn = $('#dash-sidebar-close');
    var sidebar = $('#dash-sidebar');
    var backdrop = $('#dash-sidebar-backdrop');
    var tabBtns = document.querySelectorAll('.dash-nav-item');

    if (!sidebar) return;

    function openSidebar() {
      sidebar.classList.add('open');
      if (backdrop) backdrop.classList.add('open');
    }

    function closeSidebar() {
      sidebar.classList.remove('open');
      if (backdrop) backdrop.classList.remove('open');
    }

    if (hamburgerBtn) hamburgerBtn.addEventListener('click', openSidebar);
    if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
    if (backdrop) backdrop.addEventListener('click', closeSidebar);

    tabBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (window.innerWidth <= 768) {
          closeSidebar();
        }
      });
    });
  }

  function init() {
    var quickBookForm = $('#quick-book-form');
    if (quickBookForm) quickBookForm.addEventListener('submit', handleQuickBook);

    if (document.body.dataset.page === 'dashboard') {
      initDashboardTabs();
      initMobileSidebar();
      renderDashboardPasses();
      renderQuickBookOptions();
      renderHistoryTable();
    }
  }

  window.StudyNest = window.StudyNest || {};
  window.StudyNest.bookRoom = bookRoom;
  window.StudyNest.cancelBooking = cancelBooking;
  window.StudyNest.copyPIN = copyPIN;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
