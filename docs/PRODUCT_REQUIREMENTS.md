# Requerimientos del producto

## Propósito

Mise convierte una receta ya decidida en ChatGPT en una superficie estable para cocinar. La conversación conserva su espontaneidad; la entrega final se vuelve un documento estructurado y local que no requiere servidor ni clave de API.

## Dispositivos y contexto

Los primeros equipos objetivo son Samsung Galaxy A55 y Poco X5 Pro. La posición principal es horizontal y la vista vertical conserva la misma receta, el mismo punto, marcas y relojes. La aplicación instalada ocupa la pantalla completa, admite cambiar de aplicación y funciona sin conexión con una receta ya importada.

## Flujo de una receta nueva

1. La persona elige y ajusta una receta en ChatGPT.
2. Dice «pasala a Mise» con el esquema y ejemplo adjuntos.
3. ChatGPT entrega un archivo `.mise.json` o un bloque delimitado.
4. Mise valida estructura, referencias y dudas antes de reemplazar la sesión.
5. La persona comienza dentro del documento por “Preparar antes de cocinar”, con equipo, cortes, mediciones, faltantes y decisiones sobre opcionales.
6. La persona cocina desde un documento completo de principio a fin.
7. Puede desplazarse libremente, usar el índice, marcar controles, iniciar relojes o escuchar una instrucción en cualquier orden.
8. La sesión se guarda después de cada cambio. Cerrar la receta queda en Opciones y no domina el flujo.

No hay cuenta, sincronización, generación integrada ni evaluación final en esta etapa. Inicio conserva localmente hasta ocho recetas recientes para poder volver a abrirlas sin buscar el archivo.

Inicio ofrece dos tareas principales: preparar ChatGPT y abrir una receta. La primera genera uno de cuatro perfiles configurables o un adaptador para un chat existente; ambas entregan un prompt y el JSON Schema compatible. La segunda reúne archivo, pegado, recientes y recetas precargadas.

## Interacción de cocina

- **Receta:** documento continuo con todos los pasos y desplazamiento vertical nativo.
- **Lienzo principal:** Cocina ocupa la superficie dominante y no se presenta como una tarjeta de paso dentro de un dashboard. Puede incorporar módulos contextuales sin perder la continuidad del documento.
- **Recorrido:** índice independiente con puntos de control que llevan a cualquier paso.
- **Ingredientes:** pestaña siempre disponible, cantidades para 1 a 12 personas y símbolos por familia.
- **Estados:** Pendiente y Hecho sirven como memoria; nunca bloquean, avanzan ni inician un cronómetro.
- **Información extra:** errores y rescates aparecen dentro del paso. Recorrido solo indica su existencia y no repite el contenido.
- **Zona de widgets:** franja horizontal independiente con el tiempo total y todos los temporizadores iniciados. Su desplazamiento nunca cambia de vista.
- **Cronómetro global:** comienza en 00:00 y solo se inicia al tocar EMPEZAR.
- **Audio:** lee una instrucción breve mediante una acción explícita.
- **Orientación:** un teléfono con candado fija o libera la orientación. El valor predeterminado es giro automático; al girar se conserva el paso enfocado.
- **Atajos de tarjeta:** mantener la mitad izquierda abre opciones; doble toque en la mitad derecha alterna la marca. El scroll cancela ambos gestos y los controles visibles permanecen.
- **Barra superior:** muestra únicamente el isotipo de Mise, la hora y la batería. La aplicación ocupa el área restante y no repite título, receta, música ni accesos que no requieran presencia constante.
- **Vistas laterales:** un swipe horizontal fuera de la zona de widgets cambia entre Cocina y funciones vecinas. La primera evolución prevista es un control de música; ninguna función futura reduce el área permanente de la receta.

En horizontal, Recorrido ocupa la columna izquierda y Receta la derecha; ambos se desplazan por separado. En vertical, Receta queda arriba, los relojes al centro y Recorrido abajo. El contenido y el estado son los mismos en ambas composiciones.

Los módulos de ingredientes, tiempo, señales, cuidados, rescates y paralelos aparecen únicamente cuando los datos del paso los justifican. Ausencia de un módulo significa ausencia de espacio reservado.

## Fiabilidad

- Sin sesión activa, la aplicación abre en silencio y no crea alarmas, sonidos ni solicitudes de permisos.
- Con sesión activa, la aplicación la recupera directamente y restaura pantalla completa.
- IndexedDB conserva una única sesión activa, posición, porciones, marcas, bloqueo de orientación y vencimientos.
- Los relojes guardan fechas absolutas y se reconstruyen al volver.
- Android programa notificaciones locales exactas para funcionar en segundo plano o con el proceso cerrado.
- Mise solicita notificaciones, alarmas exactas y, por separado, acceso para atravesar No molestar. El volumen de alarmas permanece bajo control del teléfono.
- Una importación inválida nunca reemplaza la sesión actual.
- Todo gesto de desplazamiento navega únicamente.

