# Entrega 0.3 — Cocina estable y táctil

## Resultado esperado

La versión 0.3 corrige las interacciones que todavía no coincidían con el uso real en cocina. Mantiene el documento continuo, la tipografía y las formas actuales. No incorpora comunicación directa con IA ni el paquete de prompts.

## Alcance cerrado

1. **Pendiente y Hecho**
   - verde culinario inequívoco;
   - botón visible y doble toque sobre la mitad derecha;
   - pulsación larga izquierda abre opciones;
   - el movimiento vertical cancela ambos gestos.
2. **Zona de widgets**
   - scroll horizontal autónomo;
   - reloj global más todos los temporizadores iniciados;
   - toque vuelve al paso y pulsación larga abre controles;
   - oscilación discreta durante los últimos cinco segundos.
3. **Navegación**
   - flechas recorren un paso por toque y repiten cada 1,2 segundos al mantener;
   - Recorrido oculta su cabecera al bajar y la recupera al subir;
   - desaparece la burbuja secundaria de información extra.
4. **Ingredientes**
   - lista total y agrupación por estación;
   - símbolo y color estable por ingrediente;
   - Disponible/Faltante persistente;
   - menciones coloreadas dentro de la receta, con señal roja adicional para faltantes.
5. **Marco Android**
   - pantalla inmersiva recuperada al abrir o volver a la aplicación;
   - cabecera propia oculta en horizontal;
   - giro automático como valor inicial e icono teléfono/candado;
   - notificaciones con Silenciar y Ver paso.
6. **Inicio local**
   - importación manual conservada;
   - hasta ocho recetas recientes validadas, privadas y locales.
7. **Lenguaje visual**
   - sombras interactivas de tinta negra;
   - color reservado a contenido, identidad y estado.

## Orden de implementación

1. Migrar el estado de sesión sin perder sesiones 0.2.
2. Separar los reconocedores de gestos por superficie.
3. Implementar widgets y navegación de temporizadores.
4. Añadir estado compartido de ingredientes y recientes.
5. Aplicar semántica cromática, sombras y composición horizontal.
6. Integrar acciones de notificación y reentrada al paso.
7. Compilar web y Android, ejecutar pruebas y actualizar el teléfono por ADB.

## Pruebas de aceptación

- Girar diez veces conserva el mismo paso, estados y relojes.
- Hacer scroll desde cada mitad de un paso no ejecuta atajos.
- Dos toques derechos alternan Pendiente/Hecho y un solo toque no cambia nada.
- Tres relojes pueden desplazarse horizontalmente sin cambiar a Ingredientes.
- Toque y pulsación larga en un reloj realizan acciones distintas.
- Una notificación permite silenciar o abrir su paso.
- Los últimos cinco segundos no desplazan ni deforman las cifras.
- Cerrar y volver a abrir conserva faltantes, recientes, porciones y temporizadores.
- La lista global y los grupos de mise muestran cantidades coherentes.
- 390×844 y 844×390 no presentan barras superpuestas ni controles fuera de alcance.

## Fuera de alcance

- Prompts versionados o comunicación directa con ChatGPT.
- Música, bóvedas remotas, sincronización y cuentas.
- Estados adicionales de opcionales y lista de compras avanzada.
