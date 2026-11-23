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

      /* 1. SUPPRESSION TOTALE DE LA BARRE LATÉRALE & DU BOUTON MENU */
      nav#sidebar,
      #sidebarCollapse {
        display: none !important;
        width: 0 !important;
        margin: 0 !important;
      }

      /* CONTENU PLEINE LARGEUR SANS DÉCALAGE */
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

      /* 2. BARRE SUPÉRIEURE & LOGO EPHEC */
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

      /* Onglets de navigation */
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

      /* Menu déroulant "Plus" pour les pages secondaires */
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

      /* 3. REFONTE COMPLÈTE DE L'INTERFACE DES HORAIRES */
      .body-content > h3 {
        font-size: 1.45rem !important;
        font-weight: 700 !important;
        color: var(--ep-text-main) !important;
        margin-bottom: 14px !important;
        letter-spacing: -0.02em !important;
      }

      /* Badges légende Cours / Examens / Événements */
      .body-content .form-row .col-auto {
        border-radius: 999px !important;
        padding: 4px 14px !important;
        font-size: 0.8rem !important;
        font-weight: 600 !important;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08) !important;
      }

      /* Sélecteur de semaine */
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

      /* Conteneur principal du calendrier */
      #calendar-container {
        background: var(--ep-card-bg) !important;
        border: 1px solid var(--ep-border) !important;
        border-radius: 16px !important;
        padding: 20px !important;
        box-shadow: 0 10px 30px rgba(15, 23, 42, 0.05) !important;
        margin-top: 10px !important;
      }

      /* Barre d'outils FullCalendar */
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
        transition: all 0.15s ease !important;
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

      /* En-têtes des jours */
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

      /* Grille horaire */
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

      /* Colonne "Aujourd'hui" */
      .fc .fc-day-today {
        background-color: rgba(37, 99, 235, 0.04) !important;
      }

      /* Cartes des cours (Events) */
      .fc-timegrid-event {
        border-radius: 9px !important;
        border: none !important;
        border-left: 4px solid rgba(255, 255, 255, 0.75) !important;
        box-shadow: 0 3px 10px rgba(15, 23, 42, 0.12) !important;
        padding: 3px 5px !important;
        transition: transform 0.12s ease, box-shadow 0.12s ease !important;
      }
      .fc-timegrid-event:hover {
        transform: translateY(-1px) !important;
        box-shadow: 0 6px 16px rgba(15, 23, 42, 0.18) !important;
        z-index: 10 !important;
      }
      .fc-event-main {
        font-size: 0.8rem !important;
        line-height: 1.3 !important;
      }

      /* Ligne de l'heure actuelle */
      .fc .fc-timegrid-now-indicator-line {
        border-color: #ef4444 !important;
        border-width: 2px !important;
      }
    `;
    document.head.appendChild(style);

    // 2. Remplacement propre du logo dans la navbar avec le SVG officiel EPHEC
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

      // Menu "Plus" pour accéder aux autres rubriques sans sidebar
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
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyCustomLayout);
  } else {
    applyCustomLayout();
  }
})();
