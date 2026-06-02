    /* ==========================================
       CONSTANTES GLOBALES
    ========================================== */
      const DL = {
      "APPLETV": "APPLE TV",
      "199": "199",
      "FANART_DESTACADO": "FANART",
      "FANART": "FANART",
      "FANART_COLECCION": "FANART COLECCIÓN",
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
      "AD_PAUSE": { w: 1280, h: 720, mode: "exact", maxMB: 0.1, ext: "jpg" },
      "APPLETV": { w: 908, h: 512, mode: "exact", maxMB: 1, ext: "jpg" },
      "199": { w: 1920, h: 636, mode: "exact", maxMB: 4, ext: "jpg" },
      "FANART_DESTACADO": { w: 1920, h: 1080, mode: "exact", maxMB: 1.5, ext: "jpg" },
      "FANART": { w: 3840, h: 2160, mode: "exact", maxMB: 3, ext: "jpg" },
      "FANART_COLECCION": { w: 1920, h: 1080, mode: "exact", maxMB: 10, ext: "jpg" },
      "FANART_MOVIL": { w: 1440, h: 2986, mode: "exact", maxMB: 3, ext: "jpg" },
      "IPLUS": { w: 1280, h: 620, mode: "exact", maxMB: 0.15, ext: "jpg" },
      "MOD_DESTACADOS1": { w: 1636, h: 296, mode: "exact", maxMB: 1, ext: "jpg" },
      "MOD_DESTACADOS1_SIL": { w: 1920, h: 400, mode: "exact", maxMB: 1, ext: "png" },
      "MOD_DESTACADOS2": { w: 803, h: 296, mode: "exact", maxMB: 1, ext: "jpg" },
      "MOD_DESTACADOS2_SIL": { w: 863, h: 400, mode: "exact", maxMB: 1, ext: "png" },
      "MOD_DESTACADOS3": { w: 526, h: 296, mode: "exact", maxMB: 1, ext: "jpg" },
      "MOD_DESTACADOS3_SIL": { w: 584, h: 400, mode: "exact", maxMB: 1, ext: "png" },
      "MOD_N": {
        options: [
          { w: 386, h: 217 },
          { w: 385, h: 217 }
        ],
        mode: "list",
        maxMB: 0.6,
        ext: "png"
      },
      "MOD_N_SIL": { w: 449, h: 300, mode: "exact", maxMB: 0.6, ext: "png" },
      "MUX4_FONDO": { w: 1920, h: 1080, mode: "exact", maxMB: 1.5, ext: "jpg" },
      "MUX4_TXT": { w: 784, h: 318, mode: "exact", maxMB: 0.6, ext: "png" },
      "SMARTPHONE_MUX_FONDO": { w: 1440, h: 2986, mode: "exact", maxMB: 1.5, ext: "jpg" },
      "SMARTPHONE_MUX_TXT": { w: 1440, h: 466, mode: "exact", maxMB: 0.6, ext: "png" },
      "TITULO_FICHA": { w: 724, h: 100, mode: "exact", maxMB: 0.6, ext: "png" },
      "CARTEL_COM_H": { w: 3840, h: 2160, mode: "exact", maxMB: 100, ext: "jpg" },
      "CARTEL_COM_V": { w: 2160, h: 3240, mode: "exact", maxMB: 100, ext: "jpg" },
      "CARATULA_V": { w: 1200, h: 1800, mode: "exact", maxMB: 10, ext: "jpg" },
      "CARATULA_V_TXT": { w: 1200, h: 1800, mode: "exact", maxMB: 10, ext: "png" },
      "CARATULA_H": { w: 1920, h: 1080, mode: "exact", maxMB: 10, ext: "jpg" },
      "CARATULA_H_TXT": { w: 1920, h: 1080, mode: "exact", maxMB: 10, ext: "png" },
      "WEB": { w: 2000, h: 465, mode: "exact", maxMB: 1, ext: "jpg" },
      "WOW": { w: 1280, h: 258, mode: "exact", maxMB: 0.25, ext: "jpg" },
      "XIAOMI": { w: 1280, h: 360, mode: "exact", maxMB: 10, ext: "jpg" },
      "AMAZON_BG": { w: 1920, h: 720, mode: "exact", maxMB: 0.45, ext: "jpg" },
      "AMAZON_LOGO": { w: 640, h: 260, mode: "exact", maxMB: 0.45, ext: "png" },
      "_PERFIL": { w: 425, h: 479, mode: "exact", maxMB: 10, ext: "png" },
      "_SONY": { w: 204, h: 306, mode: "exact", maxMB: 10, ext: "png" },
      "DESTACADO_DOBLE1": { w: 1636, h: 548, mode: "exact", maxMB: 0.60, ext: "jpg" },
      "DESTACADO_DOBLE1_SIL": { w: 1636, h: 630, mode: "exact", maxMB: 1, ext: "png" },
      "DESTACADO_DOBLE2": { w: 803, h: 548, mode: "exact", maxMB: 1, ext: "jpg" },
      "DESTACADO_DOBLE2_SIL": { w: 803, h: 630, mode: "exact", maxMB: 1, ext: "png" },
      "DESTACADO_DOBLE4_SIL": {
        options: [
          { w: 386, h: 630 },
          { w: 385, h: 630 }
        ],
        mode: "list",
        maxMB: 1,
        ext: "png"
      },
      "DESTACADO_DOBLE4": {
        options: [
          { w: 386, h: 548 },
          { w: 385, h: 548 }
        ],
        mode: "list",
        maxMB: 1,
        ext: "jpg"
      },

    };

    /* Títulos válidos */
    const AN = [
  { key: "MOD_DESTACADOS1_SIL", aliases: ["MOD_DESTACADO1_SIL"] },
  { key: "MOD_DESTACADOS2_SIL", aliases: ["MOD_DESTACADO2_SIL"] },
  { key: "MOD_DESTACADOS3_SIL", aliases: ["MOD_DESTACADO3_SIL"] },
  { key: "MOD_DESTACADOS4_SIL", aliases: ["MOD_DESTACADO4_SIL"] },
  { key: "MOD_N_SIL", aliases: ["MOD_N_SIL", "MODULO_N_SIL"] },

  // Solo forma sin "S": MOD_DESTACADO1/2/3/4
  { key: "MOD_DESTACADOS1", aliases: ["MOD_DESTACADO1"] },
  { key: "MOD_DESTACADOS2", aliases: ["MOD_DESTACADO2"] },
  { key: "MOD_DESTACADOS3", aliases: ["MOD_DESTACADO3"] },
  { key: "MOD_DESTACADOS4", aliases: ["MOD_DESTACADO4"] },
  { key: "MOD_N", aliases: ["MOD_N", "MODULO_N"] },

  { key: "APPLETV", aliases: ["APPLETV"] },
  { key: "199", aliases: ["199"] },
  { key: "FANART_DESTACADO", aliases: ["FANART_DESTACADO"] },
  { key: "FANART_COLECCION", aliases: ["FANART_COLECCION"] },
  { key: "FANART", aliases: ["FANART"] },
  { key: "FANART_MOVIL", aliases: ["FANART_MOVIL"] },
  { key: "IPLUS", aliases: ["IPLUS"] },
  { key: "AD_PAUSE", aliases: ["AD_PAUSE"] },
  { key: "MUX4_FONDO", aliases: ["MUX4_FONDO"] },
  { key: "MUX4_TXT", aliases: ["MUX4_TXT"] },
  { key: "SMARTPHONE_MUX_FONDO", aliases: ["SMARTPHONE_MUX_FONDO"] },
  { key: "SMARTPHONE_MUX_TXT", aliases: ["SMARTPHONE_MUX_TXT"] },
  { key: "TITULO_FICHA", aliases: ["TITULO_FICHA"] },
  { key: "CARTEL_COM_H", aliases: ["CC_H"] },
  { key: "CARTEL_COM_V", aliases: ["CC_V"] },
  { key: "CARATULA_V", aliases: ["CARATULA_V"] },
  { key: "CARATULA_H", aliases: ["CARATULA_H"] },
  { key: "WEB", aliases: ["WEB"] },
  { key: "WOW", aliases: ["WOW"] },
  { key: "XIAOMI", aliases: ["XIAOMI"] },
  { key: "AMAZON_BG", aliases: ["AMAZON_BG"] },
  { key: "AMAZON_LOGO", aliases: ["AMAZON_LOGO"] },
  { key: "_PERFIL", aliases: ["_PERFIL"] },
  { key: "_SONY", aliases: ["_SONY", "SONY"] },
  { key: "DESTACADO_DOBLE1", aliases: ["DESTACADO_DOBLE1"] },
  { key: "DESTACADO_DOBLE1_SIL", aliases: ["DESTACADO_DOBLE1_SIL"] },
  { key: "DESTACADO_DOBLE2", aliases: ["DESTACADO_DOBLE2"] },
  { key: "DESTACADO_DOBLE2_SIL", aliases: ["DESTACADO_DOBLE2_SIL"] },
  { key: "DESTACADO_DOBLE4_SIL", aliases: ["DESTACADO_DOBLE4_SIL"] },
  { key: "DESTACADO_DOBLE4", aliases: ["DESTACADO_DOBLE4"] }
];

    /* Transformación AN → búsqueda indexada (longest-first) */
    const AI = AN
      .flatMap(({ key: k, aliases: a }) => a.map(t => ({ k, t })))
      .sort((a, b) => b.t.length - a.t.length);

    /* AN ampliado SOLO para inferencia tolerante (inferKey/diagnoseName).
       Añade las formas con "S" final (MOD_DESTACADOS*) que la regla
       estricta no acepta, para poder detectar la intención del usuario
       cuando comete ese typo. checkName sigue usando AN, no AN_INFERENCE. */
    const AN_INFERENCE = [
      ...AN,
      { key: "MOD_DESTACADOS1",     aliases: ["MOD_DESTACADOS1"] },
      { key: "MOD_DESTACADOS2",     aliases: ["MOD_DESTACADOS2"] },
      { key: "MOD_DESTACADOS3",     aliases: ["MOD_DESTACADOS3"] },
      { key: "MOD_DESTACADOS4",     aliases: ["MOD_DESTACADOS4"] },
      { key: "MOD_DESTACADOS1_SIL", aliases: ["MOD_DESTACADOS1_SIL"] },
      { key: "MOD_DESTACADOS2_SIL", aliases: ["MOD_DESTACADOS2_SIL"] },
      { key: "MOD_DESTACADOS3_SIL", aliases: ["MOD_DESTACADOS3_SIL"] },
      { key: "MOD_DESTACADOS4_SIL", aliases: ["MOD_DESTACADOS4_SIL"] }
    ];
    const AI_INFERENCE = AN_INFERENCE
      .flatMap(({ key: k, aliases: a }) => a.map(t => ({ k, t })))
      .sort((a, b) => b.t.length - a.t.length);

    /* Alias canónico (primer alias declarado en AN) para cada key.
       Lo usa diagnoseName al construir la sugerencia, para que el
       nombre propuesto use siempre la forma sin "S" aunque el usuario
       haya escrito MOD_DESTACADOS*. */
    const CANONICAL_ALIAS = new Map();
    for (const entry of AN) {
      CANONICAL_ALIAS.set(entry.key, entry.aliases[0]);
    }
    const canonicalAlias = k => CANONICAL_ALIAS.get(k) || k;

    /* Normalización tolerante para la detección del formato:
       - NFD + quita diacríticos → "FANÁRT" → "FANART", "ñ" → "n", "ç" → "c"
       - toUpperCase
       - todo lo no permitido (espacios, símbolos, guiones) → "_"
         (los aliases usan "_" como separador, así que tratamos "-" igual)
       Conserva "." para que la separación de extensión siga funcionando.
       NO sustituye a checkNameChars: la validación de caracteres es independiente.
    */
    function normalizeForMatch(s) {
      return String(s || "")
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .toUpperCase()
        .replace(/[^A-Z0-9_.]/g, "_")
        // Colapsar "_" consecutivos para que p.ej. "AD+_PAUSE" → "AD__PAUSE" → "AD_PAUSE"
        .replace(/_+/g, "_");
    }

    function checkName(n) {
  const u = normalizeForMatch(n);
  const dot = u.lastIndexOf(".");
  let base = dot > 0 ? u.slice(0, dot) : u;

  // Sufijo "_PUBLI" opcional: si está, se elimina antes de buscar el formato.
  // Así "MI_PELI_199_PUBLI" → "MI_PELI_199" → match "199",
  // "MI_PELI_MUX4_FONDO_PUBLI" → "MI_PELI_MUX4_FONDO" → match "MUX4_FONDO", etc.
  if (base.endsWith("_PUBLI")) {
    base = base.slice(0, -6);
  }

  // Regla única para todos los formatos (incluidos los _SIL):
  // el alias del formato debe aparecer COMPLETO y CONTIGUO al final del
  // nombre base, precedido de "_" y con al menos un carácter de contenido
  // antes de ese "_".
  // Estructura exigida: "NOMBRE_DE_CONTENIDO" + "_FORMATO" + ".ext"
  for (const { k, t } of AI) {
    if (k === "_PERFIL") continue; // _PERFIL se resuelve al final

    let i = -1;
    while ((i = base.indexOf(t, i + 1)) !== -1) {
      const next = i + t.length >= base.length ? "" : base[i + t.length];

      if (next !== "") continue;          // debe terminar el nombre base
      if (i < 2) continue;                 // al menos un carácter antes del "_"
      if (base[i - 1] !== "_") continue;   // separador previo obligatorio

      return k;
    }
  }

  // Fallback _PERFIL: al final del nombre base y con contenido antes
  const PERFIL = "_PERFIL";
  if (base.endsWith(PERFIL) && base.length - PERFIL.length >= 1) return "_PERFIL";

  return null;
}

    /* ==========================================
       NOMBRE SUGERIDO PARA FORMATOS QUE SÍ ENCAJAN (matched OK).
       Cuando checkName ha detectado el formato pero el nombre tiene
       caracteres prohibidos o extensión incorrecta, devolvemos el
       nombre ya normalizado (sin tildes/espacios/símbolos) con la
       extensión apropiada según RU[key].ext.
    ========================================== */
    function cleanSuggestion(filename, key) {
      const u = normalizeForMatch(filename);
      const dot = u.lastIndexOf(".");
      const base = dot > 0 ? u.slice(0, dot) : u;
      const origExtRaw = dot > 0 ? u.slice(dot + 1).toLowerCase() : "";
      const origExt = origExtRaw === "jpeg" ? "jpg" : origExtRaw;
      const rule = (typeof RU !== "undefined") ? RU[key] : null;
      const ext = (rule && rule.ext)
        ? String(rule.ext).toLowerCase()
        : origExt;
      return ext ? `${base}.${ext}` : base;
    }

    /* ==========================================
       DIAGNÓSTICO DE NOMENCLATURA
       Cuando checkName() falla, intenta inferir cómo debería haberse
       escrito el nombre y devuelve el nombre completo sugerido (string),
       o null si no se puede deducir nada.
    ========================================== */
    function diagnoseName(filename) {
      const u = normalizeForMatch(filename);
      const dot = u.lastIndexOf(".");
      let base = dot > 0 ? u.slice(0, dot) : u;
      const origExtRaw = dot > 0 ? u.slice(dot + 1).toLowerCase() : "";
      const origExt = origExtRaw === "jpeg" ? "jpg" : origExtRaw;

      // El "_PUBLI" al final del nombre es un sufijo OPCIONAL del formato.
      // Lo quitamos para el análisis y lo recordamos para volver a engancharlo
      // detrás del formato en la sugerencia.
      let hadPubli = false;
      if (base.endsWith("_PUBLI")) {
        base = base.slice(0, -6);
        hadPubli = true;
      }
      if (!base) return null;

      // Helper: construye el nombre sugerido con la extensión del formato
      // (RU[key].ext si existe) y, opcionalmente, el sufijo "_PUBLI".
      const buildSuggestion = (suggBase, key, withPubli) => {
        const rule = (typeof RU !== "undefined") ? RU[key] : null;
        const ext = (rule && rule.ext)
          ? String(rule.ext).toLowerCase()
          : origExt;
        const fullBase = withPubli ? `${suggBase}_PUBLI` : suggBase;
        return ext ? `${fullBase}.${ext}` : fullBase;
      };

      // Marcadores de versión/fase tipo "V1", "A1", "T10"... (1 letra + dígitos)
      const VERSION_RE = /^[A-Z]\d+$/;
      // Marcadores extra del dominio: abreviaturas posicionales, etc.
      const KNOWN_EXTRAS = new Set([
        "DCHA", "IZDA", "DER", "IZQ",
        "DERECHA", "IZQUIERDA",
        "ARR", "ABJ", "ARRIBA", "ABAJO"
      ]);
      const isExtra = seg => KNOWN_EXTRAS.has(seg) || VERSION_RE.test(seg);

      // 1) Patrón SIL en CUALQUIER parte de la base.
      //    Buscamos <silbase>(_<lo-que-sea>)?_SIL con contenido a la
      //    izquierda del silbase o a la derecha del _SIL (o ambos).
      //    Ej.: MOD_DESTACADO1_A1_SIL_TEST_VALIDATOR.png
      //    → "TEST_VALIDATOR_A1_MOD_DESTACADO1_SIL.png".
      //    Ej.: TEST_VALIDATOR_MOD_DESTACADO1_A1_SIL.png (caso ya existente)
      //    → "TEST_VALIDATOR_A1_MOD_DESTACADO1_SIL.png".
      {
        const SIL_MAP = [
          { key: "MOD_DESTACADOS1_SIL",  silAlias: "MOD_DESTACADO1_SIL",  bases: ["MOD_DESTACADO1", "MOD_DESTACADOS1"] },
          { key: "MOD_DESTACADOS2_SIL",  silAlias: "MOD_DESTACADO2_SIL",  bases: ["MOD_DESTACADO2", "MOD_DESTACADOS2"] },
          { key: "MOD_DESTACADOS3_SIL",  silAlias: "MOD_DESTACADO3_SIL",  bases: ["MOD_DESTACADO3", "MOD_DESTACADOS3"] },
          { key: "MOD_DESTACADOS4_SIL",  silAlias: "MOD_DESTACADO4_SIL",  bases: ["MOD_DESTACADO4", "MOD_DESTACADOS4"] },
          { key: "DESTACADO_DOBLE1_SIL", silAlias: "DESTACADO_DOBLE1_SIL", bases: ["DESTACADO_DOBLE1"] },
          { key: "DESTACADO_DOBLE2_SIL", silAlias: "DESTACADO_DOBLE2_SIL", bases: ["DESTACADO_DOBLE2"] },
          { key: "DESTACADO_DOBLE4_SIL", silAlias: "DESTACADO_DOBLE4_SIL", bases: ["DESTACADO_DOBLE4"] },
          { key: "MOD_N_SIL",            silAlias: "MOD_N_SIL",            bases: ["MOD_N", "MODULO_N"] }
        ];

        for (const item of SIL_MAP) {
          for (const baseAlias of item.bases) {
            let pos = -1;
            while ((pos = base.indexOf(baseAlias, pos + 1)) !== -1) {
              const prevChar = pos === 0 ? "" : base[pos - 1];
              if (prevChar !== "" && prevChar !== "_") continue;
              const baseEnd = pos + baseAlias.length;
              let silPos = baseEnd;
              let resolved = null;
              while ((silPos = base.indexOf("_SIL", silPos)) !== -1) {
                if (silPos < baseEnd) { silPos++; continue; }
                const silEndChar = silPos + 4 >= base.length ? "" : base[silPos + 4];
                if (silEndChar !== "" && silEndChar !== "_") { silPos++; continue; }
                const contentBefore = pos > 1 ? base.slice(0, pos - 1) : "";
                const between = base.slice(baseEnd, silPos); // "" o "_<lo-que-sea>"
                const after = base.slice(silPos + 4).replace(/^_+/, "");
                if (!contentBefore && !after) { silPos++; continue; }

                let content = "";
                if (contentBefore && after) content = `${contentBefore}_${after}`;
                else if (contentBefore) content = contentBefore;
                else if (after) content = after;

                const suggBase = `${content}${between}_${item.silAlias}`;
                resolved = buildSuggestion(suggBase, item.key, hadPubli);
                break;
              }
              if (resolved) return resolved;
            }
          }
        }
      }

      // 2) Buscar el alias más probable (longest-first como en AI_INFERENCE,
      //    que incluye también las formas con "S" final del MOD_DESTACADO*)
      for (const { k, t } of AI_INFERENCE) {
        if (k === "_PERFIL") continue;

        let pos = -1;
        let found = null;
        while ((pos = base.indexOf(t, pos + 1)) !== -1) {
          const prev = pos === 0 ? "" : base[pos - 1];
          const next = pos + t.length >= base.length ? "" : base[pos + t.length];
          if (prev !== "" && prev !== "_") continue;
          if (next !== "" && next !== "_") continue;
          found = { pos, prev, next };
          break;
        }
        if (!found) continue;

        const fPos = found.pos;
        const fNext = found.next;

        // Para la sugerencia siempre usamos el alias canónico (forma sin "S").
        const aliasCanon = canonicalAlias(k);

        // a) Formato al final pero sin nombre de contenido antes:
        //    no podemos reconstruir un nombre completo.
        if (fNext === "" && (fPos < 2 || base[fPos - 1] !== "_")) {
          return null;
        }

        // b) Formato al principio (con o sin "_" delante)
        if (fPos === 0 || (fPos === 1 && base[0] === "_")) {
          let after = base.slice(fPos + t.length).replace(/^_+/, "");

          // ¿"_PUBLI" justo después del alias? Lo tratamos como sufijo del formato.
          let localPubli = false;
          if (after === "PUBLI") { localPubli = true; after = ""; }
          else if (after.startsWith("PUBLI_")) { localPubli = true; after = after.slice(6); }

          // Extraemos los segmentos consecutivos al principio que parezcan
          // marcadores extra (versión tipo V1/A1 o abreviatura tipo DCHA/IZDA).
          // Esos marcadores van JUSTO DELANTE del formato; el resto es contenido.
          const segs = after.split("_").filter(Boolean);
          const extras = [];
          let i = 0;
          while (i < segs.length - 1 && isExtra(segs[i])) {
            extras.push(segs[i]);
            i++;
          }
          const content = segs.slice(i).join("_");
          const extrasStr = extras.join("_");

          const parts = [];
          if (content) parts.push(content);
          if (extrasStr) parts.push(extrasStr);
          parts.push(aliasCanon);
          const suggBase = parts.join("_");
          return buildSuggestion(suggBase, k, hadPubli || localPubli);
        }

        // c) Hay caracteres detrás del formato
        if (fNext === "_") {
          let trailing = base.slice(fPos + t.length);

          // ¿"_PUBLI" pegado al alias en la cola? Lo extraemos como sufijo del formato.
          let localPubli = false;
          if (trailing === "_PUBLI") { localPubli = true; trailing = ""; }
          else if (trailing.startsWith("_PUBLI_")) { localPubli = true; trailing = trailing.slice(6); }

          const contentBefore = base.slice(0, fPos - 1); // sin el "_" separador
          const suggBase = `${contentBefore}${trailing}_${aliasCanon}`;
          return buildSuggestion(suggBase, k, hadPubli || localPubli);
        }

        // d) Formato al final con contenido delante (el caso típico es
        //    un typo del alias: p.ej. MOD_DESTACADOS2 con "S"). Reescribimos
        //    con el alias canónico.
        if (fNext === "" && fPos >= 2 && base[fPos - 1] === "_") {
          const contentBefore = base.slice(0, fPos - 1);
          const suggBase = `${contentBefore}_${aliasCanon}`;
          return buildSuggestion(suggBase, k, hadPubli);
        }
      }

      // 3) Caso _PERFIL análogo
      const perfilIdx = base.indexOf("_PERFIL");
      if (perfilIdx !== -1) {
        const perfilEnd = perfilIdx + 7;

        if (perfilEnd < base.length) {
          if (perfilIdx === 0) {
            const after = base.slice(perfilEnd).replace(/^_+/, "");
            const suggBase = after ? `${after}_PERFIL` : "_PERFIL";
            return buildSuggestion(suggBase, "_PERFIL", hadPubli);
          }
          const trailing = base.slice(perfilEnd);
          const contentBefore = base.slice(0, perfilIdx);
          const suggBase = `${contentBefore}${trailing}_PERFIL`;
          return buildSuggestion(suggBase, "_PERFIL", hadPubli);
        }

        // _PERFIL al final pero sin contenido antes: no reconstruible
        if (perfilIdx === 0) {
          return null;
        }
      }

      return null;
    }

    /* ==========================================
       INFERENCIA TOLERANTE DEL FORMATO
       Devuelve el resultado estricto de checkName() o, si falla,
       el formato más probable (mismo análisis que diagnoseName pero
       sin generar mensajes). Lo usan dims/peso/extensión y los overlays
       para seguir funcionando aunque el nombre incumpla la regla.
    ========================================== */
    function inferKey(filename) {
      const strict = checkName(filename);
      if (strict) return strict;

      const u = normalizeForMatch(filename);
      const dot = u.lastIndexOf(".");
      let base = dot > 0 ? u.slice(0, dot) : u;
      if (base.endsWith("_PUBLI")) base = base.slice(0, -6);
      if (!base) return null;

      // Patrón SIL en CUALQUIER parte de la base.
      // Buscamos <silbase>(_<lo-que-sea>)?_SIL siempre que haya algo de
      // contenido a la izquierda del silbase o a la derecha del _SIL.
      const SIL_MAP = [
        { key: "MOD_DESTACADOS1_SIL",  bases: ["MOD_DESTACADO1", "MOD_DESTACADOS1"] },
        { key: "MOD_DESTACADOS2_SIL",  bases: ["MOD_DESTACADO2", "MOD_DESTACADOS2"] },
        { key: "MOD_DESTACADOS3_SIL",  bases: ["MOD_DESTACADO3", "MOD_DESTACADOS3"] },
        { key: "MOD_DESTACADOS4_SIL",  bases: ["MOD_DESTACADO4", "MOD_DESTACADOS4"] },
        { key: "DESTACADO_DOBLE1_SIL", bases: ["DESTACADO_DOBLE1"] },
        { key: "DESTACADO_DOBLE2_SIL", bases: ["DESTACADO_DOBLE2"] },
        { key: "DESTACADO_DOBLE4_SIL", bases: ["DESTACADO_DOBLE4"] },
        { key: "MOD_N_SIL",            bases: ["MOD_N", "MODULO_N"] }
      ];
      for (const item of SIL_MAP) {
        for (const baseAlias of item.bases) {
          let pos = -1;
          while ((pos = base.indexOf(baseAlias, pos + 1)) !== -1) {
            const prevChar = pos === 0 ? "" : base[pos - 1];
            if (prevChar !== "" && prevChar !== "_") continue;
            const baseEnd = pos + baseAlias.length;
            let silPos = baseEnd;
            while ((silPos = base.indexOf("_SIL", silPos)) !== -1) {
              if (silPos < baseEnd) { silPos++; continue; }
              const silEndChar = silPos + 4 >= base.length ? "" : base[silPos + 4];
              if (silEndChar !== "" && silEndChar !== "_") { silPos++; continue; }
              const contentBefore = pos > 1 ? base.slice(0, pos - 1) : "";
              const after = base.slice(silPos + 4).replace(/^_+/, "");
              if (!contentBefore && !after) { silPos++; continue; }
              return item.key;
            }
          }
        }
      }

      // Loop general (longest-first, usando AI_INFERENCE que incluye
      // las formas con "S" final para detectar la intención del usuario)
      for (const { k, t } of AI_INFERENCE) {
        if (k === "_PERFIL") continue;
        let pos = -1;
        while ((pos = base.indexOf(t, pos + 1)) !== -1) {
          const prev = pos === 0 ? "" : base[pos - 1];
          const next = pos + t.length >= base.length ? "" : base[pos + t.length];
          if (prev !== "" && prev !== "_") continue;
          if (next !== "" && next !== "_") continue;
          return k;
        }
      }

      // _PERFIL aparece en cualquier parte
      if (base.indexOf("_PERFIL") !== -1) return "_PERFIL";

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

    /* Normaliza una extensión a "jpg"/"png" (jpeg → jpg). */
    function normalizeExt(s) {
      const e = String(s || "").toLowerCase().replace(/^\./, "");
      return e === "jpeg" ? "jpg" : e;
    }

    /* Comprueba que la extensión del archivo coincide con la requerida por el formato.
       Devuelve { status: "ok"|"err"|"warn", msg } igual que checkDims / checkWeight.
    */
    function checkExt(filename, r) {
      const dot = String(filename || "").lastIndexOf(".");
      const ext = dot > 0 ? normalizeExt(filename.slice(dot + 1)) : "";

      if (!r || !r.ext) {
        return { status: "warn", msg: ext ? ext.toUpperCase() : "—" };
      }

      const req = normalizeExt(r.ext);
      const ok = ext === req;
      return {
        status: ok ? "ok" : "err",
        msg: ok
          ? req.toUpperCase()
          : `${ext ? ext.toUpperCase() : "?"} (req. ${req.toUpperCase()})`
      };
    }

    /* ==========================================
       VALIDACIÓN DE CARACTERES DEL NOMBRE
       Allowlist en la base: A-Z a-z 0-9 _ -
       Extensión: A-Z a-z 0-9
       Solo un punto, separando la extensión.
       Rechaza tildes, ñ, ç, espacios, símbolos, control chars,
       nombres reservados de Windows, etc.
       Devuelve { status: "ok"|"err", issues: [string, ...] }
    ========================================== */
    function checkNameChars(filename) {
      const s = String(filename || "");
      const issues = [];

      if (!s) {
        return { status: "err", issues: ["nombre vacío"] };
      }

      const lastDot = s.lastIndexOf(".");
      const base = lastDot > 0 ? s.slice(0, lastDot) : s;
      const ext  = lastDot > 0 ? s.slice(lastDot + 1) : "";

      // Más de un punto (el último ya separa la extensión)
      if (base.includes(".")) {
        issues.push("solo se permite un punto separador para la extensión");
      }

      // Inicio/fin con punto o espacio
      if (/^[.\s]/.test(s)) {
        issues.push("el nombre no puede empezar por punto o espacio");
      }
      if (/[\s.]$/.test(base)) {
        issues.push("el nombre no puede acabar en punto o espacio");
      }

      // Caracteres no permitidos en la base
      const badBase = new Set();
      for (const ch of base) {
        if (!/[A-Za-z0-9_\-]/.test(ch)) badBase.add(ch);
      }
      if (badBase.size) {
        const labels = [...badBase].map(c => {
          const code = c.charCodeAt(0);
          if (c === " ")  return '" " (espacio)';
          if (c === "\t") return '"\\t" (tabulador)';
          if (code < 0x20 || code === 0x7F) {
            return `"\\x${code.toString(16).padStart(2,"0")}" (carácter de control)`;
          }
          return `"${c}"`;
        });
        issues.push(`caracteres no permitidos: ${labels.join(", ")}`);
      }

      // Extensión: solo letras y dígitos
      if (ext) {
        const badExt = new Set();
        for (const ch of ext) {
          if (!/[A-Za-z0-9]/.test(ch)) badExt.add(ch);
        }
        if (badExt.size) {
          issues.push(
            `extensión con caracteres inválidos: ${[...badExt].map(c => `"${c}"`).join(", ")}`
          );
        }
      }

      // Nombres reservados de Windows
      const baseUp = base.toUpperCase();
      if (/^(CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])$/.test(baseUp)) {
        issues.push("nombre reservado del sistema (CON/PRN/AUX/NUL/COM*/LPT*)");
      }

      return { status: issues.length ? "err" : "ok", issues };
    }