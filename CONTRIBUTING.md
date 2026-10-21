# Contribuir a Mise Cocina

Gracias por ayudar a convertir recetas en herramientas de cocina más claras. Mise acepta mejoras de código, recetas, documentación, accesibilidad, diseño y pruebas en dispositivos reales.

## Antes de trabajar

1. Revisá el [mapa de documentación](docs/README.md) y el [roadmap](ROADMAP.md).
2. Buscá un issue existente o abrí uno para cambios de comportamiento amplios.
3. Mantené cada propuesta acotada a un problema verificable.
4. No incluyas recetas copiadas de libros, sitios o creadores sin permiso.

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

Al contribuir aceptás que tu aporte se publique bajo GPL-3.0-or-later y confirmás que tenés derecho a compartirlo.