## Inicio y recetas locales

- Inicio permite importar una receta y consultar recetas recientes.
- Recientes guarda copias locales ya validadas y metadatos privados separados.
- Ninguna receta importada puede ejecutar HTML, scripts ni acciones de red.
- Una receta remota futura siempre se copia y valida antes de entrar en una sesión.
- Actualizar una bóveda nunca cambia silenciosamente una receta que ya se está cocinando.

## Ingredientes como estado compartido

- Ingredientes muestra una lista global y, debajo, los mismos insumos agrupados por estación de mise en place.
- Todos los nombres de ingredientes comparten un verde oscuro cercano a la tinta principal. El cuadrado que contiene su símbolo toma el color de la parte del plato a la que pertenece: principal, salsa, guarnición, ensalada, bebida, postre o terminación.
- Si un ingrediente está Faltante, el rojo reemplaza temporalmente el color de su cuadrado y se suma al texto y patrón de ausencia.
- Las menciones de ingredientes dentro de la receta son texto limpio: sin sombra, fondo, marcador ni adorno.
- Ingredientes admite Disponible y Faltante en esta versión. Faltante se comunica con rojo, texto y patrón además de color.
- En esta etapa los estados son informativos: pueden señalar pasos afectados, pero no reescriben la receta.
- Lista de compras muestra faltantes y opcionales elegidos pendientes.
- Un opcional elegido debe aparecer en el mise en place antes de su primer uso.

## Preparar la mesada

Una entrega válida pasa por una pantalla operativa, no por una vista técnica. Permite ajustar comensales, marcar ingredientes faltantes, revisar equipo, recorrido y avisos recuperables. Esos estados se conservan al entrar a Cocina. Los errores que impiden validar permanecen en Inicio con mensajes breves predefinidos.

## Jerarquía de controles

- La acción predominante de cada botón usa la misma sans condensada, gruesa y directa de los títulos. Descripciones, estados y ayudas continúan en la tipografía secundaria.
- La superficie del botón puede comunicar función o estado con color, pero su sombra es tinta negra.
- Ingredientes, bloqueo de orientación, Más y flechas de pasos son controles flotantes. Conservan una sombra cálida parcialmente translúcida para separarse del documento.

## Lectura

- El menú de cada paso ofrece Escuchar este paso y Leer desde aquí.
- La portada de la receta ofrece Leer receta completa.
- Una lectura continua crea un widget con pausa, reanudación, anterior, siguiente y detener.
- La candidata usa la voz española local disponible y no garantiza lectura con Mise cerrada.

## Evolución

- Bóvedas locales mediante acceso concedido explícitamente por la persona.
- Bóvedas en línea mediante adaptadores aislados y validación local.
- Control cómodo de la sesión multimedia del teléfono sin depender de una plataforma musical.
- Conexión local inspirada en KDE Connect para continuar, consultar o controlar una sesión desde otro dispositivo. Requerirá emparejamiento explícito, cifrado y permisos mínimos.
- Herramienta Lisp opcional y aislada para analizar grafos de recetas o experimentar con reglas de planificación. Queda en horizonte lejano, fuera del runtime, del formato obligatorio y de la ruta crítica de importación.

## Accesibilidad y ergonomía

- Controles táctiles de al menos 48 px.
- Texto esencial legible sin audio, color, pulsación larga ni hover.
- Contraste alto, foco visible y movimiento reducido cuando el sistema lo pide.
- La animación del reloj es sutil y comunica actividad sin exigir atención.
- Las señales describen vista, textura, aroma, sonido, sabor, tiempo o temperatura.
- Las cantidades usadas se muestran también dentro de cada paso.

## Criterios de aceptación

1. Importar el ejemplo y comenzar sin conexión.
2. Ver el mismo paso antes y después de girar.
3. Ir desde un punto de control al sector exacto de la receta.
4. Alternar Pendiente/Hecho sin mover el documento.
5. Iniciar dos relojes, salir, cerrar y recuperar sus vencimientos.
6. Cambiar porciones y consultar todas las cantidades.
7. Usar las funciones principales en 390×844 y 844×390.
8. Alternar Pendiente/Hecho con doble toque derecho sin interferir con el scroll.
9. Desplazar horizontalmente tres temporizadores activos sin abrir Ingredientes.
10. Tocar un widget para volver a su paso y mantenerlo para abrir controles.
