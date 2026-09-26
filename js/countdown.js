// Cuenta atrás hasta el 25 de diciembre a las 00:00 (hora local de quien abre la página).
(function () {
  const els = {};
  document.querySelectorAll("[data-unit]").forEach((el) => (els[el.dataset.unit] = el));
  const dateEl = document.getElementById("target-date");
  const merryEl = document.getElementById("merry");
  const pad = (n) => String(n).padStart(2, "0");

  function target(now) {
    const y = now.getFullYear();
    // Durante el 25 de diciembre se muestra "¡Feliz Navidad!"; desde el 26 cuenta al siguiente año.
    const isChristmas = now.getMonth() === 11 && now.getDate() === 25;
    const t = new Date(y, 11, 25);
    if (!isChristmas && now >= t) t.setFullYear(y + 1);
    return { t, isChristmas };
  }

  function render() {
    const now = window.getNow();
    const { t, isChristmas } = target(now);
    merryEl.hidden = !isChristmas;

    let diff = isChristmas ? 0 : Math.max(0, t - now);
    const s = Math.floor(diff / 1000);
    els.days.textContent = Math.floor(s / 86400);
    els.hours.textContent = pad(Math.floor((s % 86400) / 3600));
    els.minutes.textContent = pad(Math.floor((s % 3600) / 60));
    els.seconds.textContent = pad(s % 60);

    dateEl.textContent = t.toLocaleDateString("es", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  }

  render();
  // Alinea el tick al cambio de segundo
  setTimeout(() => { render(); setInterval(render, 1000); }, 1000 - (Date.now() % 1000));
})();
