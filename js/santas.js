// Santas temáticos: una base común (cara, barba, cuerpo) + piezas que cambian por tema
// (gorro, ropa, lentes, manos y accesorios). window.santaSVG(id) devuelve el SVG como texto.
// Para crear un Santa nuevo: añadir una entrada en THEMES (abajo) combinando las piezas.
(function () {
  const SKIN = "#f3c4a2";

  // ---------- Piezas reutilizables ----------
  const hats = {
    classic: (p) => `
      <path d="M80 86 C76 54 98 32 126 30 C154 28 176 42 186 66 C192 80 194 94 192 108 L178 102 C176 90 170 82 162 78 Z" fill="url(#${p}-coat)" />
      <path d="M150 42 C170 52 182 72 186 98 L178 102 C176 86 168 68 150 54 Z" fill="#7e0a1c" opacity="0.35" />
      <circle cx="192" cy="112" r="13" fill="url(#${p}-fur)" /><circle cx="188" cy="108" r="4" fill="#fff" />
      <g fill="url(#${p}-fur)"><rect x="74" y="72" width="92" height="22" rx="11" />
        <circle cx="84" cy="75" r="7.5" /><circle cx="98" cy="72" r="7.5" /><circle cx="112" cy="71" r="7.5" />
        <circle cx="126" cy="71" r="7.5" /><circle cx="140" cy="72" r="7.5" /><circle cx="154" cy="74" r="7.5" /></g>`,

    // Sombrero de paja con cinta roja y acebo
    straw: (p) => `
      <ellipse cx="120" cy="84" rx="74" ry="15" fill="#e2b85c" />
      <ellipse cx="120" cy="82" rx="74" ry="13" fill="#efcd78" />
      <path d="M88 84 C86 52 100 38 120 38 C140 38 154 52 152 84 Z" fill="#efcd78" />
      <path d="M90 66 Q120 60 150 66" stroke="#d8ad52" stroke-width="2" fill="none" />
      <path d="M89 50 Q120 44 151 50" stroke="#d8ad52" stroke-width="2" fill="none" opacity="0.7" />
      <path d="M88 72 Q120 66 152 72 L152 84 Q120 78 88 84 Z" fill="#c8102e" />
      <ellipse cx="142" cy="74" rx="9" ry="4" fill="#1f6b45" transform="rotate(-25 142 74)" />
      <ellipse cx="152" cy="73" rx="9" ry="4" fill="#2a8a5a" transform="rotate(25 152 73)" />
      <circle cx="146" cy="78" r="3" fill="#e01f3d" /><circle cx="151" cy="79" r="3" fill="#e01f3d" />`,

    // Chullo andino: gorro tejido con orejeras, cordones y pompones de colores
    chullo: (p) => `
      <defs><clipPath id="${p}-dome"><path d="M78 92 C78 54 98 34 120 34 C142 34 162 54 162 92 Z" /></clipPath></defs>
      ${[[-1, 80], [1, 160]].map(([s, x]) => `
        <path d="M${x - 8 * s} 84 L${x - 6 * s} 132 Q${x + 4 * s} 144 ${x + 14 * s} 132 L${x + 18 * s} 90 Z" fill="#c8102e" />
        <path d="M${x - 6 * s} 104 L${x} 112 L${x + 6 * s} 104 L${x + 12 * s} 112 L${x + 16 * s} 106" stroke="#fff" stroke-width="2.5" fill="none" />
        <path d="M${x - 6 * s} 120 L${x + 15 * s} 120" stroke="#f2c14e" stroke-width="4" />
        <path d="M${x + 4 * s} 140 Q${x + 2 * s} 160 ${x + 6 * s} 178" stroke="#f2c14e" stroke-width="3" fill="none" />
        <circle cx="${x + 6 * s}" cy="182" r="7" fill="#2a8a5a" /><circle cx="${x + 4 * s}" cy="180" r="2.5" fill="#fff" opacity="0.5" />`).join("")}
      <path d="M78 92 C78 54 98 34 120 34 C142 34 162 54 162 92 Z" fill="#c8102e" />
      <g clip-path="url(#${p}-dome)">
        <rect x="70" y="80" width="100" height="14" fill="#1f6b45" />
        <path d="M72 87 l6 -5 l6 5 l6 -5 l6 5 l6 -5 l6 5 l6 -5 l6 5 l6 -5 l6 5 l6 -5 l6 5 l6 -5 l6 5 l6 -5" stroke="#fff" stroke-width="2.5" fill="none" />
        <rect x="70" y="66" width="100" height="10" fill="#f2c14e" />
        ${[84, 98, 112, 126, 140, 154].map((x) => `<path d="M${x} 66 l5 5 l-5 5 l-5 -5 Z" fill="#c8102e" />`).join("")}
        <rect x="70" y="52" width="100" height="8" fill="#ffffff" />
        ${[82, 94, 106, 118, 130, 142, 154].map((x) => `<circle cx="${x}" cy="56" r="2.2" fill="#2a8a5a" />`).join("")}
      </g>
      <circle cx="120" cy="32" r="9" fill="#f2c14e" /><circle cx="117" cy="29" r="3" fill="#fff" opacity="0.5" />`,
  };

  const eyes = {
    open: () => `
      <ellipse cx="106" cy="108" rx="4.6" ry="5.8" fill="#2b1d16" /><ellipse cx="134" cy="108" rx="4.6" ry="5.8" fill="#2b1d16" />
      <circle cx="107.6" cy="105.8" r="1.7" fill="#fff" /><circle cx="135.6" cy="105.8" r="1.7" fill="#fff" />`,
    // Lentes oscuros rectangulares (rockero)
    shades: () => `
      <rect x="92" y="99" width="26" height="16" rx="5" fill="#141418" />
      <rect x="122" y="99" width="26" height="16" rx="5" fill="#141418" />
      <path d="M118 104 L122 104" stroke="#141418" stroke-width="3" />
      <path d="M96 103 L104 103 M126 103 L134 103" stroke="#ffffff" stroke-width="2" opacity="0.55" stroke-linecap="round" />`,
    // Lentes de sol redondos de colores (veraniego)
    round: (p) => `
      <defs><linearGradient id="${p}-lens" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff9a3c" /><stop offset="1" stop-color="#ff4f7b" /></linearGradient></defs>
      <circle cx="105" cy="108" r="11" fill="url(#${p}-lens)" stroke="#2b1d16" stroke-width="2.5" />
      <circle cx="135" cy="108" r="11" fill="url(#${p}-lens)" stroke="#2b1d16" stroke-width="2.5" />
      <path d="M116 106 Q120 102 124 106" stroke="#2b1d16" stroke-width="2.5" fill="none" />
      <path d="M99 103 Q102 100 106 100 M129 103 Q132 100 136 100" stroke="#fff" stroke-width="2" opacity="0.7" fill="none" stroke-linecap="round" />`,
  };

  // Manos: en alto (izquierda) y apoyada (derecha)
  const raisedHand = {
    mitten: (p, t) => `<ellipse cx="40" cy="100" rx="16" ry="9" fill="url(#${p}-fur)" transform="rotate(-8 40 100)" />
      <circle cx="39" cy="83" r="14" fill="url(#${p}-mitten)" /><ellipse cx="53" cy="88" rx="6" ry="7" fill="${t.mitten[1]}" />`,
    // Mano rockera con los cuernos 🤘
    rock: () => `<rect x="28" y="56" width="8" height="24" rx="4" fill="${SKIN}" /><rect x="45" y="60" width="7" height="20" rx="3.5" fill="${SKIN}" />
      <circle cx="40" cy="86" r="12" fill="${SKIN}" /><ellipse cx="45" cy="92" rx="8" ry="4" fill="#e8b08c" />`,
    // Coco con sorbete y sombrillita
    coconut: () => `<circle cx="40" cy="68" r="15" fill="#6b4226" /><ellipse cx="40" cy="58" rx="11" ry="4" fill="#f4ead8" />
      <path d="M44 58 L54 34" stroke="#ff6f91" stroke-width="3" stroke-linecap="round" />
      <path d="M28 52 L32 36" stroke="#8a6a4a" stroke-width="1.5" /><path d="M20 38 Q32 26 44 38 Z" fill="#2ab0a6" /><path d="M26 38 Q32 30 38 38" fill="#f2c14e" />
      <circle cx="40" cy="86" r="11" fill="${SKIN}" />`,
    // Taza de chocolatada humeante
    mug: (p, t) => `<g class="steam" stroke="#ffffff" stroke-width="2.5" fill="none" stroke-linecap="round" opacity="0.8">
        <path d="M32 50 q-5 -7 0 -14 q5 -7 0 -14" /><path d="M44 50 q-5 -7 0 -14 q5 -7 0 -14" /></g>
      <rect x="24" y="54" width="30" height="28" rx="5" fill="#ffffff" /><rect x="24" y="64" width="30" height="7" fill="#c8102e" />
      <path d="M54 60 q10 0 10 9 q0 9 -10 9" stroke="#ffffff" stroke-width="4" fill="none" />
      <ellipse cx="39" cy="56" rx="13" ry="3" fill="#6b3a1f" />
      <circle cx="30" cy="84" r="12" fill="url(#${p}-mitten)" />`,
  };
  const restHand = {
    mitten: (p) => `<circle cx="157" cy="217" r="14" fill="url(#${p}-mitten)" />`,
    skin: () => `<circle cx="157" cy="217" r="12" fill="${SKIN}" />`,
  };

  // ---------- Temas ----------
  const THEMES = {
    clasico: {
      name: "Clásico",
      coat: ["#f0455a", "#d4132f", "#980b21"], mitten: ["#2f9a63", "#15503a"],
      sleeve: "coat", cuffs: true, frontStrip: "fur", bottom: "fur", belt: "classic",
      feet: "boots", hat: "classic", eyes: "open", raised: "mitten", rest: "mitten",
    },
    rockero: {
      name: "Rockero",
      coat: ["#4a4a56", "#26262e", "#111114"], mitten: ["#2f9a63", "#15503a"],
      sleeve: "coat", cuffs: false, frontStrip: "tee", bottom: "hem", belt: "studs",
      feet: "boots", hat: "classic", eyes: "shades", raised: "rock", rest: "skin", prop: "guitar",
    },
    veraniego: {
      name: "Veraniego",
      coat: ["#f0455a", "#d4132f", "#a50d26"], mitten: ["#2f9a63", "#15503a"],
      sleeve: "short", cuffs: false, frontStrip: "buttons", bottom: "shorts", belt: null, pattern: "hibiscus",
      feet: "sandals", hat: "straw", eyes: "round", raised: "coconut", rest: "skin", back: "surfboard",
    },
    andino: {
      name: "Andino (chullo)",
      coat: ["#e5404f", "#c8102e", "#8f0b20"], mitten: ["#f2c14e", "#c99a2e"],
      sleeve: "coat", cuffs: false, frontStrip: null, bottom: "poncho", belt: null, pattern: "poncho",
      feet: "boots", hat: "chullo", eyes: "open", raised: "mug", rest: "mitten",
    },
  };

  function santaSVG(id) {
    const t = THEMES[id] || THEMES.clasico;
    const p = `s-${id}`; // prefijo para que los ids no choquen si hay varios Santas en la página
    const sleeve = `url(#${p}-coat)`;
    const arm = (d, which) => t.sleeve === "short"
      ? `<path d="${d}" stroke="${SKIN}" stroke-width="26" stroke-linecap="round" fill="none" />` +
        (which === "left" ? `<path d="M62 168 C52 160 46 150 43 140" stroke="${sleeve}" stroke-width="32" stroke-linecap="round" fill="none" />`
                          : `<path d="M186 160 C194 172 196 182 196 190" stroke="${sleeve}" stroke-width="32" stroke-linecap="round" fill="none" />`)
      : `<path d="${d}" stroke="${sleeve}" stroke-width="30" stroke-linecap="round" fill="none" />`;

    const defs = `<defs>
      <radialGradient id="${p}-coat" cx="0.38" cy="0.3" r="0.8"><stop offset="0" stop-color="${t.coat[0]}" /><stop offset="0.55" stop-color="${t.coat[1]}" /><stop offset="1" stop-color="${t.coat[2]}" /></radialGradient>
      <radialGradient id="${p}-face" cx="0.45" cy="0.4" r="0.7"><stop offset="0" stop-color="#fde0c8" /><stop offset="1" stop-color="#efb994" /></radialGradient>
      <linearGradient id="${p}-fur" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff" /><stop offset="1" stop-color="#e3e9f1" /></linearGradient>
      <radialGradient id="${p}-mitten" cx="0.35" cy="0.35" r="0.7"><stop offset="0" stop-color="${t.mitten[0]}" /><stop offset="1" stop-color="${t.mitten[1]}" /></radialGradient>
      <clipPath id="${p}-body"><ellipse cx="120" cy="198" rx="80" ry="70" /></clipPath>
      <pattern id="${p}-hib" width="46" height="46" patternUnits="userSpaceOnUse">
        <g transform="translate(23 23)"><ellipse cx="-9" cy="9" rx="8" ry="3.5" fill="#1f6b45" transform="rotate(35 -9 9)" />
        ${[0, 72, 144, 216, 288].map((a) => `<ellipse cx="0" cy="-6" rx="4.5" ry="7" fill="#ffffff" transform="rotate(${a})" />`).join("")}
        <circle r="3" fill="#f2c14e" /></g>
        <circle cx="2" cy="4" r="2.5" fill="#ffd27a" opacity="0.8" />
      </pattern>
    </defs>`;

    // Pies
    const feet = t.feet === "sandals"
      ? `<ellipse cx="90" cy="270" rx="22" ry="9" fill="${SKIN}" /><ellipse cx="150" cy="270" rx="22" ry="9" fill="${SKIN}" />
         <path d="M80 270 Q90 260 100 270 M140 270 Q150 260 160 270" stroke="#2a8a5a" stroke-width="4" fill="none" />`
      : `<ellipse cx="90" cy="268" rx="25" ry="11" fill="${t.hat === "chullo" ? "#4a2c1d" : "#26262b"}" />
         <ellipse cx="150" cy="268" rx="25" ry="11" fill="${t.hat === "chullo" ? "#4a2c1d" : "#26262b"}" />
         <ellipse cx="84" cy="264" rx="8" ry="3" fill="#fff" opacity="0.18" />`;

    // Detrás del cuerpo
    const back = t.back === "surfboard"
      ? `<g transform="rotate(14 200 160)"><ellipse cx="200" cy="160" rx="20" ry="88" fill="#ffffff" />
         <rect x="196" y="74" width="8" height="172" fill="#c8102e" /><rect x="189" y="74" width="3" height="172" fill="#2a8a5a" /><rect x="208" y="74" width="3" height="172" fill="#2a8a5a" /></g>` : "";

    // Dentro del cuerpo (recortado a su forma)
    let inside = "";
    if (t.pattern === "hibiscus") inside += `<rect x="30" y="120" width="180" height="160" fill="url(#${p}-hib)" opacity="0.95" />`;
    if (t.pattern === "poncho") {
      inside += `<rect x="30" y="152" width="180" height="8" fill="#f2c14e" />
        <rect x="30" y="160" width="180" height="16" fill="#ffffff" />
        ${Array.from({ length: 12 }, (_, i) => `<path d="M${36 + i * 15} 168 l6 -6 l6 6 l-6 6 Z" fill="#1f6b45" />`).join("")}
        <rect x="30" y="176" width="180" height="8" fill="#f2c14e" />
        <rect x="30" y="222" width="180" height="10" fill="#1f6b45" />
        ${Array.from({ length: 18 }, (_, i) => `<path d="M${30 + i * 10} 232 l5 8 l5 -8 Z" fill="#f2c14e" />`).join("")}`;
    }
    if (t.frontStrip === "fur") inside += `<rect x="107" y="120" width="26" height="160" fill="url(#${p}-fur)" />`;
    if (t.frontStrip === "tee") inside += `<rect x="104" y="120" width="32" height="160" fill="#c8102e" />
        <rect x="100" y="130" width="3" height="140" fill="#b8bcc6" /><rect x="137" y="130" width="3" height="140" fill="#b8bcc6" />`;
    if (t.frontStrip === "buttons") inside += [205, 228].map((y) => `<circle cx="120" cy="${y}" r="3" fill="#ffffff" />`).join("");
    if (t.bottom === "fur") inside += `<g fill="url(#${p}-fur)"><rect x="30" y="248" width="180" height="40" />
        ${[40, 54, 68, 82, 96, 144, 158, 172, 186, 200].map((x) => `<circle cx="${x}" cy="${x < 120 ? 248 - Math.min(4, (x - 30) / 14) : 248 - Math.min(4, (210 - x) / 14)}" r="8" />`).join("")}</g>`;
    if (t.bottom === "hem") inside += `<rect x="30" y="250" width="180" height="40" fill="#0b0b0e" />`;
    if (t.bottom === "shorts") inside += `<rect x="30" y="238" width="180" height="50" fill="#2a78b8" /><rect x="30" y="238" width="180" height="4" fill="#ffffff" opacity="0.6" />`;
    if (t.belt) inside += `<rect x="30" y="198" width="180" height="22" fill="#1f1f24" /><rect x="30" y="200" width="180" height="3" fill="#fff" opacity="0.12" />` +
      (t.belt === "studs" ? Array.from({ length: 15 }, (_, i) => `<circle cx="${38 + i * 12}" cy="209" r="2.6" fill="#d7dbe3" />`).join("") : "");

    const buckle = t.belt ? `<rect x="103" y="193" width="34" height="32" rx="6" fill="none" stroke="${t.belt === "studs" ? "#c9ced8" : "#f2c14e"}" stroke-width="6" />
      <rect x="106" y="196" width="10" height="3" rx="1.5" fill="#fff3c4" opacity="0.8" />` : "";

    // Guitarra eléctrica (delante del cuerpo, detrás de la mano)
    const guitar = t.prop === "guitar" ? `<g>
      <path d="M150 230 L60 146" stroke="#7a4a2b" stroke-width="10" stroke-linecap="round" />
      ${[0.2, 0.35, 0.5, 0.65, 0.8].map((k) => `<path d="M${150 - 90 * k - 4} ${230 - 84 * k + 4} l8 -8" stroke="#e8d9b0" stroke-width="1.5" />`).join("")}
      <path d="M64 150 L50 134 L42 142 L56 158 Z" fill="#141418" />
      <circle cx="47" cy="139" r="2" fill="#d7dbe3" /><circle cx="53" cy="146" r="2" fill="#d7dbe3" />
      <path d="M172 214 C190 206 200 222 190 236 C206 248 196 276 172 270 C156 282 128 272 132 252 C120 238 136 216 152 226 C156 214 166 212 172 214 Z" fill="#f2c14e" />
      <path d="M150 236 C160 230 174 236 172 250 C170 262 152 266 146 256 C140 248 142 240 150 236 Z" fill="#ffffff" opacity="0.9" />
      <rect x="150" y="242" width="16" height="5" rx="1.5" fill="#26262b" transform="rotate(-43 158 244)" />
      <rect x="158" y="252" width="16" height="5" rx="1.5" fill="#26262b" transform="rotate(-43 166 254)" />
      <circle cx="182" cy="258" r="3" fill="#26262b" /><circle cx="186" cy="248" r="3" fill="#26262b" />
      <path d="M170 262 L62 148 M174 258 L66 144" stroke="#f4f0e6" stroke-width="0.9" opacity="0.85" /></g>` : "";

    const beard = (fill, dy) => `<g fill="${fill}" transform="translate(0 ${dy})">
      <circle cx="87" cy="133" r="14" /><circle cx="90" cy="148" r="15.5" /><circle cx="101" cy="160" r="16.5" />
      <circle cx="120" cy="166" r="18" /><circle cx="139" cy="160" r="16.5" /><circle cx="150" cy="148" r="15.5" /><circle cx="153" cy="133" r="14" />
      ${dy ? "" : `<ellipse cx="120" cy="147" rx="34" ry="18" />`}</g>`;
    const mustache = (fill, dy) => `<g fill="${fill}" transform="translate(0 ${dy})">
      <path d="M120 133 C112 125 97 125 90 132 C86 138 91 143 98 141 C105 139 112 140 120 137 Z" />
      <path d="M120 133 C128 125 143 125 150 132 C154 138 149 143 142 141 C135 139 128 140 120 137 Z" /></g>`;

    return `<svg class="santa-svg santa--${id}" viewBox="0 0 240 285" role="img" aria-label="Santa ${t.name}">
      ${defs}
      <ellipse cx="120" cy="278" rx="84" ry="7" fill="rgba(40,0,8,0.28)" />
      ${back}
      ${feet}
      <g class="arm arm--left">${arm("M62 168 C40 150 32 122 40 98", "left")}${raisedHand[t.raised](p, t)}</g>
      <g class="belly">
        <ellipse cx="120" cy="198" rx="80" ry="70" fill="url(#${p}-coat)" />
        <g clip-path="url(#${p}-body)">${inside}</g>
        <ellipse cx="90" cy="168" rx="26" ry="15" fill="#fff" opacity="0.13" transform="rotate(-20 90 168)" />
        ${buckle}
      </g>
      ${guitar}
      <g class="arm arm--right">${arm("M186 160 C204 184 196 208 168 216", "right")}
        ${t.cuffs ? `<ellipse cx="172" cy="214" rx="9" ry="15" fill="url(#${p}-fur)" transform="rotate(-70 172 214)" />` : ""}
        ${restHand[t.rest](p, t)}</g>
      <g class="head">
        <g fill="#ffffff"><circle cx="80" cy="110" r="14" /><circle cx="75" cy="126" r="13" /><circle cx="81" cy="140" r="12" />
          <circle cx="160" cy="110" r="14" /><circle cx="165" cy="126" r="13" /><circle cx="159" cy="140" r="12" /></g>
        <circle cx="120" cy="112" r="42" fill="url(#${p}-face)" />
        <ellipse cx="95" cy="124" rx="10" ry="7" fill="#f2797f" opacity="0.45" />
        <ellipse cx="145" cy="124" rx="10" ry="7" fill="#f2797f" opacity="0.45" />
        <ellipse cx="104" cy="95" rx="10" ry="4.5" fill="#fff" transform="rotate(-10 104 95)" />
        <ellipse cx="136" cy="95" rx="10" ry="4.5" fill="#fff" transform="rotate(10 136 95)" />
        ${eyes[t.eyes](p)}
        ${beard("#d9e0ea", 3)}${beard("#ffffff", 0)}
        <path d="M109 142 Q120 156 131 142 Z" fill="#8a2430" /><ellipse cx="120" cy="148" rx="5" ry="2.6" fill="#ec6f80" />
        ${mustache("#d9e0ea", 2)}${mustache("#ffffff", 0)}
        <circle cx="120" cy="126" r="9" fill="#ec9580" /><circle cx="117" cy="123" r="3" fill="#fff" opacity="0.55" />
        ${hats[t.hat](p)}
      </g>
    </svg>`;
  }

  window.SANTA_THEMES = THEMES;
  window.santaSVG = santaSVG;
})();
