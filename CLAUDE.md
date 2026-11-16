# CLAUDE.md — VALIDATOR (Validador de Adaptaciones Movistar+)

> Documento de traspaso. Lo escribe Claude para que otro Claude (sin acceso al
> historial de chats) pueda retomar el trabajo. Está en español porque el usuario
> trabaja en español. Antes de afirmar nada sobre el comportamiento del código,
> **verifícalo contra los archivos actuales**: este documento refleja el estado a
> fecha **2026-11-16** y el código puede haber cambiado.

---

## 1. Qué es y para quién

**VALIDATOR** (el `<title>` del HTML sigue diciendo "VALIDATOR 2.0"; la cabecera de
marca es "Adaptaciones M+") es una **aplicación web 100 % cliente** — HTML + CSS +
JavaScript puro, **sin backend, sin build, sin dependencias de Node**. Valida los
**assets gráficos (adaptaciones)** que el equipo de diseño entrega para Movistar+.

**Para quién / flujo de trabajo:** es la primera herramienta que construyó el
usuario y lleva **meses en producción** en la empresa, usada a diario y con muy
pocos bugs reportados. El equipo arrastra las imágenes adaptadas (carátulas,
fanarts, módulos destacados, banners MUX, Amazon/Fire TV, etc.), y la app:

1. **Detecta el formato a partir del nombre del archivo** (nomenclatura).
2. Valida **nomenclatura, dimensiones, peso y extensión** contra las reglas de cada formato.
3. Muestra un **visor** con el asset y **mockups/overlays contextuales** superpuestos
   (previsualización de cómo se verá en la UI real de Movistar+, zonas de seguridad,
   marcas dinámicas, etc.), con interruptores para activar/desactivar cada capa.
4. Permite **exportar una composición** (captura JPG del asset + mockup) y escribir
   **comentarios de revisión** (con comentarios predefinidos por categoría) que se
   exportan como informe.
5. Incluye una **herramienta de contraste WCAG 2.2** (lo más reciente): muestrea texto
   y fondo sobre la imagen y calcula el ratio de contraste, con informe exportable.

> **Trata los cambios con conservadurismo: es software vivo del que depende gente.**

Publicado con **GitHub Pages** en **https://lesbeziers.github.io/VALIDATOR/**.

---

## 2. Estructura de carpetas y archivos

```
V7 MAYO 2026/                      ← raíz del repo (working dir)
├── index.html                     ← única página; monta todo el DOM (368 líneas)
├── CLAUDE.md                      ← este documento
├── assets/
│   ├── css/
│   │   └── styles.css            ← TODO el CSS (1393 líneas), incl. estilos del modo contraste
│   ├── js/
│   │   ├── validation.js         ← reglas de formato: RU (dims/peso/ext), AN/DL (nombres), checkName/inferKey/diagnoseName
│   │   ├── app.js                ← UI principal, estado, comentarios/presets, EXPORT_CONFIG + exportComposition()
│   │   ├── overlays.js           ← render y posicionado de mockups/overlays sobre el visor (TRUTH, roles, fit*)
│   │   ├── contrast.js           ← módulo autocontenido de contraste WCAG 2.2 (muestreo, loupe, informe)
│   │   ├── jszip.min.js          ← librería (ZIP para exportar adjuntos/comentarios)
│   │   └── FileSaver.min.js      ← librería (guardar archivos en el navegador)
│   ├── fonts/                     ← fuente corporativa Apercu (black/bold/light/regular ±italic; eot/ttf/woff/woff2)
│   ├── img/
│   │   ├── Cabecera_Negra.svg/.jpg   ← cabecera de marca
│   │   ├── ic-back.svg / ic-side.svg / ic-B-N.svg  ← iconos de la UI (plegar panel, cambiar lado, fondo B/N)
│   │   ├── camara01.svg / camara02.svg
│   │   └── checkers/              ← PNG/JPG de mockups y "checkers" (zonas de seguridad) por formato
│   └── sonido/
│       └── rafaga_camara.mp3     ← sonido del botón de captura
└── .claude/
    ├── launch.json               ← config del servidor local de preview (python3 http.server 8765)
    └── settings.local.json       ← permisos locales de la sesión de Claude
```

### Orden de carga de scripts (en `index.html`, al final del `<body>`)
```
jszip.min.js → FileSaver.min.js → validation.js → app.js → overlays.js → contrast.js
```
El orden importa: `app.js` expone hooks globales (`window.__v19_*`) que `overlays.js` y
`contrast.js` consumen.

### Hooks globales (contrato entre módulos) — definidos en `app.js`
- `window.__v19_getMainPreviewImg()` → el `<img>` principal del visor (resolución natural).
- `window.__v19_getCurrentKey()` → clave del formato actual (p.ej. `"MUX4_FONDO"`).
- `window.__v19_addComment(text)` → añade una línea al bloque de comentarios.
- `window.__v19_contrast` → `{ enter, exit, toggle, isActive }` (expuesto por `contrast.js`).

