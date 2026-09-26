// Guirnalda de luces navideñas colgando del borde superior.
// Se regenera al cambiar el ancho de la ventana para cubrir siempre todo el borde.
(function () {
  const NS = "http://www.w3.org/2000/svg";
  const host = document.getElementById("lights");
  const COLORS = ["#ff3b4e", "#3fd47f", "#ffd27a", "#f4f8fd"];
  const TOP = 4, SAG = 24, H = 64;

  function build() {
    const W = window.innerWidth;
    const n = Math.max(3, Math.round(W / (W < 600 ? 90 : 130)));
    const span = W / n;
    const svg = document.createElementNS(NS, "svg");
    svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
    svg.setAttribute("width", W);
    svg.setAttribute("height", H);

    let d = `M0 ${TOP}`;
    const bulbs = [];
    for (let i = 0; i < n; i++) {
      const x0 = i * span, cx = x0 + span / 2, cy = TOP + SAG * 2;
      d += ` Q${cx} ${cy} ${x0 + span} ${TOP}`;
      // 3 bombillas por tramo, siguiendo la curva del cable
      [0.25, 0.5, 0.75].forEach((t) => {
        const x = x0 + span * t;
        const y = (1 - t) ** 2 * TOP + 2 * (1 - t) * t * cy + t ** 2 * TOP;
        const tilt = (t - 0.5) * -40; // cuelgan un poco hacia el centro del tramo
        bulbs.push({ x, y, tilt });
      });
    }

    const wire = document.createElementNS(NS, "path");
    wire.setAttribute("d", d);
    wire.setAttribute("class", "wire");
    svg.appendChild(wire);

    bulbs.forEach((b, i) => {
      const g = document.createElementNS(NS, "g");
      g.setAttribute("transform", `translate(${b.x.toFixed(1)} ${b.y.toFixed(1)}) rotate(${b.tilt})`);
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
