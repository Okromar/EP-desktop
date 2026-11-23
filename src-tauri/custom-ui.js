(function () {
  function applyCustomLayout() {
    if (!document.body || document.getElementById("ephec-custom-theme")) return;

    const style = document.createElement("style");
    style.id = "ephec-custom-theme";
    style.textContent = `
      :root {
        --ep-nav-bg: rgba(15, 23, 42, 0.96);
        --ep-page-bg: #f1f5f9;
        --ep-card-bg: #ffffff;
        --ep-border: #e2e8f0;
        --ep-accent: #2563eb;
        --ep-text-main: #0f172a;
        --ep-text-muted: #64748b;
        --ep-nav-h: 58px;
      }

      body {
        font-family: 'Segoe UI', system-ui, -apple-system, sans-serif !important;
        background-color: var(--ep-page-bg) !important;
        color: var(--ep-text-main) !important;
        margin: 0 !important;
        overflow-x: hidden !important;
      }

      nav#sidebar,
      #sidebarCollapse {
        display: none !important;
        width: 0 !important;
        margin: 0 !important;
      }

      .wrapper {
        display: block !important;
        width: 100% !important;
      }

      #content,
      #content.active {
        width: 100% !important;
        max-width: 100% !important;
        margin-left: 0 !important;
        padding: calc(var(--ep-nav-h) + 22px) 28px 32px 28px !important;
        box-sizing: border-box !important;
      }

      #content > .container.body-content,
      #content > .container {
        max-width: 1440px !important;
        width: 100% !important;
        margin: 0 auto !important;
        padding: 0 !important;
      }

      nav.navbar.fixed-top {
        height: var(--ep-nav-h) !important;
        background: var(--ep-nav-bg) !important;
        backdrop-filter: blur(12px) !important;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
        padding: 0 24px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        box-shadow: 0 4px 20px rgba(15, 23, 42, 0.18) !important;
        z-index: 1050 !important;
      }

      nav.navbar > div:first-child {
        display: flex !important;
        align-items: center !important;
        gap: 10px !important;
      }

      #logo-ephec {
        height: 28px !important;
        width: auto !important;
        margin: 0 4px 0 0 !important;
        filter: brightness(0) invert(1) !important;
      }

      h1#ePerso {
        font-size: 1.1rem !important;
        font-weight: 700 !important;
        color: #f8fafc !important;
        letter-spacing: -0.02em !important;
        margin-right: 16px !important;
      }

      #ep-quick-tabs {
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .ep-tab {
        color: #94a3b8 !important;
        text-decoration: none !important;
        font-size: 0.85rem;
        font-weight: 500;
        padding: 7px 13px;
        border-radius: 8px;
        transition: all 0.15s ease;
        display: inline-flex;
        align-items: center;
        gap: 7px;
        cursor: pointer;
        border: none;
        background: transparent;
      }

      .ep-tab:hover {
        color: #ffffff !important;
        background: rgba(255, 255, 255, 0.09);
      }

      .ep-tab.active {
        color: #ffffff !important;
        background: var(--ep-accent);
        box-shadow: 0 2px 10px rgba(37, 99, 235, 0.4);
      }

      .ep-dropdown {
        position: relative;
      }
      .ep-dropdown-menu {
        display: none;
        position: absolute;
        top: calc(100% + 8px);
        left: 0;
        min-width: 220px;
        background: #0f172a;
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 10px;
        padding: 6px;
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
        z-index: 2000;
      }
      .ep-dropdown.open .ep-dropdown-menu {
        display: block;
      }
      .ep-dropdown-menu a {
        display: block;
        color: #cbd5e1 !important;
        text-decoration: none !important;
        font-size: 0.83rem;
        padding: 8px 12px;
        border-radius: 7px;
        transition: background 0.15s;
      }
      .ep-dropdown-menu a:hover {
        background: rgba(255, 255, 255, 0.1);
        color: #fff !important;
      }
      .ep-dropdown-menu a.ep-logout {
        color: #f87171 !important;
        border-top: 1px solid rgba(255, 255, 255, 0.08);
        margin-top: 4px;
        padding-top: 9px;
      }

      .ep-user-pill {
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.12);
        padding: 6px 14px;
        border-radius: 999px;
        font-size: 0.82rem;
        font-weight: 500;
        color: #f1f5f9;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .body-content > h3 {
        font-size: 1.45rem !important;
        font-weight: 700 !important;
        color: var(--ep-text-main) !important;
        margin-bottom: 14px !important;
        letter-spacing: -0.02em !important;
      }

      .body-content .form-row .col-auto {
        border-radius: 999px !important;
        padding: 4px 14px !important;
        font-size: 0.8rem !important;
        font-weight: 600 !important;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08) !important;
      }

      #weekSelector {
        border-radius: 10px !important;
        border: 1px solid var(--ep-border) !important;
        background-color: #ffffff !important;
        padding: 6px 14px !important;
        font-size: 0.88rem !important;
        font-weight: 500 !important;
        color: var(--ep-text-main) !important;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04) !important;
      }

      #calendar-container {
        background: var(--ep-card-bg) !important;
        border: 1px solid var(--ep-border) !important;
        border-radius: 16px !important;
        padding: 20px !important;
        box-shadow: 0 10px 30px rgba(15, 23, 42, 0.05) !important;
        margin-top: 10px !important;
      }

      .fc .fc-toolbar.fc-header-toolbar {
        margin-bottom: 18px !important;
      }
      .fc .fc-toolbar-title {
        font-size: 1.2rem !important;
        font-weight: 700 !important;
        color: var(--ep-text-main) !important;
        text-transform: capitalize !important;
      }
      .fc .fc-button-primary {
        background-color: #f8fafc !important;
        border: 1px solid var(--ep-border) !important;
        color: var(--ep-text-main) !important;
        font-size: 0.83rem !important;
        font-weight: 600 !important;
        border-radius: 8px !important;
        padding: 6px 12px !important;
        box-shadow: none !important;
      }
      .fc .fc-button-primary:hover {
        background-color: #e2e8f0 !important;
      }
      .fc .fc-button-primary.fc-button-active {
        background-color: var(--ep-accent) !important;
        border-color: var(--ep-accent) !important;
        color: #ffffff !important;
      }
      .fc .fc-button-group > .fc-button {
        margin-left: 4px !important;
        border-radius: 8px !important;
      }

      .fc-theme-standard th {
        background: #f8fafc !important;
        border-color: var(--ep-border) !important;
        padding: 10px 0 !important;
      }
      .fc .fc-col-header-cell-cushion {
        color: var(--ep-text-main) !important;
        font-weight: 600 !important;
        font-size: 0.86rem !important;
        text-decoration: none !important;
      }

      .fc-theme-standard td,
      .fc-theme-standard .fc-scrollgrid {
        border-color: #edf2f7 !important;
      }
      .fc .fc-timegrid-slot {
        height: 2.35em !important;
      }
      .fc .fc-timegrid-slot-label-cushion {
        font-size: 0.78rem !important;
        font-weight: 600 !important;
        color: var(--ep-text-muted) !important;
      }

      .fc .fc-day-today {
        background-color: rgba(37, 99, 235, 0.04) !important;
      }

      .fc-timegrid-event {
        border-radius: 9px !important;
        border: none !important;
        border-left: 4px solid rgba(255, 255, 255, 0.75) !important;
        box-shadow: 0 3px 10px rgba(15, 23, 42, 0.12) !important;
        padding: 3px 5px !important;
      }
      .fc-event-main {
        font-size: 0.8rem !important;
        line-height: 1.3 !important;
      }
      .fc .fc-timegrid-now-indicator-line {
        border-color: #ef4444 !important;
        border-width: 2px !important;
      }

      #epTestNotifBtn {
        background: #eff6ff;
        color: #1d4ed8;
        border: 1px solid #bfdbfe;
        border-radius: 7px;
        padding: 3px 10px;
        font-size: 0.78rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.15s ease;
      }
      #epTestNotifBtn:hover {
        background: #2563eb;
        color: #ffffff;
        border-color: #2563eb;
      }
    `;
    document.head.appendChild(style);

    const navbarLeft = document.querySelector("nav.navbar > div:first-child");
    if (navbarLeft && !document.getElementById("ep-quick-tabs")) {
      const oldLogo = document.getElementById("logo-ephec");
      if (oldLogo) {
        const imgLogo = document.createElement("img");
        imgLogo.id = "logo-ephec";
        imgLogo.src = "/Images/logo-ephec-min.svg";
        imgLogo.alt = "EPHEC";
        oldLogo.replaceWith(imgLogo);
      }

      const currentPath = window.location.pathname.toLowerCase();
      const tabs = [
        { label: "Accueil", href: "/Home/Index", icon: "fa-home" },
        { label: "Horaires", href: "/HeHoraire/HoraireV2", icon: "fa-calendar-alt" },
        { label: "Résultats", href: "/HeResultat/Resultat", icon: "fa-graduation-cap" },
        { label: "Fiches cours", href: "/HeFicheCours/Index", icon: "fa-book" },
        { label: "Documents", href: "/HeMesDocuments/Index", icon: "fa-folder-open" }
      ];

      const tabsContainer = document.createElement("div");
      tabsContainer.id = "ep-quick-tabs";

      tabs.forEach((t) => {
        const a = document.createElement("a");
        a.href = t.href;
        a.className = "ep-tab" + (currentPath.includes(t.href.toLowerCase()) ? " active" : "");
        a.innerHTML = `<i class="fas ${t.icon}"></i><span>${t.label}</span>`;
        tabsContainer.appendChild(a);
      });

      const moreWrap = document.createElement("div");
      moreWrap.className = "ep-dropdown";
      moreWrap.innerHTML = `
        <button type="button" class="ep-tab">
          <i class="fas fa-th-large"></i><span>Plus</span><i class="fas fa-chevron-down" style="font-size:0.7rem;"></i>
        </button>
        <div class="ep-dropdown-menu">
          <a href="/HeOccupationLocaux/OccupationLocaux">Occupation des locaux</a>
          <a href="/HeJustificatifsAbsence/MesDemandes">Justificatifs d'absence</a>
          <a href="/HeInscriptionEnCours/Inscription">Inscription / PAE</a>
          <a href="/HeEtudiant/Detail">Données personnelles</a>
          <a href="https://portail.ephec.be/" target="_blank">Portail applications EPHEC</a>
          <a href="/Account/SignOut" class="ep-logout">Se déconnecter</a>
        </div>
      `;
      const moreBtn = moreWrap.querySelector("button");
      moreBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        moreWrap.classList.toggle("open");
      });
      document.addEventListener("click", () => moreWrap.classList.remove("open"));

      tabsContainer.appendChild(moreWrap);
      navbarLeft.appendChild(tabsContainer);
    }

    const navbarRight = document.querySelector("nav.navbar > div:last-child");
    if (navbarRight) {
      navbarRight.classList.add("ep-user-pill");
    }

    // --- NOTIFICATIONS AVANT LE COURS + MODE DEV ---
    function initCourseNotifications() {
      if (document.getElementById("ep-notif-control")) return;

      const savedLead = localStorage.getItem("ep_notif_minutes") || "15";

      function cleanText(raw) {
        if (!raw) return "";
        const div = document.createElement("div");
        div.innerHTML = raw;
        return (div.textContent || "").trim();
      }

      function showInAppToast(title, body, isTest) {
        const old = document.getElementById("ep-toast-banner");
        if (old) old.remove();

        const banner = document.createElement("div");
        banner.id = "ep-toast-banner";
        banner.style.cssText =
          "position:fixed;bottom:22px;right:22px;z-index:9999;background:#0f172a;color:#fff;padding:14px 18px;border-radius:12px;border-left:4px solid #3b82f6;box-shadow:0 12px 30px rgba(0,0,0,0.3);max-width:360px;font-size:0.86rem;";
        banner.innerHTML = `
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
            <span style="font-weight:700;">${isTest ? "🧪 [TEST DEV] " : "🔔 "}${title}</span>
            <button id="epCloseToast" style="background:none;border:none;color:#94a3b8;cursor:pointer;font-size:1rem;padding:0 0 0 10px;">×</button>
          </div>
          <div style="color:#cbd5e1;">${body}</div>
        `;
        document.body.appendChild(banner);
        document.getElementById("epCloseToast").onclick = () => banner.remove();
        setTimeout(() => banner.remove(), 9000);
      }

      async function sendCourseNotification(title, startTimeStr, room, minutesLeft, isTest = false) {
        const bodyParts = [`Début à ${startTimeStr} (dans ${minutesLeft} min)`];
        if (room) bodyParts.push(`Local : ${room}`);
        const body = bodyParts.join(" • ");
        const notifTitle = (isTest ? "[TEST] " : "") + title;

        // 1. Vraie notification native Windows 11 via Tauri v2
        try {
          if (window.__TAURI__ && window.__TAURI__.notification) {
            const { isPermissionGranted, requestPermission, sendNotification } = window.__TAURI__.notification;
            let granted = await isPermissionGranted();
            if (!granted) {
              const permission = await requestPermission();
              granted = permission === "granted";
            }
            if (granted) {
              sendNotification({ title: notifTitle, body: body });
            }
          }
        } catch (err) {
          console.error("Erreur notification Tauri:", err);
        }

        // 2. Garde aussi le toast visuel dans l'app lors d'un clic sur "Tester notif"
        if (isTest) {
          showInAppToast(title, body, true);
        }
      }

        if ("Notification" in window) {
          if (Notification.permission === "granted") {
            new Notification((isTest ? "[TEST] " : "") + title, {
              body: body,
              icon: "/Images/favicon.ico"
            });
          } else if (Notification.permission === "default") {
            Notification.requestPermission().then((perm) => {
              if (perm === "granted") {
                new Notification((isTest ? "[TEST] " : "") + title, {
                  body: body,
                  icon: "/Images/favicon.ico"
                });
              }
            });
          }
        }
      }

      const weekSelector = document.getElementById("weekSelector");
      if (weekSelector && weekSelector.parentElement) {
        const wrap = document.createElement("div");
        wrap.id = "ep-notif-control";
        wrap.style.cssText =
          "display:inline-flex;align-items:center;gap:10px;margin-left:10px;background:#fff;border:1px solid #e2e8f0;border-radius:10px;padding:5px 12px;font-size:0.84rem;font-weight:500;color:#0f172a;box-shadow:0 1px 3px rgba(0,0,0,0.04);";

        wrap.innerHTML = `
          <i class="fas fa-bell" style="color:#2563eb;"></i>
          <span>Rappel :</span>
          <select id="epNotifLead" style="border:none;background:transparent;font-weight:600;color:#0f172a;cursor:pointer;outline:none;">
            <option value="0">Désactivé</option>
            <option value="5">5 min avant</option>
            <option value="10">10 min avant</option>
            <option value="15">15 min avant</option>
            <option value="30">30 min avant</option>
          </select>
          <button type="button" id="epTestNotifBtn" title="Simuler une notification de cours maintenant">
            <i class="fas fa-flask"></i> Tester notif
          </button>
        `;

        weekSelector.parentElement.appendChild(wrap);
        const selectEl = document.getElementById("epNotifLead");
        selectEl.value = savedLead;

        selectEl.addEventListener("change", () => {
          localStorage.setItem("ep_notif_minutes", selectEl.value);
          if (selectEl.value !== "0" && "Notification" in window && Notification.permission === "default") {
            Notification.requestPermission();
          }
        });

        // Bouton Mode Dev pour tester la notification immédiatement
        document.getElementById("epTestNotifBtn").addEventListener("click", () => {
          const lead = parseInt(selectEl.value, 10) || 15;
          let sampleTitle = "Électricité et Circuits DC";
          let sampleRoom = "G-259";
          let sampleTime = new Date(Date.now() + lead * 60000).toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit"
          });

          // Si le calendrier a des événements chargés, prend le prochain cours réel (ou le premier de la semaine)
          if (window.calendar && typeof window.calendar.getEvents === "function") {
            const events = window.calendar.getEvents().filter((e) => e.start);
            events.sort((a, b) => a.start.getTime() - b.start.getTime());
            const nextEv = events.find((e) => e.start.getTime() > Date.now()) || events[0];
            if (nextEv) {
              sampleTitle = nextEv.title;
              sampleRoom = cleanText(nextEv.extendedProps?.Location || "") || "Local non précisé";
              sampleTime = nextEv.start.toLocaleTimeString("fr-FR", {
                hour: "2-digit",
                minute: "2-digit"
              });
            }
          }

          sendCourseNotification(sampleTitle, sampleTime, sampleRoom, lead, true);
        });
      }

      if ("Notification" in window && Notification.permission === "default" && savedLead !== "0") {
        Notification.requestPermission();
      }

      function checkUpcomingEvents() {
        const leadMinutes = parseInt(localStorage.getItem("ep_notif_minutes") || "15", 10);
        if (!leadMinutes || leadMinutes <= 0) return;
        if (!window.calendar || typeof window.calendar.getEvents !== "function") return;

        const now = Date.now();
        const leadMs = leadMinutes * 60 * 1000;
        const events = window.calendar.getEvents();

        events.forEach((ev) => {
          if (!ev.start) return;
          const startMs = ev.start.getTime();
          const diffMs = startMs - now;

          if (diffMs <= leadMs + 5000 && diffMs >= leadMs - 65000) {
            const room = cleanText(ev.extendedProps?.Location || "");
            const startFormatted = ev.start.toLocaleTimeString("fr-FR", {
              hour: "2-digit",
              minute: "2-digit"
            });
            const notifKey = `ep_notified_${ev.title}_${startMs}_${leadMinutes}`;

            if (!sessionStorage.getItem(notifKey)) {
              sessionStorage.setItem(notifKey, "1");
              sendCourseNotification(ev.title, startFormatted, room, leadMinutes, false);
            }
          }
        });
      }

      setTimeout(checkUpcomingEvents, 3000);
      setInterval(checkUpcomingEvents, 30000);
    }

    initCourseNotifications();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyCustomLayout);
  } else {
    applyCustomLayout();
  }
})();
