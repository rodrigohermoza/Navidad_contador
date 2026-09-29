// Renos volando: cada cierto tiempo una fila de renos cruza el cielo.
// El primero es Rudolph, con la nariz roja brillante. Configuración en js/config.js.
(function () {
  const cfg = (window.DECOR && window.DECOR.reindeer) || {};
  if (!cfg.enabled) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const layer = document.getElementById("reindeer");

  // Un reno mirando a la derecha (viewBox 120x80). `rudolph` = nariz roja.
  function deer(rudolph) {
    const nose = rudolph
      ? '<circle cx="108" cy="22" r="5.5" class="rudolph-nose" />'
      : '<circle cx="106" cy="22" r="3" fill="#2b1a10" />';
    return `
      <g class="deer-legs" stroke="#7a4a2b" stroke-width="4.5" stroke-linecap="round">
        <line x1="74" y1="48" x2="92" y2="55" /><line x1="70" y1="50" x2="86" y2="63" />
        <line x1="38" y1="48" x2="18" y2="53" /><line x1="42" y1="50" x2="24" y2="63" />
      </g>
      <ellipse cx="24" cy="36" rx="6" ry="4" fill="#f1e4d4" />
      <ellipse cx="55" cy="42" rx="31" ry="13" fill="#8b5a3c" />
      <ellipse cx="58" cy="49" rx="18" ry="5" fill="#c49a6c" />
      <path d="M74 34 L89 17 L99 23 L84 43 Z" fill="#8b5a3c" />
      <ellipse cx="97" cy="20" rx="11" ry="7.5" fill="#8b5a3c" />
      <ellipse cx="88" cy="13" rx="4" ry="2.5" fill="#6b4226" transform="rotate(-30 88 13)" />
      <path d="M91 13 L86 1 M88 6 L81 3 M95 12 L98 0 M96.5 5 L103 2" stroke="#5a371f" stroke-width="2.5" fill="none" stroke-linecap="round" />
      <circle cx="98" cy="18" r="1.5" fill="#1a0f08" />
      ${nose}
      <rect x="60" y="29" width="7" height="26" rx="2" fill="#c8102e" />
      <circle cx="63.5" cy="57" r="3.5" fill="#ffd27a" />`;
  }

  function fly() {
    const W = window.innerWidth, H = window.innerHeight;
    const n = cfg.count || 4;
    const size = W < 600 ? 62 : 92;             // ancho de cada reno en px
    const gap = size * 1.12;
    const teamW = gap * (n - 1) + size;
    const leftToRight = Math.random() < 0.6;
    const y = H * (0.12 + Math.random() * 0.4);  // altura del vuelo

    const team = document.createElement("div");
    team.className = "deer-team";
    team.style.top = `${y}px`;
    team.style.width = `${teamW}px`;
    team.style.height = `${size * 0.67}px`;

    // Riendas doradas que unen a los renos
    let html = `<svg class="reins" viewBox="0 0 ${teamW} ${size * 0.67}" width="${teamW}" height="${size * 0.67}">` +
      `<path d="M${size * 0.5} ${size * 0.33} L${teamW - size * 0.45} ${size * 0.33}" /></svg>`;
    for (let i = 0; i < n; i++) {
      const lead = i === n - 1; // el de más adelante
      html += `<svg class="deer" viewBox="0 0 120 80" width="${size}" style="left:${i * gap}px;animation-delay:${-i * 0.18}s">${deer(lead)}</svg>`;
    }
    team.innerHTML = html;
    if (!leftToRight) team.style.transform = "scaleX(-1)"; // mirar hacia la izquierda
    layer.appendChild(team);

    const from = leftToRight ? -teamW - 20 : W + 20;
    const to = leftToRight ? W + 20 : -teamW - 20;
    const rise = (Math.random() - 0.5) * H * 0.15; // suben o bajan un poco mientras cruzan
    const flip = leftToRight ? "" : " scaleX(-1)";
    const anim = team.animate([
      { transform: `translate(${from}px, 0)${flip}` },
      { transform: `translate(${(from + to) / 2}px, ${-H * 0.04 + rise / 2}px)${flip}` },
      { transform: `translate(${to}px, ${rise}px)${flip}` },
    ], { duration: (W + teamW) * (W < 600 ? 14 : 8), easing: "linear" });
    anim.onfinish = () => team.remove();
  }

  function schedule(delay) {
    setTimeout(() => {
      if (!document.hidden) fly();
      const [a, b] = cfg.everySeconds || [18, 35];
      schedule(a + Math.random() * (b - a));
    }, delay * 1000);
  }
  schedule(cfg.firstAfter ?? 4);
})();