---

## 3. Cómo se ejecuta / se usa

**No hay build ni dependencias que instalar.** Es estático. Opciones:

- **Producción:** GitHub Pages sirve la raíz del repo → https://lesbeziers.github.io/VALIDATOR/
- **Local (recomendado, por rutas relativas y fetch de imágenes):** servir con un
  servidor estático. Ya hay config en `.claude/launch.json`:
  ```
  python3 -m http.server 8765
  ```
  y abrir `http://localhost:8765/`. (Abrir `index.html` con `file://` puede fallar por
  CORS en algunas lecturas de canvas; usar siempre servidor.)
- **Preview de Claude:** usar las herramientas `preview_*` (hay permiso `preview_start`
  concedido en `settings.local.json`).

**Requisitos:** un navegador moderno. Las fuentes Apercu van embebidas en `assets/fonts/`.

### Despliegue (shipping)
Repo: **`https://github.com/Lesbeziers/VALIDATOR.git`** (ojo, **L** mayúscula). Rama por
defecto **`main`**. Auth HTTPS vía llavero de macOS (osxkeychain), sin SSH.

```
editar → git add <archivo concreto> → git commit → git push origin main
```
GitHub Pages redespliega solo en ~1–2 min. Verificar con el **contenido**, no solo el status:
```
curl -s https://lesbeziers.github.io/VALIDATOR/assets/js/app.js | grep <símbolo-nuevo>
```

> ⚠️ **Al hacer `git add`, añade SOLO los archivos que tocaste.** La carpeta local NO
> contiene `.gitignore` ni `robots.txt` que SÍ existen en el remoto; un `git add -A`
> los borraría y colaría basura de macOS (`._*`, `.DS_Store`). El `git status` al
> arrancar muestra muchos `._*` y `.DS_Store` como untracked: **no los commitees.**

---

## 4. Decisiones de diseño y convenciones (y por qué)

### Arquitectura
- **Sin framework, sin build, un solo HTML.** Decisión deliberada: herramienta interna,
  fácil de desplegar en GitHub Pages, fácil de mantener sin toolchain. Mantener esa
  simplicidad salvo necesidad real.
- **Separación por archivos JS por responsabilidad:** validación (reglas puras),
  app (UI/estado), overlays (render de mockups), contrast (módulo aislado). `contrast.js`
  se diseñó **autocontenido** para no tocar la lógica existente: solo consume los hooks
  `window.__v19_*`.

### Validación de nombres (`validation.js`)
- **`RU`** = reglas por formato: `w`/`h` (o `options[]` con `mode:"list"`), `maxMB`, `ext`.
- **`AN`** = lista de formatos válidos con sus `aliases`; **`DL`** = nombres "bonitos" para mostrar.
- **`checkName()` es estricto**: el alias del formato debe aparecer **completo, contiguo y al
  final** del nombre base, precedido de `_` y con contenido antes. Estructura exigida:
  `NOMBRE_DE_CONTENIDO_FORMATO.ext`. Sufijo **`_PUBLI`** opcional (se quita antes de buscar).
- **`inferKey()` / `diagnoseName()` son tolerantes**: usan `AN_INFERENCE` (incluye las
  formas con "S" final, p.ej. `MOD_DESTACADOS1`, que la regla estricta NO acepta) para
  **adivinar la intención** del usuario cuando hay un typo, y sugerir el nombre correcto
  con el **alias canónico** (forma sin "S"). Las dimensiones/peso/overlays usan `inferKey`
  para seguir funcionando aunque el nombre incumpla la regla; `checkName` sigue siendo el
  juez estricto de la nomenclatura.
- **`normalizeForMatch()`** quita tildes/ñ/ç, pasa a mayúsculas, convierte todo lo no
  permitido a `_` y colapsa `_` repetidos. **No** sustituye a `checkNameChars()`, que valida
  los caracteres reales del archivo (allowlist `A-Za-z0-9_-`, un solo punto, rechaza nombres
  reservados de Windows, etc.).
- `jpeg` se normaliza siempre a `jpg`.

### Overlays / mockups (`overlays.js`)
- **`TRUTH`** mapea cada formato → su PNG/JPG en `assets/img/checkers/`.
- Los overlays se posicionan con funciones `fit*` específicas (AD_PAUSE, Amazon, Web,
  Fanart móvil, Caratula, Smartphone MUX…) usando ratios calculados sobre el arte original.
- **Roles de capa** (clases CSS sobre los `<img>` overlay): `role-base`, `role-sib`,
  `role-logo`, `role-fanart-mod-l`, `role-fanart-mod-r`, `role-sph-zona`. El modo contraste
  decide qué roles conservar (ver abajo).
