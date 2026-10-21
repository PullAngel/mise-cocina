# DESIGN SYSTEM & GUÍA DE IMPLEMENTACIÓN: MISE CULINARIA
*Versión 2.0 — Sistema Salvia Mineral & Lino Puro (Optimizado para Cocina Activa & Visión a Distancia)*

---

## 1. Filosofía & Principios de Diseño
Mise no es un recetario estático ni una red social gastronómica; es una **cabina de aviónica culinaria para la mesada**. El usuario opera la interfaz a 1–2 metros de distancia, en un entorno con vapor, iluminación irregular, manos engrasadas, harina o apuro térmico.

1. **Visión a 1.5 metros (Glanceability instantánea):** El ojo del cocinero debe tardar menos de 800ms en identificar qué fuego atender, qué gramaje volcar y cuánto tiempo le resta a la reacción química en curso.
2. **Knuckle & Elbow Friendly (Ergonomía de contingencia):** Todos los botones primarios tienen targets mínimos de 56px de alto, bordes físicos diferenciados y separación generosa para poder ser pulsados con el nudillo, el codo o el dorso de la muñeca.
3. **Foco Asimétrico (Acción Dominante vs. Vigilancia Periférica):** El proceso térmico crítico (ej. sartén hirviendo o dorando) absorbe el 65% del peso visual. Los procesos pasivos o en paralelo (ej. arroz en reposo tapado, salsa emulsionada en bol) se vigilan periféricamente sin generar sobrecarga cognitiva.
4. **Semántica Sensorial sobre Tiempos Ciegos:** Los cronómetros son secundarios frente a las señales físicas organolépticas (*"Costra dorada ámbar • Despega sola sin resistencia mecánica"*).

---

## 2. Paleta Cromática (Tokens de Color)

El sistema utiliza la paleta **Salvia Mineral & Lino**, diseñada para evitar el reflejo sobre mesadas de acero inoxidable o cuarzo, reduciendo la fatiga ocular y maximizando el contraste de los datos críticos.

### 2.1 Colores Base & Superficies
| Token Tailwind | HEX | Rol de Uso |
| :--- | :--- | :--- |
| `bg-surface` / `surface-bg` | `#f1fcf5` | Fondo general de la aplicación. Salvia mineral desaturado y anti-reflejo. |
| `surface-container-lowest` | `#ffffff` | Fondo de tarjetas principales, paneles de acción inmediata y cronómetros. |
| `surface-container-low` | `#ebf6f0` | Contenedores secundarios, fondos de barras de estado superior e inferior. |
| `surface-container` | `#e2ede7` | Fondo de bloques pasivos (ej. reposo de arroz, salsa en espera). |
| `surface-container-high` | `#d8e4de` | Contenedores con elevación interactiva o hover de botones neutros. |
| `border-subtle` | `#1c2826` / `rgba(28,40,38,0.12)` | Filetes finos de definición estructural (1px a 1.5px). |
| `border-strong` | `#1c2826` | Bordes negros carbón vegetal para tarjetas de alta prioridad o neobrutalismo suave. |

### 2.2 Textos & Contraste
| Token | HEX | Contraste / Uso |
| :--- | :--- | :--- |
| `text-on-surface` | `#111a17` | Texto primario, titulares masivos y números colosales. Ratio > 12:1. |
| `text-muted` | `#4a5b54` | Subtítulos, metadatos, estaciones secundarias y etiquetas de fuego. |
| `text-dim` | `#758980` | Atajos de teclado, textos de pie de mesada y marcas pasivas. |

### 2.3 Acentos Semánticos & Acciones
| Token | HEX | Rol Culinario / Funcional |
| :--- | :--- | :--- |
| `action-primary` | `#c84218` | **Terracota Fuego Vivo:** Pulsador maestro de avance (*"LISTO: DAR VUELTA Y SELLAR"*). Máxima pregnancia. |
| `action-primary-hover` | `#ad3510` | Hover / toque activo en pulsador maestro. |
| `accent-amber` | `#df8214` | **Mostaza Maillard / Alerta:** Cápsula de gramaje colosal (`~200 g`), barras de costra y avisos sensoriales. |
| `accent-amber-bg` | `#fef6e9` | Fondo de cápsula de advertencia o gramaje (`bg-[#fef6e9] border-[#df8214]/40`). |
| `accent-emerald` | `#1b7a4b` | **Verde Hierba Fresca:** Estados estables (*"Hermético"*, *"Mesada Sincronizada"*, *"Punto 10/10"*). |
| `accent-emergency` | `#c22718` | **Alerta Crítica / Rescate:** Botón de auxilio térmico (*"¿Algo salió distinto?"*). |

---

## 3. Tipografía & Jerarquía de Escala

* **Familia Display & Números:** `Space Grotesk` (o monospace condensada / grotesca neutra con números tabulares `tabular-nums`).
* **Familia Lectura:** `Work Sans` / `Plus Jakarta Sans` para máxima legibilidad tipográfica en instrucciones de proceso.

