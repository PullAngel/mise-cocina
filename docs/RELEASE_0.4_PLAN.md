# Mise 0.4 — candidata para pruebas cotidianas

## Objetivo

Cerrar el recorrido desde ChatGPT hasta la cocina con una interfaz estable en vertical y horizontal. Esta entrega prioriza el uso diario y las pruebas con personas cercanas; las integraciones avanzadas quedan fuera.

## Entregables

1. Inicio compacto con dos tareas: preparar ChatGPT y abrir una receta.
2. Cuatro perfiles de Chef configurables mediante preguntas breves y un adaptador para chats culinarios existentes.
3. Paquete versionado compuesto por un prompt y el JSON Schema real de `mise.recipe` 1.2.
4. Doce recetas precargadas offline integradas en Inicio: cinco argentinas, dos venezolanas, una peruana, dos propuestas globales o de fusión y dos postres. Todas incluyen mise inicial, señales sensoriales, rescates, trabajo paralelo y criterios de conservación o recalentado.
5. Pantalla Preparar la mesada con porciones, ingredientes y avisos sencillos.
6. Navegación reversible entre Receta e Ingredientes.
7. Color por parte del plato en símbolos y bordes de pasos; Hecho conserva su verde.
8. Sombras negras en todos los botones y herramientas alineadas en un único riel derecho.
9. Lectura individual desde el menú del paso y lectura continua con controles en la zona de widgets.
10. Correcciones de desbordamiento, teclado y zonas seguras.

## Orden de implementación

1. Actualizar esquema, prompts y documentación.
2. Reorganizar Inicio y la transferencia de archivos.
3. Incorporar recetas precargadas.
4. Reconstruir Preparar la mesada.
5. Aplicar roles cromáticos y normalizar sombras.
6. Añadir lectura continua sencilla.
7. Verificar teléfono vertical, teléfono horizontal, rotación, importación y persistencia.

## Fuera de esta entrega

- voz propia descargable o idéntica entre dispositivos;
- lectura garantizada con Mise cerrada o el teléfono bloqueado;
- bóvedas de Obsidian o sincronización remota;
- diagnóstico avanzado o reparación automática de recetas;
- endurecimiento completo para publicación pública.

## Criterio de salida

La candidata se considera lista cuando no hay desplazamiento horizontal involuntario, los archivos del kit se pueden copiar o compartir, las recetas precargadas validan contra el esquema, los estados sobreviven a rotaciones y los temporizadores continúan funcionando al cambiar de aplicación.