- Ajustes finos de posición son **constantes con nombre** al principio de las funciones
  (p.ej. `WEB_OFFSET_Y_RATIO`, `OFFSET_X/OFFSET_Y`, `SMARTPHONE_MUX_TXT_OVERLAY` en validation.js).

### Comentarios / presets (`app.js`)
- Comentarios **persistidos en `localStorage`** por nombre de archivo (`LS_KEY = "v15_comments"`,
  `LS_INJECT = "v15_comments_injected"`).
- **`PRESET_CATEGORIES`**: comentarios predefinidos agrupados (ADJUNTOS, TAMAÑO/PESO, DISEÑO,
  TEXTOS, NOMENCLATURAS, IMAGEN) — texto real en español, pensado para el equipo.

### Exportación de composición (`app.js`)
- **`EXPORT_CONFIG`** define capas por formato para la captura. Tiene entradas explícitas
  para `MUX4_FONDO`, `AD_PAUSE`, `FANART_DESTACADO`, y un **fallback** para el resto.
  Export JPG a calidad `0.92`.

### Herramienta de contraste (`contrast.js`) — decisiones clave
- **WCAG 2.2 únicamente.** Se barajó un desplegable WCAG 2 / APCA pero se **descartó** para
  simplificar. WCAG 2 es la referencia legal (EAA / Directiva (UE) 2019/882, obligatoria
  desde 28-jun-2025 → EN 301 549 → WCAG 2.1 AA; Movistar+ está en alcance).
- **Matemática oficial**: luminancia relativa sRGB, ratio `(L1+0.05)/(L2+0.05)`.
  Verificado: negro/blanco = 21; `#FFF` sobre `#6E7C6D` ≈ 4,41:1.
- **5 badges** (etiquetas en español, umbrales oficiales): `Texto normal AA` (4,5:1),
  `Texto normal AAA` (7:1), `Texto largo AA` (3:1), `Texto largo AAA` (4,5:1),
  `Gráficos AA y UI` (3:1). **`BASE_MIN = 4.5`** es el umbral de referencia para el número
  grande y el comentario.
- **Veredicto**: palabras **CORRECTO** (verde) / **INCORRECTO** (rojo). En fallo, el número
  grande se pone en rojo/salmón y los badges que fallan reciben fondo rosa.
- **Flujo (modo contraste in-viewport, no modal flotante):** el botón **CONTRASTE** de la
  sidebar hace **toggle** (se resalta en amarillo al estar activo). Pestañas
  **"Selecciona texto"** / **"Selecciona fondo"**; al muestrear el texto **auto-avanza** a
  fondo; se puede re-muestrear pulsando cualquiera de las dos. Marcadores ①/② sobre la imagen
  marcan los puntos muestreados. Hay un **loupe** (lupa) con coordenadas de la imagen original.
- **CRÍTICO — muestreo a resolución natural:** se muestrea del **bitmap original a tamaño
  natural** (canvas offscreen), mapeando la posición del cursor sobre la imagen escalada de
  vuelta a coords originales. **Nunca** del píxel mostrado (estaría interpolado). Funciona sin
  problemas de CORS porque las imágenes son data URLs locales.
- **`CONTENT_OVERLAYS`**: whitelist de qué overlays se CONSERVAN en modo contraste. Regla del
  usuario: *"conservar mockups, ocultar SIEMPRE las zonas de seguridad; AD_PAUSE y WEB = asset
  limpio (su mockup es externo/por debajo)"*. Lista actual:
  ```
  MUX4_FONDO [base+sib], SMARTPHONE_MUX_FONDO [base+sib], AMAZON_BG [base+logo],
  FANART_DESTACADO [base + fanart-mod-l/r], FANART [base], FANART_MOVIL [base],
  FANART_COLECCION [base], CARATULA_V [base], CARATULA_H [base]
  ```
  Todo lo demás = asset limpio (sin ningún overlay). Las carátulas conservan las **marcas
  dinámicas** (logo M+ + pastilla promo) para poder comprobar su legibilidad.
- **Al entrar** en modo contraste se fuerza **zona de seguridad OFF** pero se mantienen los
  overlays de contenido; se atenúan y deshabilitan los toggles de la barra inferior; se
  restaura el estado previo al salir.
- **Exportar informe** (botón del panel de contraste, distinto del "Exportar" del footer):
  genera `<nombre>_CONTRASTE.png` — imagen reducida CON los marcadores ①/② + par de colores
  (hex) + resultado WCAG. Debe incluir los marcadores para que el receptor vea exactamente
  qué dos puntos se muestrearon. Se renderiza con **supermuestreo x2** (`SS = 2`) y se exporta
  **PNG** para que el texto salga nítido (fix `a5f4988`).

