# Contribuir a Mise Cocina

Gracias por ayudar a convertir recetas en herramientas de cocina más claras. Mise acepta mejoras de código, recetas, documentación, accesibilidad, diseño y pruebas en dispositivos reales.

## Licencia y CLA: lo primero que tenés que saber

Mise es **software con código fuente público** bajo la [PolyForm Noncommercial License 1.0.0](LICENSE). Podés estudiarlo, modificarlo y compartir tus versiones sin fines comerciales; la explotación comercial está reservada a quien mantiene el proyecto. El detalle está en [`docs/LICENSING.md`](docs/LICENSING.md).

Para que una contribución se incorpore al repositorio, tenés que aceptar el [Acuerdo de Licencia de Contribuciones (CLA)](CLA.md):

- **Seguís siendo la persona autora y titular** de tu aporte.
- Le concedés al titular del proyecto los derechos necesarios para publicarlo bajo la licencia del repositorio y para explotarlo comercialmente, también dentro de otros productos.
- Garantizás que tenés derecho a contribuirlo y que no infringe derechos de terceros.

### Cómo se acepta

Cuando abras tu primer pull request, comentá en él exactamente esta frase:

> Leí el CLA de Mise Cocina y lo acepto.

Queda registrado con tu usuario, la fecha y la hora. Cubre tus contribuciones siguientes mientras no cambie la versión del CLA. Si lo hacés en nombre de una empresa o tu empleador puede reclamar derechos sobre tu aporte, mirá el Anexo A del [CLA](CLA.md).

### Qué pasa si no lo aceptás

El pull request queda con la etiqueta `cla: pendiente` y **no se fusiona** hasta que se acepte el CLA. No hace falta cerrarlo ni volver a abrirlo: basta con dejar el comentario. Si preferís no aceptarlo, podés seguir usando y modificando Mise con tu fork bajo la licencia, pero tus cambios no se incorporarán al repositorio original.

Cómo se comprueba esto y cómo se mantiene está explicado en [`docs/CLA_SETUP.md`](docs/CLA_SETUP.md).

## Cómo proponer cambios

1. Revisá el [mapa de documentación](docs/README.md) y el [roadmap](ROADMAP.md).
2. Buscá un issue existente o abrí uno para cambios de comportamiento amplios.
3. Hacé un fork, creá una rama para tu cambio y abrí un pull request hacia `main`.
4. Mantené cada propuesta acotada a un problema verificable.
5. No incluyas recetas copiadas de libros, sitios o creadores sin permiso.

### Qué tiene que cumplir una contribución

- Resuelve un problema concreto y explica cómo lo verificaste.
- Pasa `pnpm test` y `pnpm run build`.
- Actualiza la documentación si cambia el comportamiento.
- **Declara los componentes de terceros** que incluya (nombre, autoría, enlace y licencia). No se aceptan componentes con licencias que impidan al titular licenciar comercialmente el proyecto.
- **Indica si una parte sustancial fue generada con inteligencia artificial** y confirma que podés contribuirla.

## Preparar el entorno

```bash
git clone https://github.com/PullAngel/mise-cocina.git
cd mise-cocina
pnpm install
pnpm dev
```

Antes de enviar un cambio:

```bash
pnpm test
pnpm run build
```

Los cambios Android deben ejecutar también `pnpm run android:sync` y, cuando el entorno lo permita, `android/gradlew.bat assembleDebug`.

## Reglas del producto

- `steps` es la fuente única del documento y del recorrido.
- Una receta no puede depender de haber leído el final para preparar un ingrediente opcional.
- Los temporizadores guardan una hora absoluta de vencimiento.
- Los gestos de scroll no pueden activar marcas ni háptica.
- El color comunica partes del plato y estados; no se guarda como estilo dentro del JSON.
- Una importación inválida no reemplaza la sesión activa.

Las decisiones nuevas se registran primero en `docs/PRODUCT_REQUIREMENTS.md` y luego en el documento visual o técnico correspondiente.

## Recetas y esquema

Una receta nueva debe validar contra `schema/mise-recipe.schema.json`, usar identificadores estables, incluir señales sensoriales útiles, anticipar ingredientes opcionales y distinguir componentes mediante `components[].role`.

## Pull requests

Explicá el problema, el comportamiento resultante y cómo lo verificaste. Incluí capturas únicamente cuando ayuden a revisar una decisión visual. Evitá mezclar refactors generales con una corrección pequeña.

El pull request lleva una casilla para confirmar que leíste y aceptás el CLA. La aceptación se registra con el comentario descrito arriba.
