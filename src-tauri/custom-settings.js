(function () {
  function initSettingsModule() {
    if (!document.body || document.getElementById("ep-settings-modal")) return;
    const host = window.location.hostname;
    if (!host.includes("ephec.be") && !host.includes("office.com")) return;

    const style = document.createElement("style");
    style.textContent = `
      #ep-settings-backdrop {
        display: none; position: fixed; inset: 0; background: rgba(15, 23, 42, 0.65);
        backdrop-filter: blur(4px); z-index: 99995; align-items: center; justify-content: center;
        font-family: 'Segoe UI', system-ui, sans-serif;
      }
      #ep-settings-backdrop.open { display: flex; }
      #ep-settings-modal {
        width: 100%; max-width: 500px; background: #0f172a; color: #f8fafc;
        border: 1px solid rgba(255,255,255,0.14); border-radius: 16px;
        box-shadow: 0 24px 60px rgba(0,0,0,0.5); overflow: hidden;
      }
      .ep-set-header {
        padding: 16px 20px; border-bottom: 1px solid rgba(255,255,255,0.1);
        display: flex; justify-content: space-between; align-items: center;
      }
      .ep-set-body { padding: 18px 20px; display: flex; flex-direction: column; gap: 16px; }
      .ep-set-row {
        display: flex; justify-content: space-between; align-items: center; gap: 12px;
        background: rgba(255,255,255,0.04); padding: 12px 14px; border-radius: 10px;
      }
      .ep-set-label strong { display: block; font-size: 0.88rem; }
      .ep-set-label span { font-size: 0.76rem; color: #94a3b8; }
      .ep-set-select {
        background: #1e293b; color: #f8fafc; border: 1px solid rgba(255,255,255,0.15);
        border-radius: 8px; padding: 6px 10px; font-size: 0.82rem; outline: none;
      }
      .ep-set-btn {
        background: #2563eb; color: #fff; border: none; border-radius: 8px;
        padding: 7px 12px; font-size: 0.8rem; font-weight: 600; cursor: pointer;
        text-decoration: none;
      }
      .ep-set-btn:hover { background: #1d4ed8; }
    `;
    document.head.appendChild(style);

    const backdrop = document.createElement("div");
    backdrop.id = "ep-settings-backdrop";
    backdrop.innerHTML = `
      <div id="ep-settings-modal">
        <div class="ep-set-header">
          <strong style="font-size:1rem;">Paramètres EPHEC Desktop</strong>
          <button type="button" id="epCloseSettings" style="background:none;border:none;color:#94a3b8;font-size:1.2rem;cursor:pointer;">×</button>
        </div>
        <div class="ep-set-body">
          <div class="ep-set-row">
            <div class="ep-set-label">
              <strong>Page au démarrage</strong>
              <span>Choisis l'espace ouvert au lancement</span>
            </div>
            <select id="epSetStartup" class="ep-set-select">
              <option value="">Demander à chaque fois</option>
              <option value="https://eperso.ephec.be/">ePerso</option>
              <option value="https://moodle.ephec.be/my/index.php">Moodle</option>
              <option value="https://outlook.office.com/mail/">Outlook</option>
            </select>
          </div>

          <div class="ep-set-row">
            <div class="ep-set-label">
              <strong>Rappel avant les cours</strong>
              <span>Notification Windows automatique</span>
            </div>
            <select id="epSetLead" class="ep-set-select">
              <option value="0">Désactivé</option>
              <option value="5">5 min avant</option>
              <option value="10">10 min avant</option>
              <option value="15">15 min avant</option>
              <option value="30">30 min avant</option>
            </select>
          </div>

          <div class="ep-set-row">
            <div class="ep-set-label">
              <strong>Test notification Windows</strong>
              <span>Vérifier la bulle système</span>
            </div>
            <button type="button" class="ep-set-btn" id="epSetTestNotif">Tester</button>
          </div>

          <div class="ep-set-row">
            <div class="ep-set-label">
              <strong>Navigation rapide</strong>
              <span>Basculer d'espace maintenant</span>
            </div>
            <div style="display:flex;gap:6px;">
              <a href="https://eperso.ephec.be/" class="ep-set-btn">ePerso</a>
              <a href="https://moodle.ephec.be/my/index.php" class="ep-set-btn">Moodle</a>
              <a href="https://outlook.office.com/mail/" class="ep-set-btn">Outlook</a>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(backdrop);

    const startupSel = document.getElementById("epSetStartup");
    const leadSel = document.getElementById("epSetLead");

    window.epOpenSettings = () => {
      startupSel.value = localStorage.getItem("ephec_startup_url") || "";
      leadSel.value = localStorage.getItem("ep_notif_minutes") || "15";
      backdrop.classList.add("open");
    };

    startupSel.addEventListener("change", () => {
      if (startupSel.value) localStorage.setItem("ephec_startup_url", startupSel.value);
      else localStorage.removeItem("ephec_startup_url");
    });

    leadSel.addEventListener("change", () => {
      localStorage.setItem("ep_notif_minutes", leadSel.value);
      const inlineSel = document.getElementById("epNotifLead");
      if (inlineSel) inlineSel.value = leadSel.value;
    });

    document.getElementById("epSetTestNotif").addEventListener("click", () => {
      const oldTitle = document.title;
      document.title = "EPHEC_NOTIF|Test EPHEC Desktop|Les notifications Windows fonctionnent !";
      setTimeout(() => { document.title = oldTitle; }, 500);
    });

    document.getElementById("epCloseSettings").onclick = () => backdrop.classList.remove("open");
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) backdrop.classList.remove("open");
    });

    const quickTabs = document.getElementById("ep-quick-tabs");
    if (quickTabs) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "ep-tab";
      btn.innerHTML = `<i class="fas fa-cog"></i><span>Paramètres</span>`;
      btn.onclick = window.epOpenSettings;
      quickTabs.appendChild(btn);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSettingsModule);
  } else {
    initSettingsModule();
  }
})();