---

## 5. Problemas conocidos, trucos y cosas que no funcionaron

- **No hacer `git add -A` / `git add .`.** Borraría `.gitignore` y `robots.txt` (están en el
  remoto pero no en local) y commitearía basura de macOS. Añadir archivo por archivo.
- **Verificar despliegue por CONTENIDO, no por status.** GitHub Pages puede devolver HTTP 200
  con contenido **cacheado/viejo** durante 1–3 min. Hacer `grep` de un símbolo nuevo en el
  archivo servido, no fiarse del 200.
- **`grep` en macOS/BSD:** no soporta alternación `\|`. Usar `-E` o greps separados.
- **Muestreo de contraste:** si alguna vez se lee el píxel del `<img>` mostrado en pantalla en
  lugar del canvas natural, los colores saldrán mal (interpolados). Mantener siempre el muestreo
  sobre el canvas a resolución natural.
- **APCA se evaluó y se descartó** como segunda escala: es WCAG 3 (borrador), no es exigencia
  legal todavía. Si se reabre, recordar que APCA usa polaridad (texto vs fondo importa) mientras
  que WCAG es simétrico.
- **`CONTENT_OVERLAYS` se afinó revisando TODAS las imágenes de `checkers/`.** Varios checkers
  (`APPLETV`, `199`, `CARTEL_COM_*`, `_PERFIL`, `_SONY`) son **márgenes/zonas de seguridad**
  (magenta sólido, círculos guía, rayas), no mockups → se ocultan. El **tamaño de archivo NO es
  indicador fiable** de si algo es mockup o margen (un margen de APPLETV pesa 270 KB). Si el
  usuario reporta que algún formato "simple" (IPLUS, WOW, TITULO_FICHA, MOD_*, DESTACADO_DOBLE_*)
  tiene en realidad un mockup contextual, moverlo a la whitelist.
- **El botón CONTRASTE debe decir exactamente "CONTRASTE"** (no "CHECK CONTRASTE"). El mockup
  de diseño original traía ese y otros typos ya corregidos (p.ej. el 4º badge es "Texto largo
  AAA", el mockup repetía "Texto largo AA").

---

## 6. Estado actual y tareas pendientes

### Estado
- **En producción y desplegado.** La herramienta de contraste WCAG 2.2 se fusionó a `main`
  (merge `aac4286`) y está **live** en GitHub Pages. Resolvió una petición que IT tenía en el
  backlog **2+ años** (su única respuesta hasta entonces era "usad estas dos webs externas").
- Últimos commits (rama `main`):
  ```
  a5f4988 fix(contraste): informe de exportación en alta calidad (supermuestreo x2 + PNG)
  50c6c69 fix(contraste): conservar mockup en FANART/FANART_MOVIL/FANART_COLECCION y marcas en CARÁTULA
  e507b70 fix(contraste): la zona de seguridad desaparece siempre en modo contraste
  aac4286 Merge feature/contraste: herramienta de contraste WCAG 2.2 + fix MUX
  a1850c0 feat(contraste): Etapa final — exportar informe de contraste
  ```
- El **árbol de trabajo tiene cambios locales sin commitear** (según `git status` de arranque):
  `.gitignore` y `robots.txt` aparecen como borrados (son los archivos solo-remoto — NO
  commitees ese borrado) y hay mucha basura `._*`/`.DS_Store` untracked (ignorar). Este
  `CLAUDE.md` es nuevo.

### Tareas pendientes / ideas abiertas
- **"Chuleta anti-farol" prometida:** una explicación en lenguaje llano (≈4 líneas) de qué
  significa cada número WCAG, para entregar al usuario **cuando la pida**. El usuario no domina
  la mecánica de WCAG y quiere algo simple.
- **Revisar `CONTENT_OVERLAYS`** si el usuario reporta que algún formato marcado como "asset
  limpio" debería conservar su mockup (ver §5).
- **El z-order de overlays de contenido para AD_PAUSE/AMAZON está simplificado** (AD_PAUSE se
  fuerza a solo-imagen por decisión del usuario). Posible mejora futura si se necesita fidelidad.

### Cómo trabaja el usuario (importante para la interacción)
- **Habla español.** Responde en español.
- **Dirige él el ritmo, UNA pregunta cada vez.** Le disgustan los mensajes largos con varias
  preguntas a la vez. Plantea las decisiones de diseño de una en una.
- Es el autor original de la herramienta; la cuida como software de producción. **Cambios
  conservadores**, verificar en el navegador antes de dar algo por bueno.
- Nota de contexto: el proyecto se está **migrando a otra cuenta de Claude** y la actual se
  cierra, por eso existe este documento (se pierde el historial de chats).