### 3.1 Escala Tipográfica Normalizada
| Nivel | Tamaño / Leading | Tracking / Peso | Aplicación en Mise |
| :--- | :--- | :--- | :--- |
| `display-colossal` | `42px – 56px` / `1.0` | `-0.03em` • Bold 700 | Cronómetro en cuenta regresiva (`01:10`). |
| `headline-macro` | `26px – 32px` / `1.15`| `-0.02em` • Bold 700 | Acción térmica inmediata (*"Dorá la mitad del pollo en la sartén"*). |
| `badge-metric` | `20px – 24px` / `1.1` | `0em` • Bold 700 | Cápsula de gramaje colosal (`~200 g`). |
| `title-card` | `17px – 19px` / `1.25`| `-0.01em` • SemiBold 600 | Título de proceso paralelo (*"Arroz Jazmín"*, *"Salsa Ligadora"*). |
| `body-instructive`| `14px – 15px` / `1.4` | `0em` • Regular 400/500 | Descripción de técnica y señales sensoriales. |
| `label-badge` | `11px – 12px` / `1.0` | `+0.05em` • Bold 700 Caps | Badges de hornalla, tiempos y estado (`FUEGO ALTO [100%]`). |

---

## 4. Componentes Clave & Patrones Anatómicos

### 4.1 La Barra Superior de Cabina (App Header)
* **Altura:** `48px` a `52px`.
* **Componentes:**
  * Chip de Receta en curso con badge de raciones (`Pollo con salsa de ostras & arroz jazmín • 2 raciones`).
  * Indicador de voz activa / micrófono ambiental.
  * Botón de auxilio térmico rápido (`¿Algo salió distinto?`).

### 4.2 Tarjeta Maestra de Acción (Left Primary Hero)
* **Borde:** `1.5px` sólido `#1c2826` o `#d1ddd6` con radio `rounded-2xl`.
* **Píldoras de contexto técnico:** `SEC-03 • HORNALLA GRANDE`, `FUEGO ALTO [100%]`, `TANDA 01 / 02`.
* **Instrucción con Cápsula Gramada:** El titular resalta en un bloque `#fef4e6` con borde `#df8214` el gramaje exacto para que el usuario no dude si tirar todo el paquete o solo una porción.
* **Cronómetro Flotante / Embebido:** Dígitos colosales con barra de progreso de micro-segundos y botones knuckle de ajuste instantáneo (`+30s`, `-10s`, `Pausar`).
* **Micro-tarjeta de Señal Sensorial:** Ícono de llama/ojo con el axioma físico inapelable (*"Costra dorada ámbar • Despega sola sin resistencia"*).

### 4.3 Rail de Preparaciones Paralelas (Right Peripheral Rail)
* Divide las tareas en **Térmicas Pasivas** (ej. Arroz Jazmín reposando con cronómetro regresivo) y **Mise en Place Próxima** (ej. Salsa en bol para batir 5s antes de volcar).
* Se diseñan con contraste atenuado respecto a la sartén para no robar atención, pero con cronómetros legibles de reojo.

### 4.4 Barra de Ejecución y Avance (Knuckle Bottom Bar)
* **Botón Maestro de Paso:** Terracota `#c84218`, altura mínima `54px` a `60px`, tipografía mayúscula con glifo de check/flecha (`LISTO: DAR VUELTA Y SELLAR (PASO 04 →)`).
* **Botón Rescate Temporal:** `+30s` adyacente con tecla física o pulsador de 54px.
* **Feedback de Voz:** Píldora que avisa comandos escuchables (*Dí: "Mise, siguiente"*).

---

## 5. Matriz de Comportamiento Responsive

### 5.1 Smartphone Apaisado (844 × 390 px — "Modo Mesada Primario")
* **Layout:** Grid de 2 columnas asimétricas `grid-cols-12`.
  * **Columna Izquierda (7 o 8 cols / ~65%):** Cabina de acción inmediata. Título macro, cápsula de gramaje, cronómetro regresivo y botón colosal de avance.
  * **Columna Derecha (4 o 5 cols / ~35%):** Riel vertical con las 2 preparaciones secundarias (Arroz + Salsa) apiladas de forma compacta.
* **Altura:** `100vh` con scroll interno bloqueado (`overflow-hidden`) para que ningún control crítico quede oculto bajo el pliegue de pantalla mientras se cocina.

### 5.2 Tablet Apaisada (1024 × 768 px a 1280 × 800 px — "Modo Pantalla de Cocina / iPad")
* **Layout:** Arquitectura de 3 áreas balanceadas o 2 columnas holgadas con panel lateral expandido.
  * Mayor aire perimetral (`p-6` a `p-8`).
  * El cronómetro adopta tamaño display monumental (`64px`).
  * Inclusión de fotografía de referencia visual del punto de cocción o diagrama de calor de hornallas sin comprimir los datos numéricos.

### 5.3 Smartphone Vertical (390 × 844 px — "Modo Consulta en Mano")
* **Layout:** Flujo vertical lineal de arriba hacia abajo con sticky footer:
  1. Header de estado y receta en 48px.
  2. Hero de acción inmediata: titular macro + cápsula gramaje.
  3. Módulo de cronómetro activo con botones `+30s` y `Pausar`.
  4. Bloque sensorial Maillard destacado.
  5. Carrusel o lista colapsable de preparaciones en paralelo (Arroz reposando + Salsa lista).
  6. **Bottom Sticky Bar fija:** Pulsador masivo `LISTO: DAR VUELTA (PASO 04 →)` de ancho completo (100% width) fijado al borde inferior para disparo con el pulgar.

---

## 6. Reglas de Accesibilidad & Condiciones Límite
1. **Contraste Mínimo:** 7:1 en textos de instrucción y 12:1 en cronómetros.
2. **Sin interacción compleja:** Cero menús desplegables (dropdowns) en mitad del servicio. Cero gestos finos tipo swipe sensible o pinch-to-zoom.
3. **Persistencia de Pantalla:** La interfaz asume que la pantalla permanecerá encendida (Wake Lock API) durante todo el paso culinario activo.
