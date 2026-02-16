# Dockly — Brainstorm de Diseño

## Contexto
Portal informativo independiente sobre trabajo en cruceros para audiencia latinoamericana. Diseño dark/clean, profesional, serio y confiable. Sin marketing agresivo. Modo oscuro obligatorio.

---

<response>
## Idea 1: "Nautical Command Center"

<text>

### Design Movement
**Industrial Maritime Modernism** — Inspirado en los paneles de control de puentes de mando de buques, combinado con la estética de dashboards de ingeniería naval. Evoca autoridad técnica y precisión.

### Core Principles
1. **Precisión instrumental**: Cada elemento tiene un propósito claro, como los instrumentos de un puente de mando
2. **Jerarquía por contraste lumínico**: La información más importante "brilla" más, como indicadores en un panel oscuro
3. **Estructura modular**: Bloques de información organizados como módulos de un sistema de navegación
4. **Confianza a través de la sobriedad**: Sin adornos innecesarios, cada pixel justifica su existencia

### Color Philosophy
- Fondo principal: Azul marino profundo (#0B1426) — evoca la profundidad oceánica y la seriedad naval
- Superficies elevadas: Gris azulado oscuro (#131D2E) — cards y contenedores con sutil elevación
- Acento primario: Cyan apagado (#4A9EAF) — como la luz de instrumentos náuticos, guía sin deslumbrar
- Acento secundario: Ámbar tenue (#C4935A) — para alertas y elementos de atención, como luces de advertencia marítimas
- Texto principal: Blanco con opacidad (#E8ECF1) — legible sin ser agresivo
- Texto secundario: Gris azulado (#8B9BB4) — información complementaria

### Layout Paradigm
**Panel-based asymmetric layout**: Navegación lateral fija tipo sidebar en desktop que se colapsa en mobile. Contenido principal en columna amplia con sub-paneles. Las cards se organizan en grids asimétricos (2+1, 1+2) en lugar de grids uniformes. Cada página tiene un "header panel" con datos clave antes del contenido expandido.

### Signature Elements
1. **Líneas de borde luminosas**: Bordes superiores de cards con gradiente sutil cyan→transparente, simulando la iluminación de paneles
2. **Indicadores de estado**: Pequeños dots de color (verde, ámbar, rojo) para niveles de dificultad/entrada, como indicadores de sistemas
3. **Separadores con patrón de onda**: Líneas divisorias sutiles con forma de onda marina estilizada

### Interaction Philosophy
Transiciones precisas y controladas. Hover states que "iluminan" elementos como si activaras un interruptor. Scroll suave con elementos que aparecen con fade-in controlado. Sin animaciones excesivas — cada movimiento es intencional.

### Animation
- Fade-in escalonado de cards (stagger de 80ms)
- Hover: elevación sutil + brillo del borde superior
- Transiciones de página con fade cross de 200ms
- Indicadores de progreso en timeline con animación de pulso suave
- Sidebar con transición de slide de 250ms

### Typography System
- **Display/H1**: DM Sans Bold (700) — geométrica, moderna, con peso visual
- **H2/H3**: DM Sans SemiBold (600) — mantiene la familia para cohesión
- **Body**: Inter Regular (400) — máxima legibilidad en textos largos
- **Captions/Labels**: DM Sans Medium (500) uppercase con letter-spacing amplio — estilo técnico

</text>
<probability>0.06</probability>
</response>

---

<response>
## Idea 2: "Deep Ocean Editorial"

<text>

### Design Movement
**Dark Editorial Minimalism** — Inspirado en revistas digitales premium como Bloomberg Businessweek y The Verge, pero con la paleta cromática del océano profundo. Prioriza la tipografía como elemento visual dominante y el espacio negativo como herramienta de diseño.

### Core Principles
1. **Tipografía como arquitectura**: Los títulos son elementos visuales tan importantes como cualquier imagen
2. **Espacio negativo activo**: El vacío no es ausencia, es respiración visual que genera confianza
3. **Contenido como protagonista**: El diseño se subordina al mensaje, nunca lo opaca
4. **Ritmo editorial**: Alternancia entre bloques densos y espacios abiertos, como las páginas de una revista

### Color Philosophy
- Fondo base: Negro suave (#0A0E17) — profundidad sin ser opresivo, como el océano de noche
- Superficie: Carbón azulado (#12161F) — elevación sutil para cards
- Acento único: Teal oceánico (#2DD4A8) — un solo color de acento para máximo impacto, evoca bioluminiscencia marina
- Bordes: Blanco al 6% de opacidad — separación invisible pero perceptible
- Texto hero: Blanco puro (#FFFFFF) — solo para títulos principales
- Texto body: Gris cálido (#B8BCC8) — lectura prolongada sin fatiga
- Texto muted: Gris medio (#6B7280) — metadata y labels

### Layout Paradigm
**Vertical editorial flow**: Navegación top minimalista. Contenido en columna central estrecha (max 720px) para texto largo, expandible a full-width para grids de cards. Secciones separadas por grandes bloques de espacio (120px+). Hero sections con tipografía oversized. Sin sidebar — todo fluye verticalmente como un artículo largo.

### Signature Elements
1. **Tipografía oversized en heroes**: Títulos de 4-6rem que dominan la pantalla, con peso visual extremo
2. **Líneas horizontales finas**: Reglas tipográficas (1px, opacidad baja) que estructuran el contenido como en una publicación editorial
3. **Números grandes decorativos**: En listas y timelines, números de gran tamaño en opacidad baja como elemento visual de fondo

### Interaction Philosophy
Minimalista y elegante. Hover states sutiles con cambio de opacidad. Links que revelan underline en hover. Cards que se elevan imperceptiblemente. La interacción sugiere, no grita. Scroll-triggered reveals lentos y suaves.

### Animation
- Títulos que aparecen con slide-up + fade (400ms, ease-out)
- Cards con fade-in al entrar en viewport (IntersectionObserver)
- Hover en cards: translate-y -2px + sombra expandida (150ms)
- Números decorativos con fade-in retrasado respecto al contenido
- Transiciones de página con opacity fade (300ms)

### Typography System
- **Display/H1**: Playfair Display Bold (700) — serif con carácter, contraste dramático contra el fondo oscuro
- **H2**: Playfair Display SemiBold (600) — mantiene la elegancia editorial
- **H3/Subtítulos**: Source Sans 3 SemiBold (600) — sans-serif que complementa sin competir
- **Body**: Source Sans 3 Regular (400) — excelente legibilidad en pantalla, diseñada para texto largo
- **Labels/Meta**: Source Sans 3 Medium (500) uppercase, letter-spacing 0.05em

</text>
<probability>0.08</probability>
</response>

---

<response>
## Idea 3: "Midnight Compass"

<text>

### Design Movement
**Scandinavian Dark Functionalism** — Inspirado en el diseño escandinavo aplicado a interfaces oscuras. Combina la funcionalidad nórdica con la profundidad visual del modo oscuro. Piensa en la estética de apps como Linear, Raycast o Vercel — donde cada elemento existe por una razón y la belleza emerge de la función.

### Core Principles
1. **Funcionalidad elegante**: Cada componente resuelve un problema de forma bella
2. **Micro-detalles que suman**: Bordes redondeados consistentes, sombras calibradas, espaciado matemático
3. **Claridad absoluta**: El usuario nunca debe preguntarse "¿qué significa esto?"
4. **Calidez en la oscuridad**: El modo dark no tiene que ser frío — toques cálidos humanizan

### Color Philosophy
- Fondo: Gris casi negro (#09090B) — neutro, sin tinte azul dominante
- Superficie nivel 1: (#141417) — cards principales
- Superficie nivel 2: (#1C1C21) — elementos anidados
- Acento primario: Azul slate (#6366F1) — confiable, profesional, no genérico
- Acento cálido: Naranja apagado (#F59E0B al 80%) — para badges y highlights, aporta calidez
- Éxito/Positivo: Verde sage (#22C55E al 80%) — para indicadores positivos
- Texto primario: (#FAFAFA) — casi blanco, cálido
- Texto secundario: (#A1A1AA) — zinc-400, neutro
- Bordes: (#27272A) — zinc-800, definidos pero sutiles

### Layout Paradigm
**Card-centric modular grid**: Navegación superior sticky con blur backdrop. Contenido organizado en cards con padding generoso (24-32px). Grid responsivo que alterna entre 1, 2 y 3 columnas según el contenido. Cada sección tiene un header claro con descripción. Uso de tabs y accordions para comprimir información densa sin perder accesibilidad.

### Signature Elements
1. **Glassmorphism sutil en nav**: Navbar con backdrop-blur y fondo semi-transparente que revela el scroll
2. **Badge system**: Pequeños badges con colores semánticos para categorizar (nivel de entrada, departamento, tipo de requisito)
3. **Iconografía consistente**: Lucide icons en tamaño uniforme (20px) con color muted, acompañando cada sección

### Interaction Philosophy
Responsiva e inmediata. Feedback visual instantáneo en cada interacción. Hover states con transiciones de 150ms. Focus states visibles para accesibilidad. Tooltips informativos en elementos que necesitan contexto adicional. Smooth scroll entre secciones.

### Animation
- Page load: stagger fade-in de secciones (60ms delay entre cada una)
- Cards: scale(1.01) + shadow expansion en hover (150ms ease)
- Accordions: height animation con spring physics (framer-motion)
- Nav: backdrop-blur que aumenta con scroll
- Timeline steps: slide-in desde la izquierda al entrar en viewport
- Badges: subtle pulse en elementos importantes

### Typography System
- **Display/H1**: Outfit Bold (700) — geométrica moderna, limpia, con personalidad sin ser excéntrica
- **H2/H3**: Outfit SemiBold (600) — cohesión familiar
- **Body**: Outfit Regular (400) — sorprendentemente legible para texto largo, mantiene la cohesión
- **Mono/Data**: JetBrains Mono (para tablas de salarios y datos técnicos) — claridad en números
- **Labels**: Outfit Medium (500) — versátil para UI elements

</text>
<probability>0.07</probability>
</response>
