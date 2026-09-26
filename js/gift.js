// Caja de regalo: al hacer clic se abre y Santa entrega la actividad del día.
(function () {
  const gift = document.getElementById("gift");
  const hint = document.getElementById("gift-hint");
  const modal = document.getElementById("modal");
  const eyebrow = document.getElementById("modal-eyebrow");
  const title = document.getElementById("modal-title");
  const text = document.getElementById("modal-text");
  const closeBtn = modal.querySelector(".modal-close");

  function content() {
    const a = window.todayActivity();
    if (a.text) {
      return { eyebrow: `Día ${a.day} de ${window.ACTIVITIES.length}`, title: "¡Jo, jo, jo!", text: a.text, cta: "¡A por ello!" };
    }
    if (a.status === "before") {
      return { eyebrow: "Todavía no", title: "¡Un poco de paciencia!", text: "Tu primer regalo se abre el 1 de diciembre.", cta: "Vale" };
    }
    return { eyebrow: "Fin de las actividades", title: "¡Gracias por jugar!", text: "Las actividades de este año terminaron. ¡Nos vemos la próxima Navidad!", cta: "Cerrar" };
  }

  hint.textContent = window.todayActivity().text ? "Abre tu regalo de hoy" : "Tu regalo";

  function open() {
    if (gift.classList.contains("is-opening")) return;
    const c = content();
    eyebrow.textContent = c.eyebrow;
    title.textContent = c.title;
    text.textContent = c.text;
    closeBtn.textContent = c.cta;
    gift.classList.add("is-opening");
    // Espera a que la tapa salga volando antes de mostrar a Santa
    setTimeout(() => {
      modal.hidden = false;
      requestAnimationFrame(() => modal.classList.add("is-open"));
      closeBtn.focus();
    }, 550);
  }

  function close() {
    modal.classList.remove("is-open");
    setTimeout(() => {
      modal.hidden = true;
      gift.classList.remove("is-opening");
      gift.focus();
    }, 300);
  }

  gift.addEventListener("click", open);
  modal.querySelectorAll("[data-close]").forEach((el) => el.addEventListener("click", close));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !modal.hidden) close(); });

  // Fondo en video: si carga, se oculta el paisaje SVG; si falla o no existe, se queda el SVG.
  const video = document.getElementById("bg-video");
  video.addEventListener("canplay", () => document.body.classList.add("has-video"), { once: true });
  video.querySelector("source").addEventListener("error", () => video.remove());
})();
