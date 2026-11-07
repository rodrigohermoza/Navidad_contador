// Santas temáticos: una base común (cara, barba, cuerpo) + piezas que cambian por tema.
// window.santaSVG(id, opciones) devuelve el SVG como texto; window.SANTA_THEMES lista los temas.
// Opciones: { prefix } ids únicos si el mismo Santa aparece dos veces; { cls } clase extra del <svg>;
// { head: true } solo cabeza y hombros (para la tarjeta y el selector).
// Para crear un Santa nuevo: añadir una entrada en THEMES (abajo) combinando las piezas,
// o crear una pieza nueva en el grupo que corresponda (HATS, EYES, RAISED, REST_PROPS, PROPS, BACKS, FEET).
(function () {
  const SKIN = "#f3c4a2";
  const SKIN_DARK = "#e8b08c";

  // ---------- Gorros (se dibujan encima de la cabeza) ----------
  const furBrim = (p) => `<g fill="url(#${p}-fur)"><rect x="74" y="72" width="92" height="22" rx="11" />
      <circle cx="84" cy="75" r="7.5" /><circle cx="98" cy="72" r="7.5" /><circle cx="112" cy="71" r="7.5" />
      <circle cx="126" cy="71" r="7.5" /><circle cx="140" cy="72" r="7.5" /><circle cx="154" cy="74" r="7.5" /></g>`;
  const star = (cx, cy, r, fill) => {
    const pts = Array.from({ length: 10 }, (_, i) => {
      const a = (Math.PI / 5) * i - Math.PI / 2, rr = i % 2 ? r * 0.45 : r;
      return `${(cx + Math.cos(a) * rr).toFixed(1)},${(cy + Math.sin(a) * rr).toFixed(1)}`;
    }).join(" ");
    return `<polygon points="${pts}" fill="${fill}" />`;
  };

  const HATS = {
    classic: (p) => `
      <path d="M80 86 C76 54 98 32 126 30 C154 28 176 42 186 66 C192 80 194 94 192 108 L178 102 C176 90 170 82 162 78 Z" fill="url(#${p}-hat)" />
      <path d="M150 42 C170 52 182 72 186 98 L178 102 C176 86 168 68 150 54 Z" fill="#000" opacity="0.18" />
      <circle cx="192" cy="112" r="13" fill="url(#${p}-fur)" /><circle cx="188" cy="108" r="4" fill="#fff" />
      ${furBrim(p)}`,

    // Sombrero de paja con cinta roja y acebo
    straw: () => `
      <ellipse cx="120" cy="84" rx="74" ry="15" fill="#e2b85c" /><ellipse cx="120" cy="82" rx="74" ry="13" fill="#efcd78" />
      <path d="M88 84 C86 52 100 38 120 38 C140 38 154 52 152 84 Z" fill="#efcd78" />
      <path d="M90 66 Q120 60 150 66 M89 50 Q120 44 151 50" stroke="#d8ad52" stroke-width="2" fill="none" />
      <path d="M88 72 Q120 66 152 72 L152 84 Q120 78 88 84 Z" fill="#c8102e" />
      <ellipse cx="142" cy="74" rx="9" ry="4" fill="#1f6b45" transform="rotate(-25 142 74)" />
      <ellipse cx="152" cy="73" rx="9" ry="4" fill="#2a8a5a" transform="rotate(25 152 73)" />
      <circle cx="146" cy="78" r="3" fill="#e01f3d" /><circle cx="151" cy="79" r="3" fill="#e01f3d" />`,

    // Chullo andino: gorro tejido con orejeras, cordones y pompones
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

    // Sombrero de mago morado con estrellas, luna y borde de peluche
    wizard: (p) => `
      <defs><linearGradient id="${p}-wiz" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7b55c4" /><stop offset="1" stop-color="#3d2470" /></linearGradient></defs>
      <path d="M80 86 C92 60 104 34 112 14 C116 4 124 0 134 4 C142 8 146 2 150 -2 C150 8 144 16 134 14 C130 30 144 58 162 86 Z" fill="url(#${p}-wiz)" />
      ${star(112, 58, 7, "#f2c14e")}${star(136, 40, 5, "#ffe6a8")}${star(126, 70, 4, "#ffe6a8")}
      <path d="M100 38 a8 8 0 1 0 6 12 a6 6 0 1 1 -6 -12 Z" fill="#ffe6a8" />
      <circle cx="152" cy="-4" r="7" fill="#f2c14e" />
      ${furBrim(p)}`,

    // Gorro de dormir largo a rayas que cae sobre el hombro
    nightcap: (p) => `
      <defs><pattern id="${p}-stripes" width="18" height="18" patternUnits="userSpaceOnUse" patternTransform="rotate(40)">
        <rect width="18" height="18" fill="#c8102e" /><rect width="7" height="18" fill="#ffffff" /></pattern></defs>
      <path d="M80 86 C76 54 98 32 126 30 C160 28 186 50 196 86 C204 116 206 148 200 176 L188 172 C190 140 184 108 170 86 Z" fill="url(#${p}-stripes)" />
      <path d="M170 86 C184 108 190 140 188 172 L200 176 C206 148 204 116 196 86 Z" fill="#000" opacity="0.12" />
      <circle cx="195" cy="182" r="11" fill="url(#${p}-fur)" />
      <rect x="76" y="74" width="88" height="18" rx="9" fill="url(#${p}-fur)" />`,

    // Gorro de chef con un acebo prendido
    toque: () => `
      <circle cx="94" cy="50" r="20" fill="#ffffff" /><circle cx="120" cy="38" r="25" fill="#ffffff" /><circle cx="146" cy="50" r="20" fill="#ffffff" />
      <rect x="84" y="46" width="72" height="30" fill="#ffffff" />
      <path d="M104 44 Q108 58 106 72 M136 44 Q132 58 134 72" stroke="#dfe5ee" stroke-width="2.5" fill="none" />
      <rect x="80" y="70" width="80" height="22" rx="5" fill="#f1f4f8" /><rect x="80" y="70" width="80" height="4" fill="#dfe5ee" />
      <ellipse cx="148" cy="78" rx="7" ry="3.5" fill="#1f6b45" transform="rotate(-25 148 78)" />
      <ellipse cx="156" cy="77" rx="7" ry="3.5" fill="#2a8a5a" transform="rotate(25 156 77)" />
      <circle cx="152" cy="82" r="2.6" fill="#e01f3d" />`,
  };

  // Extras encima de la cabeza (después del gorro)
  const HEAD_EXTRAS = {
    // Audífonos de DJ con luces verdes
    headphones: () => `
      <path d="M68 116 C64 40 176 40 172 116" stroke="#26262b" stroke-width="8" fill="none" stroke-linecap="round" />
      <rect x="58" y="98" width="22" height="38" rx="10" fill="#26262b" /><rect x="62" y="104" width="12" height="26" rx="6" fill="#3fd47f" class="neon" />
      <rect x="160" y="98" width="22" height="38" rx="10" fill="#26262b" /><rect x="166" y="104" width="12" height="26" rx="6" fill="#3fd47f" class="neon" />`,
    // Zzz de sueño
    zzz: () => `<g class="zzz" fill="#ffffff" font-family="Fraunces, Georgia, serif" font-weight="700">
      <text x="200" y="66" font-size="16">z</text><text x="212" y="46" font-size="22">z</text><text x="224" y="22" font-size="28">Z</text></g>`,
  };

  // ---------- Ojos ----------
  const EYES = {
    open: () => `
      <ellipse cx="106" cy="108" rx="4.6" ry="5.8" fill="#2b1d16" /><ellipse cx="134" cy="108" rx="4.6" ry="5.8" fill="#2b1d16" />
      <circle cx="107.6" cy="105.8" r="1.7" fill="#fff" /><circle cx="135.6" cy="105.8" r="1.7" fill="#fff" />`,
    shades: () => `
      <rect x="92" y="99" width="26" height="16" rx="5" fill="#141418" /><rect x="122" y="99" width="26" height="16" rx="5" fill="#141418" />
      <path d="M118 104 L122 104" stroke="#141418" stroke-width="3" />
      <path d="M96 103 L104 103 M126 103 L134 103" stroke="#fff" stroke-width="2" opacity="0.55" stroke-linecap="round" />`,
    round: (p) => `
      <defs><linearGradient id="${p}-lens" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff9a3c" /><stop offset="1" stop-color="#ff4f7b" /></linearGradient></defs>
      <circle cx="105" cy="108" r="11" fill="url(#${p}-lens)" stroke="#2b1d16" stroke-width="2.5" />
      <circle cx="135" cy="108" r="11" fill="url(#${p}-lens)" stroke="#2b1d16" stroke-width="2.5" />
      <path d="M116 106 Q120 102 124 106" stroke="#2b1d16" stroke-width="2.5" fill="none" />
      <path d="M99 103 Q102 100 106 100 M129 103 Q132 100 136 100" stroke="#fff" stroke-width="2" opacity="0.7" fill="none" stroke-linecap="round" />`,
    // Ojos cerrados de sueño
    sleepy: () => `<path d="M100 107 q6 5 12 0 M128 107 q6 5 12 0" stroke="#2b1d16" stroke-width="3" fill="none" stroke-linecap="round" />`,
  };

  // ---------- Mano en alto (brazo izquierdo, el que se mueve) ----------
  const mitten = (p, t) => `<circle cx="39" cy="83" r="14" fill="url(#${p}-mitten)" /><ellipse cx="53" cy="88" rx="6" ry="7" fill="${t.mitten[1]}" />`;
  const fist = (x = 40, y = 86) => `<circle cx="${x}" cy="${y}" r="12" fill="${SKIN}" /><ellipse cx="${x + 5}" cy="${y + 6}" rx="8" ry="4" fill="${SKIN_DARK}" />`;
  const RAISED = {
    mitten: (p, t) => `<ellipse cx="40" cy="100" rx="16" ry="9" fill="url(#${p}-fur)" transform="rotate(-8 40 100)" />${mitten(p, t)}`,
    rock: () => `<rect x="28" y="56" width="8" height="24" rx="4" fill="${SKIN}" /><rect x="45" y="60" width="7" height="20" rx="3.5" fill="${SKIN}" />${fist()}`,
    // Puño en alto celebrando un gol
    fist: () => `${fist(40, 84)}<path d="M32 78 q4 -3 8 0 M38 76 q4 -3 8 0" stroke="${SKIN_DARK}" stroke-width="2" fill="none" />`,
    // Índice apuntando al cielo (DJ)
    finger: () => `<rect x="35" y="50" width="9" height="30" rx="4.5" fill="${SKIN}" />${fist()}`,
    coconut: () => `<circle cx="40" cy="68" r="15" fill="#6b4226" /><ellipse cx="40" cy="58" rx="11" ry="4" fill="#f4ead8" />
      <path d="M44 58 L54 34" stroke="#ff6f91" stroke-width="3" stroke-linecap="round" />
      <path d="M28 52 L32 36" stroke="#8a6a4a" stroke-width="1.5" /><path d="M20 38 Q32 26 44 38 Z" fill="#2ab0a6" /><path d="M26 38 Q32 30 38 38" fill="#f2c14e" />
      <circle cx="40" cy="86" r="11" fill="${SKIN}" />`,
    mug: (p) => `<g class="steam" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round" opacity="0.8">
        <path d="M32 50 q-5 -7 0 -14 q5 -7 0 -14" /><path d="M44 50 q-5 -7 0 -14 q5 -7 0 -14" /></g>
      <rect x="24" y="54" width="30" height="28" rx="5" fill="#fff" /><rect x="24" y="64" width="30" height="7" fill="#c8102e" />
      <path d="M54 60 q10 0 10 9 q0 9 -10 9" stroke="#fff" stroke-width="4" fill="none" />
      <ellipse cx="39" cy="56" rx="13" ry="3" fill="#6b3a1f" /><circle cx="30" cy="84" r="12" fill="url(#${p}-mitten)" />`,
    // Varita mágica con estrella y chispitas
    wand: (p, t) => `<path d="M40 82 L24 26" stroke="#1f1f24" stroke-width="5" stroke-linecap="round" />
      <path d="M27 36 L24 26" stroke="#ffffff" stroke-width="5" stroke-linecap="round" />
      <g class="sparkles">${star(22, 18, 12, "#f2c14e")}
        <circle cx="6" cy="10" r="2.5" fill="#ffe6a8" /><circle cx="38" cy="4" r="2" fill="#ffffff" /><circle cx="10" cy="34" r="1.8" fill="#ffffff" /></g>
      ${mitten(p, t)}`,
    // Vela encendida en su platito
    candle: () => `<circle cx="40" cy="36" r="14" fill="#ffd27a" opacity="0.25" class="glow" />
      <path d="M40 26 C47 35 47 42 40 45 C33 42 33 35 40 26 Z" fill="#ffd27a" class="flame" /><path d="M40 34 C43 38 43 42 40 44 C37 42 37 38 40 34 Z" fill="#ff8a3c" />
      <rect x="35" y="46" width="10" height="26" rx="2" fill="#f4f8fd" />
      <ellipse cx="40" cy="74" rx="17" ry="5" fill="#f2c14e" /><circle cx="58" cy="73" r="4" fill="none" stroke="#f2c14e" stroke-width="2.5" />
      ${fist(40, 88)}`,
    // Cuchara de palo
    spoon: () => `<path d="M40 84 L30 32" stroke="#c8915a" stroke-width="6" stroke-linecap="round" />
      <ellipse cx="28" cy="22" rx="10" ry="13" fill="#c8915a" /><ellipse cx="28" cy="22" rx="6" ry="8" fill="#a8743f" />${fist()}`,
  };

  // ---------- Mano apoyada (brazo derecho) y lo que sostiene ----------
  const REST_HANDS = {
    mitten: (p) => `<circle cx="157" cy="217" r="14" fill="url(#${p}-mitten)" />`,
    skin: () => `<circle cx="157" cy="217" r="12" fill="${SKIN}" />`,
  };
  const REST_PROPS = {
    // Pelota bajo la mano (se dibuja antes que la mano)
    ball: { under: true, svg: () => `<circle cx="168" cy="238" r="20" fill="#ffffff" stroke="#26262b" stroke-width="1.5" />
      <polygon points="168,230 175,235 172,243 164,243 161,235" fill="#26262b" />
      <path d="M168 230 L168 219 M175 235 L186 231 M172 243 L179 253 M164 243 L157 253 M161 235 L150 231" stroke="#26262b" stroke-width="1.5" />
      <path d="M183 224 l5 2 l-1 6 M153 224 l-5 2 l1 6" stroke="#26262b" stroke-width="2" fill="none" />` },
    // Almohada abrazada
    pillow: { under: true, svg: () => `<g transform="rotate(-18 182 232)"><rect x="160" y="216" width="46" height="32" rx="12" fill="#f4f8fd" />
      <path d="M166 224 L200 224 M166 240 L200 240" stroke="#c9dcf2" stroke-width="3" /></g>` },
    // Panetón sobre la mano
    panettone: { under: false, svg: () => `<g transform="translate(173 212) scale(1.35) translate(-173 -212)"><rect x="150" y="196" width="46" height="20" rx="3" fill="#f2c14e" />
      <path d="M156 196 L156 216 M168 196 L168 216 M180 196 L180 216 M190 196 L190 216" stroke="#c8102e" stroke-width="3" />
      <path d="M148 198 C148 172 198 172 198 198 Z" fill="#b5651d" />
      <ellipse cx="173" cy="182" rx="16" ry="5" fill="#8a4a16" />
      <circle cx="160" cy="190" r="2.5" fill="#e01f3d" /><circle cx="174" cy="192" r="2.5" fill="#2a8a5a" /><circle cx="186" cy="188" r="2.5" fill="#e01f3d" /><circle cx="168" cy="186" r="2" fill="#f2c14e" /></g>` },
  };

  // ---------- Objetos delante del cuerpo (detrás de la mano apoyada) ----------
  const PROPS = {
    guitar: () => `<path d="M150 230 L60 146" stroke="#7a4a2b" stroke-width="10" stroke-linecap="round" />
      ${[0.2, 0.35, 0.5, 0.65, 0.8].map((k) => `<path d="M${150 - 90 * k - 4} ${230 - 84 * k + 4} l8 -8" stroke="#e8d9b0" stroke-width="1.5" />`).join("")}
      <path d="M64 150 L50 134 L42 142 L56 158 Z" fill="#141418" />
      <circle cx="47" cy="139" r="2" fill="#d7dbe3" /><circle cx="53" cy="146" r="2" fill="#d7dbe3" />
      <path d="M172 214 C190 206 200 222 190 236 C206 248 196 276 172 270 C156 282 128 272 132 252 C120 238 136 216 152 226 C156 214 166 212 172 214 Z" fill="#f2c14e" />
      <path d="M150 236 C160 230 174 236 172 250 C170 262 152 266 146 256 C140 248 142 240 150 236 Z" fill="#fff" opacity="0.9" />
      <rect x="150" y="242" width="16" height="5" rx="1.5" fill="#26262b" transform="rotate(-43 158 244)" />
      <rect x="158" y="252" width="16" height="5" rx="1.5" fill="#26262b" transform="rotate(-43 166 254)" />
      <circle cx="182" cy="258" r="3" fill="#26262b" /><circle cx="186" cy="248" r="3" fill="#26262b" />
      <path d="M170 262 L62 148 M174 258 L66 144" stroke="#f4f0e6" stroke-width="0.9" opacity="0.85" />`,
    // Consola de DJ con dos tornamesas y lucecitas
    deck: () => `<rect x="40" y="226" width="160" height="48" rx="9" fill="#26262e" />
      <rect x="40" y="226" width="160" height="9" rx="4.5" fill="#3a3a46" />
      <g class="vinyl"><ellipse cx="84" cy="229" rx="28" ry="7" fill="#111114" /><ellipse cx="84" cy="229" rx="9" ry="2.6" fill="#c8102e" /></g>
      <g class="vinyl"><ellipse cx="156" cy="229" rx="28" ry="7" fill="#111114" /><ellipse cx="156" cy="229" rx="9" ry="2.6" fill="#3fd47f" /></g>
      <circle cx="112" cy="246" r="4" fill="#9aa0ad" /><circle cx="128" cy="246" r="4" fill="#9aa0ad" />
      <rect x="108" y="256" width="24" height="5" rx="2.5" fill="#55555f" /><rect x="116" y="254" width="6" height="9" rx="2" fill="#d7dbe3" />
      ${["#ff4f7b", "#ffd27a", "#3fd47f", "#7fd0ff", "#ff4f7b", "#ffd27a", "#3fd47f", "#7fd0ff"].map((c, i) =>
        `<circle cx="${56 + i * 18.5}" cy="266" r="3" fill="${c}" class="led" style="animation-delay:${-i * 0.15}s" />`).join("")}`,
  };

  // ---------- Detrás del Santa ----------
  const BACKS = {
    surfboard: () => `<g transform="rotate(14 200 160)"><ellipse cx="200" cy="160" rx="20" ry="88" fill="#fff" />
      <rect x="196" y="74" width="8" height="172" fill="#c8102e" /><rect x="189" y="74" width="3" height="172" fill="#2a8a5a" /><rect x="208" y="74" width="3" height="172" fill="#2a8a5a" /></g>`,
    // Capa de mago con borde dorado y estrellitas
    cape: () => `<path d="M64 130 C24 196 22 252 30 278 L210 278 C218 252 216 196 176 130 Z" fill="#4b2a7b" />
      <path d="M30 278 L210 278" stroke="#f2c14e" stroke-width="5" stroke-linecap="round" />
      ${star(42, 230, 5, "#f2c14e")}${star(198, 214, 4, "#ffe6a8")}${star(50, 258, 3, "#ffe6a8")}${star(192, 252, 5, "#f2c14e")}`,
  };

  // ---------- Calzado ----------
  const FEET = {
    boots: (t) => `<ellipse cx="90" cy="268" rx="25" ry="11" fill="${t.bootColor || "#26262b"}" />
      <ellipse cx="150" cy="268" rx="25" ry="11" fill="${t.bootColor || "#26262b"}" /><ellipse cx="84" cy="264" rx="8" ry="3" fill="#fff" opacity="0.18" />`,
    sandals: () => `<ellipse cx="90" cy="270" rx="22" ry="9" fill="${SKIN}" /><ellipse cx="150" cy="270" rx="22" ry="9" fill="${SKIN}" />
      <path d="M80 270 Q90 260 100 270 M140 270 Q150 260 160 270" stroke="#2a8a5a" stroke-width="4" fill="none" />`,
    // Chimpunes con tres rayas y tapones
    cleats: () => [90, 150].map((x) => `<ellipse cx="${x}" cy="268" rx="25" ry="10" fill="#1f1f24" />
      <path d="M${x - 8} 262 l6 10 M${x} 261 l6 10 M${x + 8} 262 l6 10" stroke="#fff" stroke-width="2.5" stroke-linecap="round" />
      ${[-14, -4, 6, 16].map((d) => `<rect x="${x + d - 2}" y="277" width="4" height="4" rx="1" fill="#9aa0ad" />`).join("")}`).join(""),
    // Pantuflas de reno con nariz roja
    slippers: () => [90, 150].map((x) => `<path d="M${x - 8} 258 l-6 -10 m3 5 l-6 -2 M${x + 8} 258 l6 -10 m-3 5 l6 -2" stroke="#6b4226" stroke-width="2.5" fill="none" stroke-linecap="round" />
      <ellipse cx="${x}" cy="268" rx="25" ry="11" fill="#8b5a3c" />
      <circle cx="${x - 6}" cy="264" r="2" fill="#1a0f08" /><circle cx="${x + 6}" cy="264" r="2" fill="#1a0f08" />
      <circle cx="${x}" cy="272" r="5" fill="#e01f3d" />`).join(""),
  };

  // ---------- Ropa (dentro del cuerpo, recortada a su forma) ----------
  function clothes(p, t) {
    let s = "";
    const pat = t.pattern;
    if (pat === "hibiscus") s += `<rect x="30" y="120" width="180" height="160" fill="url(#${p}-hib)" opacity="0.95" />`;
    if (pat === "plaid") s += `<rect x="30" y="120" width="180" height="160" fill="url(#${p}-plaid)" />`;
    if (pat === "poncho") s += `<rect x="30" y="152" width="180" height="8" fill="#f2c14e" /><rect x="30" y="160" width="180" height="16" fill="#fff" />
        ${Array.from({ length: 12 }, (_, i) => `<path d="M${36 + i * 15} 168 l6 -6 l6 6 l-6 6 Z" fill="#1f6b45" />`).join("")}
        <rect x="30" y="176" width="180" height="8" fill="#f2c14e" /><rect x="30" y="222" width="180" height="10" fill="#1f6b45" />
        ${Array.from({ length: 18 }, (_, i) => `<path d="M${30 + i * 10} 232 l5 8 l5 -8 Z" fill="#f2c14e" />`).join("")}`;
    // Camiseta de Perú: franja roja diagonal
    if (pat === "peru") s += `<path d="M30 118 L86 118 L214 246 L214 292 L170 292 L30 152 Z" fill="#d4132f" />
        <path d="M86 118 L214 246" stroke="#ffffff" stroke-width="2" opacity="0.35" />`;
    // Mandil rojo de chef con bolsillo
    if (pat === "apron") s += `<rect x="30" y="186" width="180" height="110" fill="#c8102e" /><rect x="30" y="186" width="180" height="4" fill="#ffffff" opacity="0.35" />
        <rect x="98" y="222" width="44" height="22" rx="4" fill="#a50d26" /><path d="M98 226 L142 226" stroke="#fff" stroke-width="1.5" stroke-dasharray="3 3" opacity="0.6" />`;

    if (t.frontStrip === "fur") s += `<rect x="107" y="120" width="26" height="160" fill="url(#${p}-fur)" />`;
    if (t.frontStrip === "tee") s += `<rect x="104" y="120" width="32" height="160" fill="#c8102e" />
        <rect x="100" y="130" width="3" height="140" fill="#b8bcc6" /><rect x="137" y="130" width="3" height="140" fill="#b8bcc6" />`;
    if (t.frontStrip === "buttons") s += [205, 228].map((y) => `<circle cx="120" cy="${y}" r="3" fill="#ffffff" />`).join("");

    if (t.bottom === "fur") s += `<g fill="url(#${p}-fur)"><rect x="30" y="248" width="180" height="40" />
        ${[40, 54, 68, 82, 96, 144, 158, 172, 186, 200].map((x) => `<circle cx="${x}" cy="${248 - Math.min(4, Math.min(x - 30, 210 - x) / 14)}" r="8" />`).join("")}</g>`;
    if (t.bottom === "hem") s += `<rect x="30" y="250" width="180" height="40" fill="#0b0b0e" />`;
    if (t.bottom === "shorts") s += `<rect x="30" y="238" width="180" height="50" fill="${t.shortsColor || "#2a78b8"}" /><rect x="30" y="238" width="180" height="4" fill="#fff" opacity="0.6" />`;
    if (t.belt) s += `<rect x="30" y="198" width="180" height="22" fill="#1f1f24" /><rect x="30" y="200" width="180" height="3" fill="#fff" opacity="0.12" />` +
      (t.belt === "studs" ? Array.from({ length: 15 }, (_, i) => `<circle cx="${38 + i * 12}" cy="209" r="2.6" fill="#d7dbe3" />`).join("") : "");
    return s;
  }

  // ---------- Temas ----------
  // coat: colores del traje (claro, medio, oscuro). hat: colores del gorro clásico (si no, usa coat).
  const RED = ["#f0455a", "#d4132f", "#980b21"];
  const GREEN_MITTEN = ["#2f9a63", "#15503a"];
  const WHITE = ["#ffffff", "#eef1f5", "#c9d0db"];
  const THEMES = {
    clasico: { name: "Clásico", coat: RED, mitten: GREEN_MITTEN, sleeve: "coat", cuffs: true, frontStrip: "fur", bottom: "fur", belt: "classic",
      feet: "boots", hat: "classic", eyes: "open", raised: "mitten", rest: "mitten" },
    rockero: { name: "Rockero", coat: ["#4a4a56", "#26262e", "#111114"], mitten: GREEN_MITTEN, sleeve: "coat", frontStrip: "tee", bottom: "hem", belt: "studs",
      feet: "boots", hat: "classic", eyes: "shades", raised: "rock", rest: "skin", prop: "guitar" },
    veraniego: { name: "Veraniego", coat: ["#f0455a", "#d4132f", "#a50d26"], mitten: GREEN_MITTEN, sleeve: "short", frontStrip: "buttons", bottom: "shorts", pattern: "hibiscus",
      feet: "sandals", hat: "straw", eyes: "round", raised: "coconut", rest: "skin", back: "surfboard" },
    andino: { name: "Andino", coat: ["#e5404f", "#c8102e", "#8f0b20"], mitten: ["#f2c14e", "#c99a2e"], sleeve: "coat", pattern: "poncho",
      feet: "boots", bootColor: "#4a2c1d", hat: "chullo", eyes: "open", raised: "mug", rest: "mitten" },
    futbolero: { name: "Futbolero", coat: WHITE, hatColors: RED, mitten: GREEN_MITTEN, sleeve: "short", pattern: "peru", bottom: "shorts", shortsColor: "#1f1f24",
      feet: "cleats", hat: "classic", eyes: "open", raised: "fist", rest: "skin", restProp: "ball" },
    dj: { name: "DJ", coat: ["#3fae74", "#1f6b45", "#124a33"], hatColors: RED, mitten: GREEN_MITTEN, sleeve: "coat", cuffs: true, frontStrip: "fur", bottom: "fur", belt: "classic",
      feet: "boots", hat: "classic", headExtra: "headphones", eyes: "open", raised: "finger", rest: "skin", prop: "deck" },
    mago: { name: "Mago", coat: RED, mitten: ["#f2c14e", "#c99a2e"], sleeve: "coat", cuffs: true, frontStrip: "fur", bottom: "fur", belt: "classic",
      feet: "boots", hat: "wizard", eyes: "open", raised: "wand", rest: "mitten", back: "cape" },
    pijama: { name: "En pijama", coat: RED, mitten: GREEN_MITTEN, sleeve: "coat", pattern: "plaid", frontStrip: "buttons",
      feet: "slippers", hat: "nightcap", headExtra: "zzz", eyes: "sleepy", raised: "candle", rest: "skin", restProp: "pillow" },
    chef: { name: "Chef", coat: WHITE, mitten: GREEN_MITTEN, sleeve: "coat", pattern: "apron",
      feet: "boots", hat: "toque", eyes: "open", raised: "spoon", rest: "skin", restProp: "panettone" },
  };

  function santaSVG(id, opts = {}) {
    if (!THEMES[id]) id = "clasico";
    const t = THEMES[id];
    const p = `${opts.prefix || "s"}-${id}`; // prefijo para que los ids no choquen si hay varios Santas en la página
    const head = !!opts.head;
    const hat = t.hatColors || t.coat;
    const sleeve = `url(#${p}-coat)`;
    const arm = (d, which) => t.sleeve === "short"
      ? `<path d="${d}" stroke="${SKIN}" stroke-width="26" stroke-linecap="round" fill="none" />` +
        (which === "left" ? `<path d="M62 168 C52 160 46 150 43 140" stroke="${sleeve}" stroke-width="32" stroke-linecap="round" fill="none" />`
                          : `<path d="M186 160 C194 172 196 182 196 190" stroke="${sleeve}" stroke-width="32" stroke-linecap="round" fill="none" />`)
      : `<path d="${d}" stroke="${sleeve}" stroke-width="30" stroke-linecap="round" fill="none" />`;
    const grad = (name, c) => `<radialGradient id="${p}-${name}" cx="0.38" cy="0.3" r="0.8"><stop offset="0" stop-color="${c[0]}" /><stop offset="0.55" stop-color="${c[1]}" /><stop offset="1" stop-color="${c[2]}" /></radialGradient>`;

    const defs = `<defs>
      ${grad("coat", t.coat)}${grad("hat", hat)}
      <radialGradient id="${p}-face" cx="0.45" cy="0.4" r="0.7"><stop offset="0" stop-color="#fde0c8" /><stop offset="1" stop-color="#efb994" /></radialGradient>
      <linearGradient id="${p}-fur" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff" /><stop offset="1" stop-color="#e3e9f1" /></linearGradient>
      <radialGradient id="${p}-mitten" cx="0.35" cy="0.35" r="0.7"><stop offset="0" stop-color="${t.mitten[0]}" /><stop offset="1" stop-color="${t.mitten[1]}" /></radialGradient>
      <clipPath id="${p}-body"><ellipse cx="120" cy="198" rx="80" ry="70" /></clipPath>
      ${t.pattern === "hibiscus" ? `<pattern id="${p}-hib" width="46" height="46" patternUnits="userSpaceOnUse"><g transform="translate(23 23)">
        <ellipse cx="-9" cy="9" rx="8" ry="3.5" fill="#1f6b45" transform="rotate(35 -9 9)" />
        ${[0, 72, 144, 216, 288].map((a) => `<ellipse cx="0" cy="-6" rx="4.5" ry="7" fill="#fff" transform="rotate(${a})" />`).join("")}
        <circle r="3" fill="#f2c14e" /></g><circle cx="2" cy="4" r="2.5" fill="#ffd27a" opacity="0.8" /></pattern>` : ""}
      ${t.pattern === "plaid" ? `<pattern id="${p}-plaid" width="26" height="26" patternUnits="userSpaceOnUse">
        <rect width="26" height="26" fill="#c8102e" /><rect y="8" width="26" height="8" fill="#15503a" opacity="0.55" />
        <rect x="8" width="8" height="26" fill="#15503a" opacity="0.55" />
        <rect y="20" width="26" height="1.5" fill="#fff" opacity="0.45" /><rect x="20" width="1.5" height="26" fill="#fff" opacity="0.45" /></pattern>` : ""}
    </defs>`;

    const beard = (fill, dy) => `<g fill="${fill}" transform="translate(0 ${dy})">
      <circle cx="87" cy="133" r="14" /><circle cx="90" cy="148" r="15.5" /><circle cx="101" cy="160" r="16.5" />
      <circle cx="120" cy="166" r="18" /><circle cx="139" cy="160" r="16.5" /><circle cx="150" cy="148" r="15.5" /><circle cx="153" cy="133" r="14" />
      ${dy ? "" : `<ellipse cx="120" cy="147" rx="34" ry="18" />`}</g>`;
    const mustache = (fill, dy) => `<g fill="${fill}" transform="translate(0 ${dy})">
      <path d="M120 133 C112 125 97 125 90 132 C86 138 91 143 98 141 C105 139 112 140 120 137 Z" />
      <path d="M120 133 C128 125 143 125 150 132 C154 138 149 143 142 141 C135 139 128 140 120 137 Z" /></g>`;
    const restProp = t.restProp ? REST_PROPS[t.restProp] : null;
    const buckle = t.belt ? `<rect x="103" y="193" width="34" height="32" rx="6" fill="none" stroke="${t.belt === "studs" ? "#c9ced8" : "#f2c14e"}" stroke-width="6" />
      <rect x="106" y="196" width="10" height="3" rx="1.5" fill="#fff3c4" opacity="0.8" />` : "";

    const viewBox = head ? "50 -12 190 204" : "0 0 240 285";
    return `<svg class="santa-svg santa--${id} ${opts.cls || ""}" viewBox="${viewBox}" role="img" aria-label="Santa ${t.name}">
      ${defs}
      ${head ? "" : `<ellipse cx="120" cy="278" rx="84" ry="7" fill="rgba(40,0,8,0.28)" />
      ${t.back ? BACKS[t.back]() : ""}
      ${FEET[t.feet](t)}
      <g class="arm arm--left">${arm("M62 168 C40 150 32 122 40 98", "left")}${RAISED[t.raised](p, t)}</g>`}
      <g class="belly">
        <ellipse cx="120" cy="198" rx="80" ry="70" fill="url(#${p}-coat)" />
        <g clip-path="url(#${p}-body)">${clothes(p, t)}</g>
        <ellipse cx="90" cy="168" rx="26" ry="15" fill="#fff" opacity="0.13" transform="rotate(-20 90 168)" />
        ${buckle}
      </g>
      ${head ? "" : `${t.prop ? PROPS[t.prop]() : ""}
      <g class="arm arm--right">${arm("M186 160 C204 184 196 208 168 216", "right")}
        ${t.cuffs ? `<ellipse cx="172" cy="214" rx="9" ry="15" fill="url(#${p}-fur)" transform="rotate(-70 172 214)" />` : ""}
        ${restProp && restProp.under ? restProp.svg() : ""}${REST_HANDS[t.rest](p, t)}${restProp && !restProp.under ? restProp.svg() : ""}</g>`}
      <g class="head">
        <g fill="#ffffff"><circle cx="80" cy="110" r="14" /><circle cx="75" cy="126" r="13" /><circle cx="81" cy="140" r="12" />
          <circle cx="160" cy="110" r="14" /><circle cx="165" cy="126" r="13" /><circle cx="159" cy="140" r="12" /></g>
        <circle cx="120" cy="112" r="42" fill="url(#${p}-face)" />
        <ellipse cx="95" cy="124" rx="10" ry="7" fill="#f2797f" opacity="0.45" />
        <ellipse cx="145" cy="124" rx="10" ry="7" fill="#f2797f" opacity="0.45" />
        <ellipse cx="104" cy="95" rx="10" ry="4.5" fill="#fff" transform="rotate(-10 104 95)" />
        <ellipse cx="136" cy="95" rx="10" ry="4.5" fill="#fff" transform="rotate(10 136 95)" />
        ${EYES[t.eyes](p)}
        ${beard("#d9e0ea", 3)}${beard("#ffffff", 0)}
        <path d="M109 142 Q120 156 131 142 Z" fill="#8a2430" /><ellipse cx="120" cy="148" rx="5" ry="2.6" fill="#ec6f80" />
        ${mustache("#d9e0ea", 2)}${mustache("#ffffff", 0)}
        <circle cx="120" cy="126" r="9" fill="#ec9580" /><circle cx="117" cy="123" r="3" fill="#fff" opacity="0.55" />
        ${HATS[t.hat](p)}
        ${t.headExtra ? HEAD_EXTRAS[t.headExtra](p) : ""}
      </g>
    </svg>`;
  }

  window.SANTA_THEMES = THEMES;
  window.santaSVG = santaSVG;
})();
