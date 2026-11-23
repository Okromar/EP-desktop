(function () {
  function applyCustomLayout() {
    if (!document.body || document.getElementById("ephec-custom-theme")) return;

    // 1. Injection du CSS moderne pour la navbar, la sidebar et les onglets rapides
    const style = document.createElement("style");
    style.id = "ephec-custom-theme";
    style.textContent = `
      :root {
        --ep-bg-nav: rgba(15, 23, 42, 0.92);
        --ep-bg-sidebar: #0f172a;
        --ep-border: rgba(148, 163, 184, 0.14);
        --ep-accent: #3b82f6;
        --ep-accent-soft: rgba(59, 130, 246, 0.16);
        --ep-text: #f1f5f9;
        --ep-text-muted: #94a3b8;
        --ep-sidebar-w: 255px;
        --ep-nav-h: 56px;
      }

      body {
        font-family: 'Segoe UI', system-ui, -apple-system, sans-serif !important;
        background-color: #f8fafc !important;
      }

      /* --- BARRE SUPÉRIEURE (ONGLETS & HEADER) --- */
      nav.navbar.fixed-top {
        height: var(--ep-nav-h) !important;
        background: var(--ep-bg-nav) !important;
        backdrop-filter: blur(12px) !important;
        border-bottom: 1px solid var(--ep-border) !important;
        padding: 0 18px !important;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15) !important;
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        z-index: 1040 !important;
      }

      #sidebarCollapse {
        background: rgba(255, 255, 255, 0.06) !important;
        border: 1px solid var(--ep-border) !important;
        color: var(--ep-text) !important;
        border-radius: 8px !important;
        padding: 6px 12px !important;
        font-size: 0.85rem !important;
        font-weight: 500 !important;
        transition: all 0.2s ease !important;
      }
      #sidebarCollapse:hover {
        background: rgba(255, 255, 255, 0.14) !important;
      }

      #logo-ephec {
        height: 28px !important;
        filter: brightness(0) invert(1) !important;
      }

      h1#ePerso {
        font-size: 1.15rem !important;
        font-weight: 700 !important;
        letter-spacing: -0.02em !important;
        color: var(--ep-text) !important;
      }

      /* Onglets de navigation rapide dans la barre du haut */
      #ep-quick-tabs {
        display: flex;
        align-items: center;
        gap: 6px;
        margin-left: 24px;
      }
      .ep-tab {
        color: var(--ep-text-muted) !important;
        text-decoration: none !important;
        font-size: 0.84rem;
        font-weight: 500;
        padding: 6px 12px;
        border-radius: 8px;
        transition: all 0.15s ease;
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .ep-tab:hover {
        color: #fff !important;
        background: rgba(255, 255, 255, 0.08);
      }
      .ep-tab.active {
        color: #fff !important;
        background: var(--ep-accent);
        box-shadow: 0 2px 8px rgba(59, 130, 246, 0.35);
      }

      /* Badge utilisateur à droite */
      .ep-user-pill {
        background: rgba(255, 255, 255, 0.07);
        border: 1px solid var(--ep-border);
        padding: 5px 12px;
        border-radius: 999px;
        font-size: 0.82rem;
        color: var(--ep-text);
        display: flex;
        align-items: center;
        gap: 8px;
      }

      /* --- BARRE LATÉRALE (#sidebar) --- */
      nav#sidebar {
        width: var(--ep-sidebar-w) !important;
        min-width: var(--ep-sidebar-w) !important;
        background: var(--ep-bg-sidebar) !important;
        border-right: 1px solid var(--ep-border) !important;
        padding-top: calc(var(--ep-nav-h) + 12px) !important;
        padding-bottom: 24px !important;
        transition: margin-left 0.25s cubic-bezier(0.4, 0, 0.2, 1) !important;
        scrollbar-width: thin;
        scrollbar-color: #334155 transparent;
      }

      nav#sidebar.active {
        margin-left: calc(-1 * var(--ep-sidebar-w)) !important;
      }

      nav#sidebar ul.components {
        padding: 0 10px !important;
        border: none !important;
      }

      nav#sidebar ul li a {
        color: var(--ep-text-muted) !important;
        font-size: 0.86rem !important;
        font-weight: 500 !important;
        padding: 9px 12px !important;
        margin: 2px 0 !important;
        border-radius: 8px !important;
        transition: all 0.15s ease !important;
        background: transparent !important;
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
      }

      nav#sidebar ul li a:hover {
        color: #fff !important;
        background: rgba(255, 255, 255, 0.06) !important;
        transform: translateX(2px);
      }

      nav#sidebar ul li a.selected {
        color: #60a5fa !important;
        background: var(--ep-accent-soft) !important;
        font-weight: 600 !important;
        border-left: 3px solid var(--ep-accent) !important;
      }

      /* Sous-menus */
      nav#sidebar ul ul {
        background: rgba(0, 0, 0, 0.2) !important;
        border-radius: 8px !important;
        margin: 4px 0 6px 8px !important;
        padding: 4px !important;
      }
      nav#sidebar ul ul a {
        font-size: 0.82rem !important;
        padding: 7px 12px !important;
      }

      /* Bouton Déconnexion en bas mis en évidence */
      nav#sidebar a[href="/Account/SignOut"] {
        margin-top: 16px !important;
        color: #f87171 !important;
        border: 1px solid rgba(248, 113, 113, 0.2) !important;
      }
      nav#sidebar a[href="/Account/SignOut"]:hover {
        background: rgba(248, 113, 113, 0.12) !important;
      }

      /* --- ZONE DE CONTENU --- */
      #content {
        width: calc(100% - var(--ep-sidebar-w)) !important;
        margin-left: var(--ep-sidebar-w) !important;
        padding-top: calc(var(--ep-nav-h) + 20px) !important;
        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1) !important;
      }
      #content.active {
        width: 100% !important;
        margin-left: 0 !important;
      }

      @media (max-width: 950px) {
        #ep-quick-tabs { display: none; }
      }
    `;
    document.head.appendChild(style);

    // 2. Ajout des onglets rapides dans la barre supérieure
    const navbarLeft = document.querySelector("nav.navbar > div:first-child");
    if (navbarLeft && !document.getElementById("ep-quick-tabs")) {
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

      navbarLeft.appendChild(tabsContainer);
    }

    // 3. Stylisation du bloc utilisateur à droite
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
