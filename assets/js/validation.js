    /* ==========================================
       CONSTANTES GLOBALES
    ========================================== */
      const DL = {
      "APPLETV": "APPLE TV",
      "199": "199",
      "FANART_DESTACADO": "FANART",
      "FANART": "FANART",
      "FANART_MOVIL": "FANART MÓVIL",
      "IPLUS": "IPLUS",
      "MOD_DESTACADOS1": "MOD DES. 1",
      "MOD_DESTACADOS1_SIL": "MOD DES. 1 SIL",
      "MOD_DESTACADOS2": "MOD DES. 2",
      "MOD_DESTACADOS2_SIL": "MOD DES. 2 SIL",
      "MOD_DESTACADOS3": "MOD DES. 3",
      "MOD_DESTACADOS3_SIL": "MOD DES. 3 SIL",
      "MOD_DESTACADOS4": "MOD DES. 4",
      "MOD_DESTACADOS4_SIL": "MOD DES. 4 SIL",
      "MOD_N_SIL": "MOD N SIL",
      "MOD_N": "MOD N",
      "MUX4_FONDO": "MUX 4 FONDO",
      "MUX4_TXT": "MUX TXT",
      "SMARTPHONE_MUX_FONDO": "SPH. MUX FONDO",
      "SMARTPHONE_MUX_TXT": "SPH. MUX TXT",
      "TITULO_FICHA": "TITULO FICHA",
      "CARTEL_COM_H": "CARTEL COMUNICACIÓN HORIZONTAL",
      "CARTEL_COM_V": "CARTEL COMUNICACIÓN VERTICAL",
      "CARATULA_V": "CARATULA VERTICAL",
      "WEB": "WEB",
      "WOW": "WOW",
      "AMAZON_BG": "AMAZON",
      "AMAZON_LOGO": "AMAZON LOGO",
      "XIAOMI": "XIAOMI",
      "_PERFIL": "PERFIL",
      "_SONY": "SONY",
      "DESTACADO_DOBLE1": "DESTACADO DOBLE 1",
      "DESTACADO_DOBLE1_SIL": "DESTACADO DOBLE 1 SIL",
      "DESTACADO_DOBLE2": "DESTACADO DOBLE 2",
      "DESTACADO_DOBLE4_SIL": "DESTACADO DOBLE 4 SIL",
      "DESTACADO_DOBLE4": "DESTACADO DOBLE 4",
    };

    /* =============================================
       AJUSTES OVERLAY TXT (imagen cargada por el usuario)
       Controla la posición y escala del overlay TXT
       cuando se superpone sobre SMARTPHONE_MUX_FONDO
    ============================================= */
    const SMARTPHONE_MUX_TXT_OVERLAY = {
      // POSICIÓN (en píxeles del arte original 1440x2986)
      posX: 0,        // Desplazamiento horizontal (0 = izquierda)
      posY: 1217,     // Desplazamiento vertical (desde arriba)

      // ESCALA uniforme (1 = 100%, 0.5 = 50%, 1.5 = 150%)
      escala: 1
    };

    /* Reglas de dimensiones/peso */
      const RU = {
      "AD_PAUSE": { w: 1280, h: 720, mode: "exact", maxMB: 0.1 },
      "APPLETV": { w: 908, h: 512, mode: "exact", maxMB: 1 },
      "199": { w: 1920, h: 636, mode: "exact", maxMB: 4 },
      "FANART_DESTACADO": { w: 1920, h: 1080, mode: "exact", maxMB: 1.5 },
      "FANART": { w: 3840, h: 2160, mode: "exact", maxMB: 3 },
      "FANART_MOVIL": { w: 1440, h: 2986, mode: "exact", maxMB: 3 },
      "IPLUS": { w: 1280, h: 620, mode: "exact", maxMB: 0.15 },
      "MOD_DESTACADOS1": { w: 1636, h: 296, mode: "exact", maxMB: 1 },
      "MOD_DESTACADOS1_SIL": { w: 1920, h: 400, mode: "exact", maxMB: 1 },
      "MOD_DESTACADOS2": { w: 803, h: 296, mode: "exact", maxMB: 1 },
      "MOD_DESTACADOS2_SIL": { w: 863, h: 400, mode: "exact", maxMB: 1 },
      "MOD_DESTACADOS3": { w: 526, h: 296, mode: "exact", maxMB: 1 },
      "MOD_DESTACADOS3_SIL": { w: 584, h: 400, mode: "exact", maxMB: 1 },
      "MOD_N": {
        options: [
          { w: 386, h: 217 },
          { w: 385, h: 217 }
        ],
        mode: "list",
        maxMB: 0.6
      },
      "MOD_N_SIL": { w: 449, h: 300, mode: "exact", maxMB: 0.6 },
      "MUX4_FONDO": { w: 1920, h: 1080, mode: "exact", maxMB: 1.5 },
      "MUX4_TXT": { w: 784, h: 318, mode: "exact", maxMB: 0.6 },
      "SMARTPHONE_MUX_FONDO": { w: 1440, h: 2986, mode: "exact", maxMB: 1.5 },
      "SMARTPHONE_MUX_TXT": { w: 1440, h: 466, mode: "exact", maxMB: 0.6 },
      "TITULO_FICHA": { w: 724, h: 100, mode: "exact", maxMB: 0.6 },
      "CARTEL_COM_H": { w: 3840, h: 2160, mode: "exact", maxMB: 100 },
      "CARTEL_COM_V": { w: 2160, h: 3240, mode: "exact", maxMB: 100 },
      "CARATULA_V": { w: 1200, h: 1800, mode: "exact", maxMB: 5 },
      "CARATULA_V_TXT": { w: 1200, h: 1800, mode: "exact", maxMB: 5 },
      "CARATULA_H": { w: 1920, h: 1080, mode: "exact", maxMB: 5 },
      "CARATULA_H_TXT": { w: 1920, h: 1080, mode: "exact", maxMB: 5 },
      "WEB": { w: 2000, h: 465, mode: "exact", maxMB: 1 },
      "WOW": { w: 1280, h: 258, mode: "exact", maxMB: 0.25 },
      "XIAOMI": { w: 1280, h: 360, mode: "exact", maxMB: 10},
      "AMAZON_BG": { w: 1920, h: 720, mode: "exact", maxMB: 0.45 },
      "AMAZON_LOGO": { w: 640, h: 260, mode: "exact", maxMB: 0.45 },
      "_PERFIL": { w: 425, h: 479, mode: "exact", maxMB: 10 },
      "_SONY": { w: 204, h: 306, mode: "exact", maxMB: 10 },
      "DESTACADO_DOBLE1": { w: 1636, h: 548, mode: "exact", maxMB: 0.60 },
      "DESTACADO_DOBLE1_SIL": { w: 1636, h: 630, mode: "exact", maxMB: 1 },
      "DESTACADO_DOBLE2": { w: 803, h: 548, mode: "exact", maxMB: 1 },
      "DESTACADO_DOBLE2_SIL": { w: 803, h: 630, mode: "exact", maxMB: 1 },
      "DESTACADO_DOBLE4_SIL": {
        options: [
          { w: 386, h: 630 },
          { w: 385, h: 630 }
        ],
        mode: "list",
        maxMB: 1
      },
      "DESTACADO_DOBLE4": {
        options: [
          { w: 386, h: 548 },
          { w: 385, h: 548 }
        ],
        mode: "list",
        maxMB: 1
      },

    };

    /* Títulos válidos */
    const AN = [
  { key: "MOD_DESTACADOS1_SIL", aliases: ["MOD_DESTACADOS1_SIL"] },
  { key: "MOD_DESTACADOS2_SIL", aliases: ["MOD_DESTACADOS2_SIL"] },
  { key: "MOD_DESTACADOS3_SIL", aliases: ["MOD_DESTACADOS3_SIL"] },
  { key: "MOD_DESTACADOS4_SIL", aliases: ["MOD_DESTACADOS4_SIL"] },
  { key: "MOD_N_SIL", aliases: ["MOD_N_SIL"] },

  // Variantes sin "S": MOD_DESTACADO1/2/3/4
  { key: "MOD_DESTACADOS1", aliases: ["MOD_DESTACADOS1", "MOD_DESTACADO1"] },
  { key: "MOD_DESTACADOS2", aliases: ["MOD_DESTACADOS2", "MOD_DESTACADO2"] },
  { key: "MOD_DESTACADOS3", aliases: ["MOD_DESTACADOS3", "MOD_DESTACADO3"] },
  { key: "MOD_DESTACADOS4", aliases: ["MOD_DESTACADOS4", "MOD_DESTACADO4"] },
  { key: "MOD_N", aliases: ["MOD_N"] },

  { key: "APPLETV", aliases: ["APPLETV"] },
  { key: "199", aliases: ["199"] },
  { key: "FANART_DESTACADO", aliases: ["FANART_DESTACADO"] },
  { key: "FANART", aliases: ["FANART"], endOnly: true },
  { key: "FANART_MOVIL", aliases: ["FANART_MOVIL"], endOnly: true },
  { key: "IPLUS", aliases: ["IPLUS"] },
  { key: "AD_PAUSE", aliases: ["AD_PAUSE"] },
  { key: "MUX4_FONDO", aliases: ["MUX4_FONDO"] },
  { key: "MUX4_TXT", aliases: ["MUX4_TXT"] },
  { key: "SMARTPHONE_MUX_FONDO", aliases: ["SMARTPHONE_MUX_FONDO"] },
  { key: "SMARTPHONE_MUX_TXT", aliases: ["SMARTPHONE_MUX_TXT"] },
  { key: "TITULO_FICHA", aliases: ["TITULO_FICHA"] },
  { key: "CARTEL_COM_H", aliases: ["CC_H"], endOnly: true },
  { key: "CARTEL_COM_V", aliases: ["CC_V"], endOnly: true },
  { key: "CARATULA_V", aliases: ["CARATULA_V"], endOnly: true },
  { key: "CARATULA_H", aliases: ["CARATULA_H"], endOnly: true },
  { key: "WEB", aliases: ["WEB"] },
  { key: "WOW", aliases: ["WOW"] },
  { key: "XIAOMI", aliases: ["XIAOMI"] },
  { key: "AMAZON_BG", aliases: ["AMAZON_BG"] },
  { key: "AMAZON_LOGO", aliases: ["AMAZON_LOGO"] },
  { key: "_PERFIL", aliases: ["_PERFIL"] },
  { key: "_SONY", aliases: ["_SONY", "SONY"] },
  { key: "DESTACADO_DOBLE1", aliases: ["DESTACADO_DOBLE1", "DESTACADO_DOBLE_1"] },
  { key: "DESTACADO_DOBLE1_SIL", aliases: ["DESTACADO_DOBLE1_SIL", "DESTACADO_DOBLE_SIL_1"] },
  { key: "DESTACADO_DOBLE2", aliases: ["DESTACADO_DOBLE2", "DESTACADO_DOBLE_2"] },
  { key: "DESTACADO_DOBLE2_SIL", aliases: ["DESTACADO_DOBLE2_SIL", "DESTACADO_DOBLE_SIL_2", "DESTACADO2_DOBLE_SIL"] },
  { key: "DESTACADO_DOBLE4_SIL", aliases: ["DESTACADO_DOBLE4_SIL", "DESTACADO_DOBLE_SIL_4"] },
  { key: "DESTACADO_DOBLE4", aliases: ["DESTACADO_DOBLE4", "DESTACADO_DOBLE_4"] }
];

    /* Transformación AN → búsqueda indexada */
    const AI = AN
      .flatMap(({ key: k, aliases: a, endOnly: e }) => a.map(t => ({ k, t, e })))
      .sort((a, b) => b.t.length - a.t.length);

    /* Caracteres permitidos alrededor del patrón */
    const AB = new Set(["", "_", "-", " ", "."]);

    const endsWithSil = s => {
      const idx = s.lastIndexOf("_SIL");
      if (idx === -1) return false;

      const tail = s.slice(idx + 4);
      return /^(\.[A-Z0-9]+)?(?:[?#].*)?$/i.test(tail);
    };

    function checkName(n) {
  const u = String(n || "").toUpperCase();

  // 1) Caso especial *_SIL*
  if (u.includes("_SIL")) {
    if (!endsWithSil(u)) return null;

    const BASES = [
  { key: "MOD_DESTACADOS1_SIL", bases: ["MOD_DESTACADOS1", "MOD_DESTACADO1"] },
  { key: "MOD_DESTACADOS2_SIL", bases: ["MOD_DESTACADOS2", "MOD_DESTACADO2"] },
  { key: "MOD_DESTACADOS3_SIL", bases: ["MOD_DESTACADOS3", "MOD_DESTACADO3"] },
  { key: "MOD_DESTACADOS4_SIL", bases: ["MOD_DESTACADOS4", "MOD_DESTACADO4"] },
  { key: "DESTACADO_DOBLE1_SIL", bases: ["DESTACADO_DOBLE1", "DESTACADO_DOBLE_1"] },
  { key: "DESTACADO_DOBLE2_SIL", bases: ["DESTACADO_DOBLE2", "DESTACADO_DOBLE_2"] },
  { key: "DESTACADO_DOBLE4_SIL", bases: ["DESTACADO_DOBLE4", "DESTACADO_DOBLE_4"] },
  { key: "MOD_N_SIL", bases: ["MOD_N"] }
];

    for (const item of BASES) {
      for (const b of item.bases) {
        if (u.includes(b)) {
          // Si hay _SIL y el nombre base encaja, devolvemos la clave SIL
          return item.key;
        }
      }
    }

    // Tiene _SIL pero no corresponde a ningún MOD válido
    return null;
  }

  // 2) Lógica general: probamos TODOS los formatos salvo _PERFIL
  const dot = u.lastIndexOf(".");
  const b = dot > 0 ? u.slice(0, dot) : u;

  for (const { k, t, e } of AI) {
    if (k === "_PERFIL") continue; // _PERFIL se resuelve al final

    let i = -1;
    while ((i = b.indexOf(t, i + 1)) !== -1) {
      const prev = i === 0 ? "" : b[i - 1];
      const next = i + t.length >= b.length ? "" : b[i + t.length];

      // Evitamos cosas raras con signos +
      if (prev === "+" || next === "+") continue;

      // Solo aceptamos si está separado por _ - espacio . o inicio/fin
      if (AB.has(prev) && AB.has(next)) {
        // Para formatos endOnly (CC_H, CC_V), el token debe estar al final del nombre base
        if (e && next !== "") continue;
        return k; // devolvemos el formato encontrado
      }
    }
  }

  // 3) Fallback PERFIL:
  // solo si el nombre contiene exactamente "_PERFIL"
  // (así "EL_PERFIL_DEL_DEMONIO" NO pasa, pero "NOMBRE_PERFIL.png" SÍ)
  if (u.includes("_PERFIL")) {
    return "_PERFIL";
  }

  // 4) Sin coincidencias
  return null;
}

    const humanMB = b => (b / 1048576).toFixed(2);

    function checkDims(w, h, r) {
      const hasList = r && Array.isArray(r.options) && r.options.length;

      if (!r || (!hasList && (r.w == null || r.h == null)))
        return { status: "warn", msg: `(${w}×${h})` };

      if (hasList) {
        const match = r.options.find(o => w === o.w && h === o.h);
        const targetMsg = r.options.map(o => `${o.w}×${o.h}`).join(" / ");

        return {
          status: match ? "ok" : "err",
          msg: match ? targetMsg : `${w}×${h} (req. ${targetMsg})`
        };
      }

      const ok = w === r.w && h === r.h;
      return {
        status: ok ? "ok" : "err",
        msg: ok ? `${r.w}×${r.h}` : `${w}×${h} (req. ${r.w}×${r.h})`
      };
    }

    function checkWeight(b, r) {
      if (!r || r.maxMB == null)
        return { status: "warn", msg: `${humanMB(b)} MB` };

      const ok = b <= r.maxMB * 1048576;
      return {
        status: ok ? "ok" : "err",
        msg: ok
          ? `Max: ${r.maxMB} MB (${humanMB(b)} MB)`
          : `${humanMB(b)} MB (> ${r.maxMB} MB)`
      };
    }