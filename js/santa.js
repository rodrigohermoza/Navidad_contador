// Santa gordito: al tocarlo se infla, estalla alegremente en confeti y aparece la actividad del día.
// También maneja el selector de Santa (arriba a la derecha); la elección se recuerda en este navegador.
(function () {
  const santa = document.getElementById("big-santa");
  const confetti = document.getElementById("confetti");
  const modal = document.getElementById("modal");
  const eyebrow = document.getElementById("modal-eyebrow");
  const title = document.getElementById("modal-title");
  const text = document.getElementById("modal-text");
  const closeBtn = modal.querySelector(".modal-close");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const COLORS = ["#ffffff", "#ffd27a", "#3fd47f", "#ff8a9a", "#f4f8fd"];
  const SHAPES = ["●", "★", "❄", "✦", "●"];
  let busy = false;

  // ---------- Santa elegido ----------
  const STORE_KEY = "navidad-santa";
  const modalSanta = document.getElementById("modal-santa");
  const themes = Object.keys(window.SANTA_THEMES);
  let current = "clasico";
  try {
    let saved = localStorage.getItem(STORE_KEY);
    if (saved === "campesino") saved = "agricultor"; // nombre antiguo
    if (themes.includes(saved)) current = saved;
  } catch (e) {}

  function render(id, animate) {
    current = id;
    santa.innerHTML = window.santaSVG(id, { prefix: "big", cls: "big-santa-svg santa-anim" });
    modalSanta.innerHTML = window.santaSVG(id, { prefix: "modal", head: true });
    document.getElementById("picker-face").innerHTML = window.santaSVG(id, { prefix: "btn", head: true });
    pickerGrid.querySelectorAll("[data-santa]").forEach((b) => b.setAttribute("aria-pressed", b.dataset.santa === id));
    if (animate && !busy) {
      santa.classList.add("is-back");                  // aparece rebotando
      setTimeout(() => santa.classList.remove("is-back"), 700);
    }
  }

  // ---------- Selector (arriba a la derecha) ----------
  const pickerBtn = document.getElementById("picker-btn");
  const pickerPanel = document.getElementById("picker-panel");
  const pickerGrid = document.getElementById("picker-grid");
  pickerGrid.innerHTML = themes.map((id) => `
    <button class="picker-option" type="button" data-santa="${id}" aria-pressed="false">
      ${window.santaSVG(id, { prefix: "opt", head: true })}<span>${window.SANTA_THEMES[id].name}</span>
    </button>`).join("");

  function togglePicker(show) {
    pickerPanel.hidden = !show;
    pickerBtn.setAttribute("aria-expanded", show);
  }
  pickerBtn.addEventListener("click", (e) => { e.stopPropagation(); togglePicker(pickerPanel.hidden); });
  pickerGrid.addEventListener("click", (e) => {
    const b = e.target.closest("[data-santa]");
    if (!b) return;
    try { localStorage.setItem(STORE_KEY, b.dataset.santa); } catch (err) {}
    render(b.dataset.santa, true);
    togglePicker(false);
  });
  document.addEventListener("click", (e) => { if (!pickerPanel.hidden && !e.target.closest("#santa-picker")) togglePicker(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !pickerPanel.hidden) { togglePicker(false); pickerBtn.focus(); } });

  render(current, false);

  function content() {
    const a = window.todayActivity();
    if (a.text) {
      return { eyebrow: `Día ${a.day} de ${window.ACTIVITIES.length}`, title: "¡Jo, jo, jo!", text: a.text, cta: "¡Vamos!" };
    }
    if (a.status === "before") {
      return { eyebrow: "Todavía no", title: "¡Un poquito de paciencia!", text: "Tu primera actividad llega el 1 de diciembre.", cta: "¡Entendido!" };
    }
    return { eyebrow: "Fin de las actividades", title: "¡Gracias por jugar!", text: "Las actividades de este año terminaron. ¡Nos vemos la próxima Navidad!", cta: "Cerrar" };
  }

  // Lluvia de confeti, estrellas y copos que salen del centro de Santa
  function burst() {
    const n = reduced ? 0 : 46;
    for (let i = 0; i < n; i++) {
      const p = document.createElement("span");
      const angle = Math.random() * Math.PI * 2;
      const dist = 90 + Math.random() * 170;
      p.textContent = SHAPES[i % SHAPES.length];
      p.style.color = COLORS[i % COLORS.length];
      p.style.fontSize = `${10 + Math.random() * 16}px`;
      p.style.setProperty("--dx", `${Math.cos(angle) * dist}px`);
      p.style.setProperty("--dy", `${Math.sin(angle) * dist - 40}px`);
      p.style.setProperty("--rot", `${(Math.random() - 0.5) * 540}deg`);
      p.style.animationDuration = `${0.9 + Math.random() * 0.6}s`;
      confetti.appendChild(p);
    }
    const ring = document.createElement("i");
    ring.className = "ring";
    confetti.appendChild(ring);
    setTimeout(() => confetti.replaceChildren(), 1600);
  }

  function open() {
    if (busy) return;
    busy = true;
    const c = content();
    eyebrow.textContent = c.eyebrow;
    title.textContent = c.title;
    text.textContent = c.text;
    closeBtn.textContent = c.cta;

    santa.classList.add("is-inflating");               // 1) se infla con un bamboleo
    setTimeout(() => {
      santa.classList.replace("is-inflating", "is-popped"); // 2) ¡puf! desaparece
      burst();                                              //    y sale el confeti
    }, reduced ? 0 : 750);
    setTimeout(() => {                                     // 3) aparece la actividad
      modal.hidden = false;
      requestAnimationFrame(() => modal.classList.add("is-open"));
      closeBtn.focus();
    }, reduced ? 0 : 1150);
  }

  function close() {
    modal.classList.remove("is-open");
    setTimeout(() => {
      modal.hidden = true;
      santa.classList.remove("is-popped");
      santa.classList.add("is-back");                  // 4) Santa vuelve rebotando
      setTimeout(() => { santa.classList.remove("is-back"); busy = false; }, 700);
      santa.focus();
    }, 300);
  }

  santa.addEventListener("click", open);
  modal.querySelectorAll("[data-close]").forEach((el) => el.addEventListener("click", close));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !modal.hidden) close(); });
})();
