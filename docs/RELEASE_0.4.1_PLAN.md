# Mise 0.4.1 — corrección táctil y jerarquía visual

## Objetivo

Entregar una versión instalable que elimine cambios accidentales de Pendiente/Hecho al desplazar la receta y aplique de forma consistente el lenguaje visual ya aprobado.

## Alcance

1. El scroll cancela inmediatamente cualquier pulsación larga o candidato a doble toque.
2. Desplazarse puede cambiar el paso enfocado, pero no vibra ni modifica su estado.
3. El doble toque derecho solo se acepta si ambos contactos son breves, cercanos, pertenecen al mismo paso y el documento no se movió.
4. Los cuadrados con símbolo de ingredientes toman el color de la parte del plato indicada por `components[].role`. Faltante conserva prioridad roja.
5. Los nombres de ingredientes mantienen un único verde tinta; el color de componente no se propaga al texto.
6. Botones, widgets y superficies táctiles usan sombra negra. Ingredientes, orientación, Más y flechas son controles flotantes y conservan una sombra cálida translúcida.
7. El texto predominante de los botones usa la sans condensada, grande y pesada. La explicación secundaria conserva Cascadia Mono.
8. Inicio prioriza Abrir receta y coloca la preparación de ChatGPT como segundo camino. Conserva todas las funciones existentes.
9. Las flechas quedan alineadas con la columna de controles flotantes y el final del documento reserva espacio para ellas.

## Verificación

- Desplazar lentamente y con impulso sobre ambas mitades de cinco pasos sin cambios de estado ni vibración.
- Hacer doble toque derecho y comprobar exactamente una alternancia y una vibración.
- Intercalar toque, scroll y toque dentro de 320 ms y comprobar que no se marca.
- Revisar ingredientes globales y por estación en vertical y horizontal; deben aparecer varios pigmentos y Faltante en rojo.
- Revisar sombras y tipografía en Inicio, Preparar la mesada, Receta, Ingredientes y hojas de opciones.
- Ejecutar pruebas unitarias, compilación web nativa, sincronización de Capacitor y `assembleDebug`.

## Entrega

El APK se copia a `artifacts/Mise-Cocina-0.4.1.apk`. No se busca ni se instala automáticamente en ningún teléfono.
