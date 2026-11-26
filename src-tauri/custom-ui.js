(function () {
  function applyCustomLayout() {
    if (!document.body || document.getElementById("ephec-custom-theme")) return;
    if (!window.location.hostname.includes("eperso.ephec.be")) return;

    const style = document.createElement("style");
    style.id = "ephec-custom-theme";
    style.textContent = window.__EPHEC_CUSTOM_CSS__ || "";
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
        { label: "Documents", href: "/HeMesDocuments/Index", icon: "fa-folder-open" },
        { label: "Moodle", href: "https://moodle.ephec.be/my/index.php", icon: "fa-chalkboard-teacher" }
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

      const moreBtn = document.createElement("button");
      moreBtn.type = "button";
      moreBtn.id = "ep-more-btn";
      moreBtn.className = "ep-tab";
      moreBtn.innerHTML = `<i class="fas fa-th-large"></i><span>Plus</span><i class="fas fa-chevron-down" style="font-size:0.7rem;"></i>`;
      tabsContainer.appendChild(moreBtn);
      navbarLeft.appendChild(tabsContainer);

      const floatingMenu = document.createElement("div");
      floatingMenu.id = "ep-floating-menu";
      floatingMenu.innerHTML = `
        <a href="/HeOccupationLocaux/OccupationLocaux"><i class="fas fa-door-open" style="width:16px;"></i><span>Occupation des locaux</span></a>
        <a href="/HeJustificatifsAbsence/MesDemandes"><i class="fas fa-file-medical" style="width:16px;"></i><span>Justificatifs d'absence</span></a>
        <a href="/HeInscriptionEnCours/Inscription"><i class="fas fa-user-check" style="width:16px;"></i><span>Inscription / PAE</span></a>
        <a href="/HeEtudiant/Detail"><i class="fas fa-id-card" style="width:16px;"></i><span>Données personnelles</span></a>
        <a href="https://portail.ephec.be/" target="_blank"><i class="fas fa-external-link-alt" style="width:16px;"></i><span>Portail applications EPHEC</span></a>
        <a href="/Account/SignOut" class="ep-logout"><i class="fas fa-sign-out-alt" style="width:16px;"></i><span>Se déconnecter</span></a>
      `;
      document.body.appendChild(floatingMenu);

      moreBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = floatingMenu.classList.contains("open");
        if (isOpen) {
          floatingMenu.classList.remove("open");
          return;
        }
        const rect = moreBtn.getBoundingClientRect();
        floatingMenu.style.top = `${rect.bottom + 8}px`;
        floatingMenu.style.left = `${Math.min(rect.left, window.innerWidth - 250)}px`;
        floatingMenu.classList.add("open");
      });

      document.addEventListener("click", (e) => {
        if (!floatingMenu.contains(e.target) && e.target !== moreBtn) {
          floatingMenu.classList.remove("open");
        }
      });
    }

    const navbarRight = document.querySelector("nav.navbar > div:last-child");
    if (navbarRight) navbarRight.classList.add("ep-user-pill");

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
            <span style="font-weight:700;">${isTest ? "[TEST] " : ""}${title}</span>
            <button id="epCloseToast" style="background:none;border:none;color:#94a3b8;cursor:pointer;font-size:1rem;padding:0 0 0 10px;">×</button>
          </div>
          <div style="color:#cbd5e1;">${body}</div>
        `;
        document.body.appendChild(banner);
        document.getElementById("epCloseToast").onclick = () => banner.remove();
        setTimeout(() => banner.remove(), 9000);
      }

      function sendCourseNotification(title, startTimeStr, room, minutesLeft, isTest) {
        const bodyParts = [`Début à ${startTimeStr} (dans ${minutesLeft} min)`];
        if (room) bodyParts.push(`Local : ${room}`);
        const body = bodyParts.join(" • ");
        const notifTitle = (isTest ? "[TEST] " : "") + title;

        const oldTitle = document.title;
        document.title = `EPHEC_NOTIF|${notifTitle}|${body}`;
        setTimeout(() => { document.title = oldTitle; }, 500);
        showInAppToast(title, body, Boolean(isTest));
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
          <button type="button" id="epTestNotifBtn" title="Tester une notification Windows">
            Tester notif
          </button>
        `;

        weekSelector.parentElement.appendChild(wrap);
        const selectEl = document.getElementById("epNotifLead");
        selectEl.value = savedLead;
        selectEl.addEventListener("change", () => {
          localStorage.setItem("ep_notif_minutes", selectEl.value);
        });

        document.getElementById("epTestNotifBtn").addEventListener("click", () => {
          const lead = parseInt(selectEl.value, 10) || 15;
          let sampleTitle = "Électricité et Circuits DC";
          let sampleRoom = "G-259";
          let sampleTime = new Date(Date.now() + lead * 60000).toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit"
          });

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

      function checkUpcomingEvents() {
        const leadMinutes = parseInt(localStorage.getItem("ep_notif_minutes") || "15", 10);
        if (!leadMinutes || leadMinutes <= 0) return;
        if (!window.calendar || typeof window.calendar.getEvents !== "function") return;

        const now = Date.now();
        const leadMs = leadMinutes * 60 * 1000;
        window.calendar.getEvents().forEach((ev) => {
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
