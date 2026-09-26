// Genera estrellas y filas de pinos dentro del SVG del paisaje.
// Usa un PRNG con semilla para que el paisaje sea igual en cada carga.
(function () {
  const NS = "http://www.w3.org/2000/svg";
  let seed = 20261225;
  const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

  // Estrellas (solo en la parte alta del cielo)
  const stars = document.getElementById("stars");
  for (let i = 0; i < 140; i++) {
    const c = document.createElementNS(NS, "circle");
    c.setAttribute("cx", (rand() * 1600).toFixed(1));
    c.setAttribute("cy", (Math.pow(rand(), 1.6) * 420).toFixed(1));
    c.setAttribute("r", (0.6 + rand() * 1.4).toFixed(2));
    c.setAttribute("fill", "#ffffff");
    c.setAttribute("class", "star");
    c.style.setProperty("--tw", `${3 + rand() * 4}s`);
    c.style.setProperty("--delay", `${-rand() * 6}s`);
    stars.appendChild(c);
  }

  // Fila de pinos sobre una colina: baseY(x) aproxima la curva de la colina
  function treeline(id, { count, baseY, minH, maxH, colors, skip }) {
    const g = document.getElementById(id);
    for (let i = 0; i < count; i++) {
      const x = (i / count) * 1650 - 40 + rand() * 30;
      if (skip && skip(x)) continue;
      const h = minH + rand() * (maxH - minH);
      const u = document.createElementNS(NS, "use");
      u.setAttribute("href", "#pine");
      u.setAttribute("x", (x - h / 4).toFixed(1));
      u.setAttribute("y", (baseY(x) - h + h * 0.04).toFixed(1));
      u.setAttribute("width", (h / 2).toFixed(1));
      u.setAttribute("height", h.toFixed(1));
      u.setAttribute("color", colors[Math.floor(rand() * colors.length)]);
      g.appendChild(u);
    }
  }

  treeline("treeline-far", {
    count: 70,
    baseY: (x) => 668 - 18 * Math.sin((x / 1600) * Math.PI * 3),
    minH: 34, maxH: 60,
    colors: ["#1e4a52", "#23565a", "#1a4049"],
    skip: (x) => x > 1060 && x < 1240, // deja libre la cabaña
  });

  treeline("treeline-near", {
    count: 22,
    baseY: (x) => 752 - 20 * Math.sin((x / 1600) * Math.PI * 2 + 0.6),
    minH: 70, maxH: 120,
    colors: ["#1b5a43", "#217051", "#185039"],
    skip: (x) => (x > 380 && x < 1220) && rand() < 0.75, // centro más despejado
  });

  // En pantallas verticales (móvil) se encuadra la zona de la luna y la cabaña
  const svg = document.querySelector(".landscape");
  const portrait = window.matchMedia("(orientation: portrait)");
  const frame = () => svg.setAttribute("viewBox", portrait.matches ? "780 0 800 900" : "0 0 1600 900");
  portrait.addEventListener("change", frame);
  frame();
})();
