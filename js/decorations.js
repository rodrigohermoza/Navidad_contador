// Decoraciones navideñas del fondo. Cada una se prende/apaga en js/config.js.
// Todo se dibuja en SVG y se regenera al cambiar el tamaño de la ventana.
(function () {
  const NS = "http://www.w3.org/2000/svg";
  const cfg = window.DECOR || {};
  const back = document.getElementById("decor-back");  // detrás de la nieve y del contenido
  const front = document.getElementById("decor-front"); // bolas colgantes (por encima, sin tapar la tarjeta)
  const LIGHT_COLORS = ["#ffd27a", "#3fd47f", "#ffffff", "#ff7a88"];

  // Aleatorio con semilla: mismas decoraciones en cada carga
  let seed;
  const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const el = (tag, attrs = {}, parent) => {
    const n = document.createElementNS(NS, tag);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  };
  const svgLayer = (W, H) => el("svg", { viewBox: `0 0 ${W} ${H}`, width: W, height: H });

  // ---------- Copos grandes y destellos (fondo) ----------
  function snowflake(g, x, y, size) {
    const f = el("g", { class: "big-flake", transform: `translate(${x} ${y})` }, g);
    const inner = el("g", {}, f);
    inner.style.animationDuration = `${40 + rand() * 40}s`;
    for (let i = 0; i < 6; i++) {
      const arm = el("g", { transform: `rotate(${i * 60})` }, inner);
      el("line", { x1: 0, y1: 0, x2: 0, y2: -size }, arm);
      el("line", { x1: 0, y1: -size * 0.55, x2: -size * 0.22, y2: -size * 0.75 }, arm);
      el("line", { x1: 0, y1: -size * 0.55, x2: size * 0.22, y2: -size * 0.75 }, arm);
    }
  }

  function sparkle(g, x, y, r) {
    const s = el("path", {
      class: "sparkle",
      d: `M${x} ${y - r} Q${x} ${y} ${x + r} ${y} Q${x} ${y} ${x} ${y + r} Q${x} ${y} ${x - r} ${y} Q${x} ${y} ${x} ${y - r} Z`,
    }, g);
    s.style.animationDelay = `${-rand() * 4}s`;
    s.style.animationDuration = `${2.5 + rand() * 3}s`;
  }

  // ---------- Pino con nieve y lucecitas ----------
  function pine(g, cx, baseY, h, withLights) {
    const w = h * 0.62;
    const t = el("g", { transform: `translate(${cx - w / 2} ${baseY - h}) scale(${w / 100} ${h / 200})` }, g);
    el("rect", { x: 44, y: 168, width: 12, height: 32, fill: "#4a2c1d" }, t);
    el("path", { fill: "#0f4a30", d: "M50 0 L70 42 L60 40 L80 82 L66 79 L88 124 L72 121 L96 168 L4 168 L28 121 L12 124 L34 79 L20 82 L40 40 L30 42 Z" }, t);
    el("path", { fill: "#ffffff", d: "M50 0 L60 21 L53 18 L47 22 L40 21 Z M30 42 L40 40 L46 44 L54 41 L60 40 L70 42 L62 47 L50 44 L38 47 Z M20 82 L34 79 L44 84 L56 80 L66 79 L80 82 L68 88 L52 84 L34 88 Z M12 124 L28 121 L42 127 L58 122 L72 121 L88 124 L72 131 L52 126 L30 131 Z" }, t);
    // Estrella en la punta
    el("path", { fill: "#ffd27a", class: "tree-star", d: "M50 -14 L54 -4 L64 -4 L56 2 L59 12 L50 6 L41 12 L44 2 L36 -4 L46 -4 Z" }, t);
    if (!withLights) return;
    // Lucecitas en guirnalda diagonal por cada piso del árbol
    [[30, 58, 70, 50], [22, 102, 80, 92], [14, 150, 88, 138]].forEach(([x1, y1, x2, y2], row) => {
      for (let i = 0; i <= 4; i++) {
        const k = i / 4;
        const c = el("circle", { cx: x1 + (x2 - x1) * k, cy: y1 + (y2 - y1) * k, r: 4.5, class: "tree-light" }, t);
        c.style.color = LIGHT_COLORS[(i + row) % LIGHT_COLORS.length];
        c.style.animationDelay = `${-((i + row) % 3) * 0.8}s`;
      }
    });
  }

  function gift(g, x, baseY, s, color, ribbon) {
    const b = el("g", { transform: `translate(${x} ${baseY - s})` }, g);
    el("rect", { x: 0, y: s * 0.25, width: s, height: s * 0.75, rx: 2, fill: color }, b);
    el("rect", { x: -s * 0.06, y: s * 0.12, width: s * 1.12, height: s * 0.2, rx: 2, fill: color, opacity: 0.85 }, b);
    el("rect", { x: s * 0.42, y: s * 0.12, width: s * 0.16, height: s * 0.88, fill: ribbon }, b);
    el("ellipse", { cx: s * 0.38, cy: s * 0.08, rx: s * 0.14, ry: s * 0.08, fill: ribbon }, b);
    el("ellipse", { cx: s * 0.62, cy: s * 0.08, rx: s * 0.14, ry: s * 0.08, fill: ribbon }, b);
  }

  // ---------- Colinas nevadas con pinos y regalos (abajo) ----------
  function ground(svg, W, H) {
    const gh = Math.min(Math.max(H * 0.2, 110), 200); // alto de la zona nevada
    const top = H - gh;
    const g = el("g", { class: "ground" }, svg);
    el("path", { fill: "#f3dfe2", d: `M0 ${top + gh * 0.35} C${W * 0.2} ${top + gh * 0.05} ${W * 0.4} ${top + gh * 0.3} ${W * 0.55} ${top + gh * 0.2} C${W * 0.75} ${top + gh * 0.05} ${W * 0.9} ${top + gh * 0.25} ${W} ${top + gh * 0.15} L${W} ${H} L0 ${H} Z` }, g);

    // Pinos a los costados; el centro queda libre para Santa
    const small = W < 600;
    const free = small ? 120 : 170;
    const spots = [];
    const count = Math.round(W / (small ? 70 : 110));
    for (let i = 0; i < count; i++) {
      const x = ((i + 0.5) / count) * W + (rand() - 0.5) * 30;
      if (Math.abs(x - W / 2) < free) continue;
      spots.push(x);
    }
    spots.forEach((x) => {
      const h = (small ? 70 : 100) + rand() * (small ? 40 : 70);
      pine(g, x, top + gh * (0.42 + rand() * 0.12), h, cfg.treeLights);
    });

    el("path", { fill: "#ffffff", d: `M0 ${top + gh * 0.6} C${W * 0.25} ${top + gh * 0.45} ${W * 0.45} ${top + gh * 0.62} ${W * 0.62} ${top + gh * 0.55} C${W * 0.8} ${top + gh * 0.48} ${W * 0.92} ${top + gh * 0.6} ${W} ${top + gh * 0.52} L${W} ${H} L0 ${H} Z` }, g);

    // Regalos sobre la nieve, cerca de los pinos
    if (!cfg.gifts) return;
    const gifts = [["#1f6b45", "#ffd27a"], ["#ffd27a", "#c8102e"], ["#c8102e", "#ffffff"], ["#0f4a30", "#ffd27a"]];
    spots.forEach((x, i) => {
      if (i % 2) return;
      const [c, r] = gifts[i % gifts.length];
      gift(g, x + (rand() < 0.5 ? -1 : 1) * (26 + rand() * 18), top + gh * 0.64, small ? 24 : 32 + rand() * 12, c, r);
    });
  }

  // ---------- Bolas colgantes (arriba, esquivando la tarjeta) ----------
  function ornaments(svg, W) {
    const card = document.querySelector(".card").getBoundingClientRect();
    const COLORS = ["#ffd27a", "#1f6b45", "#ffffff", "#2a8a5a", "#e8e0d0"];
    const step = W < 600 ? 60 : 78;
    for (let x = step * 0.8, i = 0; x < W - step * 0.5; x += step, i++) {
      const r = 9 + rand() * 7;
      let len = 40 + rand() * 90;
      const overCard = x > card.left - r - 8 && x < card.right + r + 8;
      if (overCard) len = Math.min(len, card.top - 2 * r - 14);
      if (len < 26) continue;
      const holder = el("g", { transform: `translate(${x} 0)` }, svg);
      const g = el("g", { class: "ornament" }, holder); // se balancea desde la punta del hilo
      g.style.animationDelay = `${-rand() * 4}s`;
      g.style.animationDuration = `${3.5 + rand() * 2}s`;
      el("line", { x1: 0, y1: 0, x2: 0, y2: len, class: "ornament-string" }, g);
      el("rect", { x: -3.5, y: len - 2, width: 7, height: 6, rx: 1.5, fill: "#c9a24a" }, g);
      el("circle", { cx: 0, cy: len + 4 + r, r, fill: COLORS[i % COLORS.length], class: "ornament-ball" }, g);
      el("ellipse", { cx: -r * 0.35, cy: len + 4 + r * 0.6, rx: r * 0.28, ry: r * 0.18, fill: "#ffffff", opacity: 0.55 }, g);
    }
  }

  function build() {
    seed = 20261225;
    const W = window.innerWidth, H = window.innerHeight;

    const b = svgLayer(W, H);
    if (cfg.bigSnowflakes) {
      const g = el("g", {}, b);
      const n = W < 600 ? 4 : 7;
      for (let i = 0; i < n; i++) snowflake(g, ((i + 0.5) / n) * W + (rand() - 0.5) * 80, H * (0.15 + rand() * 0.6), 30 + rand() * 50);
    }
    if (cfg.stars) {
      const g = el("g", {}, b);
      const n = Math.round((W * H) / 22000);
      for (let i = 0; i < n; i++) sparkle(g, rand() * W, rand() * H * 0.8, 3 + rand() * 5);
    }
    if (cfg.ground) ground(b, W, H);
    back.replaceChildren(b);

    const f = svgLayer(W, H);
    if (cfg.ornaments) ornaments(f, W);
    front.replaceChildren(f);
  }

  let timer;
  window.addEventListener("resize", () => { clearTimeout(timer); timer = setTimeout(build, 120); });
  // Esperar a las fuentes para medir bien la tarjeta antes de colgar las bolas
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(build);
})();
