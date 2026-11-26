(function () {
  function initNotesModule() {
    if (!document.body || document.getElementById("ep-notes-drawer")) return;
    const host = window.location.hostname;
    if (!host.includes("ephec.be")) return;

    const STORAGE_KEY = "ephec_quick_notes_v1";
    let notes = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null") || [
      { id: "n1", title: "Général", content: "" },
      { id: "n2", title: "Devoirs / Labos", content: "" }
    ];
    let activeId = notes[0].id;

    const style = document.createElement("style");
    style.textContent = `
      #ep-notes-drawer {
        position: fixed; top: 58px; right: -400px; width: 380px; max-width: 92vw;
        height: calc(100vh - 58px); background: #0f172a; color: #f8fafc;
        border-left: 1px solid rgba(255,255,255,0.12); box-shadow: -12px 0 36px rgba(0,0,0,0.35);
        z-index: 99990; display: flex; flex-direction: column; transition: right 0.2s ease;
        font-family: 'Segoe UI', system-ui, sans-serif;
      }
      #ep-notes-drawer.open { right: 0; }
      .ep-notes-head {
        padding: 14px 16px; border-bottom: 1px solid rgba(255,255,255,0.1);
        display: flex; align-items: center; justify-content: space-between;
      }
      .ep-notes-tabs {
        display: flex; gap: 6px; padding: 10px 14px; overflow-x: auto;
        border-bottom: 1px solid rgba(255,255,255,0.08);
      }
      .ep-note-chip {
        background: rgba(255,255,255,0.08); color: #cbd5e1; border: none;
        border-radius: 7px; padding: 5px 10px; font-size: 0.78rem; cursor: pointer; white-space: nowrap;
      }
      .ep-note-chip.active { background: #2563eb; color: #fff; font-weight: 600; }
      #ep-note-title-input {
        background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12);
        color: #fff; border-radius: 8px; padding: 7px 10px; margin: 12px 14px 0 14px;
        font-size: 0.88rem; font-weight: 600; outline: none;
      }
      #ep-note-textarea {
        flex: 1; margin: 10px 14px; background: rgba(255,255,255,0.04);
        border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 12px;
        color: #f1f5f9; font-size: 0.88rem; line-height: 1.5; resize: none; outline: none;
        font-family: inherit;
      }
      .ep-notes-foot {
        padding: 10px 14px; border-top: 1px solid rgba(255,255,255,0.1);
        display: flex; justify-content: space-between; align-items: center; font-size: 0.76rem; color: #94a3b8;
      }
      .ep-note-action {
        background: rgba(255,255,255,0.1); color: #f8fafc; border: none;
        border-radius: 7px; padding: 5px 10px; font-size: 0.78rem; cursor: pointer;
      }
      .ep-note-action:hover { background: #2563eb; }
      #ep-moodle-float-tools {
        position: fixed; bottom: 18px; right: 18px; z-index: 99980;
        display: flex; gap: 8px;
      }
      .ep-float-pill {
        background: #0f172a; color: #f8fafc; border: 1px solid rgba(255,255,255,0.15);
        border-radius: 999px; padding: 8px 14px; font-size: 0.82rem; font-weight: 600;
        cursor: pointer; box-shadow: 0 8px 20px rgba(0,0,0,0.28);
      }
      .ep-float-pill:hover { background: #2563eb; }
    `;
    document.head.appendChild(style);

    const drawer = document.createElement("div");
    drawer.id = "ep-notes-drawer";
    drawer.innerHTML = `
      <div class="ep-notes-head">
        <strong style="font-size:0.95rem;">Bloc-notes rapide</strong>
        <div style="display:flex;gap:6px;">
          <button type="button" class="ep-note-action" id="epAddNoteBtn">+ Note</button>
          <button type="button" class="ep-note-action" id="epCloseNotesBtn">×</button>
        </div>
      </div>
      <div class="ep-notes-tabs" id="epNotesTabs"></div>
      <input type="text" id="ep-note-title-input" placeholder="Titre de la note..." />
      <textarea id="ep-note-textarea" placeholder="Écris tes notes de cours, rappels ou liens ici..."></textarea>
      <div class="ep-notes-foot">
        <span id="epNoteSavedStatus">Sauvegardé</span>
        <div style="display:flex;gap:6px;">
          <button type="button" class="ep-note-action" id="epExportNoteBtn">Exporter .txt</button>
          <button type="button" class="ep-note-action" id="epDelNoteBtn">Suppr.</button>
        </div>
      </div>
    `;
    document.body.appendChild(drawer);

    const tabsEl = document.getElementById("epNotesTabs");
    const titleInput = document.getElementById("ep-note-title-input");
    const area = document.getElementById("ep-note-textarea");
    const statusEl = document.getElementById("epNoteSavedStatus");

    function saveAll() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
      statusEl.textContent = "Sauvegardé";
    }

    function renderNotes() {
      tabsEl.innerHTML = "";
      notes.forEach((n) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "ep-note-chip" + (n.id === activeId ? " active" : "");
        b.textContent = n.title || "Sans titre";
        b.onclick = () => { activeId = n.id; renderNotes(); };
        tabsEl.appendChild(b);
      });
      const current = notes.find((n) => n.id === activeId) || notes[0];
      activeId = current.id;
      titleInput.value = current.title;
      area.value = current.content;
    }

    titleInput.addEventListener("input", () => {
      const current = notes.find((n) => n.id === activeId);
      if (current) { current.title = titleInput.value; saveAll(); renderNotes(); }
    });

    area.addEventListener("input", () => {
      const current = notes.find((n) => n.id === activeId);
      if (current) { current.content = area.value; saveAll(); }
    });

    document.getElementById("epAddNoteBtn").onclick = () => {
      const newNote = { id: "n" + Date.now(), title: "Note " + (notes.length + 1), content: "" };
      notes.push(newNote);
      activeId = newNote.id;
      saveAll();
      renderNotes();
    };

    document.getElementById("epDelNoteBtn").onclick = () => {
      if (notes.length <= 1) { area.value = ""; notes[0].content = ""; saveAll(); return; }
      notes = notes.filter((n) => n.id !== activeId);
      activeId = notes[0].id;
      saveAll();
      renderNotes();
    };

    document.getElementById("epExportNoteBtn").onclick = () => {
      const current = notes.find((n) => n.id === activeId);
      if (!current) return;
      const blob = new Blob([current.title + "\n\n" + current.content], { type: "text/plain;charset=utf-8" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = (current.title || "note").replace(/[^a-z0-9_-]/gi, "_") + ".txt";
      a.click();
    };

    document.getElementById("epCloseNotesBtn").onclick = () => drawer.classList.remove("open");

    window.epToggleNotes = () => {
      drawer.classList.toggle("open");
      if (drawer.classList.contains("open")) renderNotes();
    };

    const quickTabs = document.getElementById("ep-quick-tabs");
    if (quickTabs) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "ep-tab";
      btn.innerHTML = `<i class="fas fa-sticky-note"></i><span>Notes</span>`;
      btn.onclick = window.epToggleNotes;
      quickTabs.appendChild(btn);
    } else {
      const bar = document.createElement("div");
      bar.id = "ep-moodle-float-tools";
      bar.innerHTML = `
        <a href="https://eperso.ephec.be/" class="ep-float-pill" style="text-decoration:none;">ePerso</a>
        <button type="button" class="ep-float-pill" id="epFloatNotesBtn">Notes</button>
        <button type="button" class="ep-float-pill" id="epFloatSettingsBtn">Paramètres</button>
      `;
      document.body.appendChild(bar);
      document.getElementById("epFloatNotesBtn").onclick = window.epToggleNotes;
      document.getElementById("epFloatSettingsBtn").onclick = () => window.epOpenSettings && window.epOpenSettings();
    }

    renderNotes();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initNotesModule);
  } else {
    initNotesModule();
  }
})();
