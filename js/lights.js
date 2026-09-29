// Guirnalda de luces navideñas: cruza el borde superior y baja un poco por los costados.
// Se regenera al cambiar el tamaño de la ventana para cubrir siempre los bordes.
(function () {
  const NS = "http://www.w3.org/2000/svg";
  const host = document.getElementById("lights");
  const COLORS = ["#ffd27a", "#3fd47f", "#ffffff", "#ff7a88"]; // tonos que resaltan sobre el fondo rojo
  const EDGE = 4; // distancia del cable al borde

  function build() {
    const W = window.innerWidth, H = window.innerHeight;
    const small = W < 600;
    const sideLen = Math.min(H * 0.38, 340); // cuánto baja por los costados
    const topSpan = small ? 90 : 130, sideSpan = small ? 80 : 110;
    const topSag = 24, sideSag = small ? 8 : 18;

    // Tramos: [inicio, fin, normal hacia dentro, comba]
    const segs = [];
    const split = (a, b, len, span, normal, sag) => {
      const n = Math.max(1, Math.round(len / span));
      for (let i = 0; i < n; i++) {
        const t0 = i / n, t1 = (i + 1) / n;
        segs.push([[a[0] + (b[0] - a[0]) * t0, a[1] + (b[1] - a[1]) * t0],
                   [a[0] + (b[0] - a[0]) * t1, a[1] + (b[1] - a[1]) * t1], normal, sag]);
      }
    };
    split([EDGE, sideLen], [EDGE, EDGE], sideLen, sideSpan, [1, 0], sideSag);            // izquierda (sube)
    split([EDGE, EDGE], [W - EDGE, EDGE], W, topSpan, [0, 1], topSag);                    // arriba
    split([W - EDGE, EDGE], [W - EDGE, sideLen], sideLen, sideSpan, [-1, 0], sideSag);    // derecha (baja)

    const svg = document.createElementNS(NS, "svg");
    svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
    svg.setAttribute("width", W);
    svg.setAttribute("height", H);

    let d = `M${segs[0][0][0]} ${segs[0][0][1]}`;
    const bulbs = [];
    segs.forEach(([p0, p1, [nx, ny], sag]) => {
      const c = [(p0[0] + p1[0]) / 2 + nx * sag * 2, (p0[1] + p1[1]) / 2 + ny * sag * 2];
      d += ` Q${c[0]} ${c[1]} ${p1[0]} ${p1[1]}`;
      const base = (Math.atan2(ny, nx) * 180) / Math.PI - 90; // la bombilla apunta hacia dentro
      [0.25, 0.5, 0.75].forEach((t) => {
        const x = (1 - t) ** 2 * p0[0] + 2 * (1 - t) * t * c[0] + t ** 2 * p1[0];
        const y = (1 - t) ** 2 * p0[1] + 2 * (1 - t) * t * c[1] + t ** 2 * p1[1];
        bulbs.push({ x, y, rot: base + (t - 0.5) * -40 });
      });
    });

    const wire = document.createElementNS(NS, "path");
    wire.setAttribute("d", d);
    wire.setAttribute("class", "wire");
    svg.appendChild(wire);

    bulbs.forEach((b, i) => {
      const g = document.createElementNS(NS, "g");
      g.setAttribute("transform", `translate(${b.x.toFixed(1)} ${b.y.toFixed(1)}) rotate(${b.rot.toFixed(1)})`);
      g.setAttribute("class", `bulb b${i % 3}`);
      g.style.color = COLORS[i % COLORS.length];
      g.innerHTML = '<rect x="-3" y="-1" width="6" height="6" rx="1" class="cap" />' +
                    '<ellipse cx="0" cy="12" rx="5" ry="8" class="glass" />';
      svg.appendChild(g);
    });

    host.replaceChildren(svg);
  }

  let timer;
  window.addEventListener("resize", () => { clearTimeout(timer); timer = setTimeout(build, 120); });
  build();
})();
