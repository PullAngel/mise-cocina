# Licencia de Mise Cocina

Este documento explica en lenguaje llano qué permite la licencia del proyecto, a qué partes del repositorio se aplica y cómo se trataron las versiones publicadas antes bajo GPL. **Es una guía orientativa: el texto de [`LICENSE`](../LICENSE) es el que rige.**

## En una frase

Mise Cocina es **software con código fuente público** (*source-available*): podés leerlo, estudiarlo, usarlo, modificarlo y compartirlo para fines **no comerciales**. La explotación comercial queda reservada a quien mantiene el proyecto, salvo autorización expresa.

La licencia es la [PolyForm Noncommercial License 1.0.0](https://polyformproject.org/licenses/noncommercial/1.0.0) (SPDX: `PolyForm-Noncommercial-1.0.0`), publicada sin modificaciones. **No es una licencia Open Source en el sentido de la Open Source Initiative (OSI)**, porque restringe el uso comercial. Por eso este proyecto no se presenta como «open source».

## Qué podés hacer

- Consultar y estudiar el código fuente.
- Descargarlo, instalarlo y usarlo para fines no comerciales: uso personal, estudio, investigación, proyectos de afición, y uso por organizaciones benéficas, educativas, de investigación pública, de seguridad o salud públicas, de protección ambiental o instituciones de gobierno (como lo define la licencia).
- Modificarlo, adaptarlo y mejorarlo.
- Crear forks y desarrollar versiones independientes.
- Publicar y distribuir gratis tus propias modificaciones, siempre acompañadas de una copia de los términos de la licencia (o su URL) y de las líneas `Required Notice:` del archivo [`NOTICE`](../NOTICE).
- Proponer mejoras al proyecto original mediante pull requests (ver [`CONTRIBUTING.md`](../CONTRIBUTING.md) y [`CLA.md`](../CLA.md)).

## Qué no podés hacer sin autorización

- Vender Mise o una versión modificada, o comercializar forks, derivados o adaptaciones.
- Cobrar por licencias, acceso o funcionalidades de Mise.
- Incorporar Mise a un producto o servicio comercial.
- Usarlo con fines comerciales, incluso dentro de una empresa o para un servicio de pago.
- Cualquier otra explotación comercial que la licencia no permita.

Si querés usar Mise con fines comerciales, abrí un issue en el repositorio pidiendo coordinar una licencia comercial. Quien mantiene el proyecto puede otorgar licencias comerciales a terceros.

## Preguntas frecuentes

**¿Puedo usar Mise en mi cocina de casa?** Sí. Es uso personal.

**¿Puedo hacer un fork y publicarlo gratis?** Sí, conservando los términos y el aviso de copyright, y sin cobrar por él.

**¿Puedo cobrar por una versión modificada?** No.

**¿Puedo usarlo en mi trabajo?** Solo si el uso es no comercial en el sentido de la licencia. Un uso con fines comerciales requiere autorización.

**¿Y el esquema `mise.recipe` y los prompts?** Forman parte del repositorio y tienen la misma licencia: se pueden usar para crear herramientas, importadores o recetas compatibles **no comerciales**. Un uso comercial requiere autorización.

**¿Las recetas que genero con mi chatbot quedan bajo esta licencia?** No. Esta licencia cubre el software de Mise y los materiales del repositorio, no las recetas que armás vos con tu asistente.

## A qué partes del repositorio se aplica

| Parte | Tratamiento |
| --- | --- |
| `src/`, `schema/`, `prompts/`, `recipes/`, `examples/`, `scripts/`, `website/`, `docs/` y los archivos de la raíz | Código y materiales propios: **PolyForm Noncommercial 1.0.0** |
| `android/` | Los archivos propios, bajo PolyForm Noncommercial 1.0.0. El proyecto Gradle generado por Capacitor incluye componentes de terceros (ver más abajo) |
| `design/brand/` | Archivos del logotipo e íconos: copyright bajo PolyForm Noncommercial 1.0.0; el uso del nombre y la identidad se rige además por [`TRADEMARKS.md`](../TRADEMARKS.md) |
| `design/stitch/` y `mockups/` | Material de exploración de diseño conservado como referencia histórica. Las exportaciones de `design/stitch/` provienen de una herramienta externa (Google Stitch). No forman parte de la aplicación y **no se afirma titularidad ni garantía de derechos sobre ellas**; no las reutilices sin verificar |
| Dependencias y componentes de terceros | Conservan **sus licencias originales** (ver más abajo) |

## Componentes de terceros

La licencia de Mise **no sustituye ni modifica** las licencias de terceros:

- **Cascadia Mono** (fuente incluida en `src/assets/fonts/`): SIL Open Font License 1.1. El texto está en [`src/assets/fonts/CASCADIA-LICENSE.txt`](../src/assets/fonts/CASCADIA-LICENSE.txt).
- **Dependencias de npm** (React, React DOM, Capacitor, Ajv, Workbox y otras): al revisar el árbol de dependencias instalado el 2026-11-23, las licencias encontradas fueron MIT, ISC, Apache-2.0, BSD-2-Clause, BSD-3-Clause, BlueOak-1.0.0, 0BSD, MPL-2.0, Unlicense, CC0-1.0 y CC-BY-4.0, sin GPL, AGPL ni LGPL. Cada paquete conserva su licencia en `node_modules/` y en los metadatos de su publicación.
- **Android**: el proyecto de Capacitor, el *wrapper* de Gradle y las bibliotecas AndroidX se distribuyen bajo Apache-2.0 y MIT, según cada componente.

Si agregás una dependencia, comprobá que su licencia permita redistribuirla junto con una aplicación con esta licencia y declarala en tu pull request.

## Historial: versiones publicadas bajo GPL

Mise se publicó inicialmente bajo la **GNU General Public License v3.0 o posterior**. El texto se conserva en [`LICENSES/GPL-3.0-or-later.txt`](../LICENSES/GPL-3.0-or-later.txt).

| Versión | Fecha | Licencia |
| --- | --- | --- |
| [v0.4.1](https://github.com/PullAngel/mise-cocina/releases/tag/v0.4.1) | 2026-10-21 | GPL-3.0-or-later |
| [v0.5.0](https://github.com/PullAngel/mise-cocina/releases/tag/v0.5.0) | 2026-11-22 | GPL-3.0-or-later |
| Versiones posteriores | — | PolyForm Noncommercial 1.0.0 |

- El cambio es **prospectivo**: rige para el código y las versiones publicadas a partir del cambio. **No es retroactivo.**
- Quien recibió v0.4.1 o v0.5.0 conserva sobre esas versiones las condiciones de la GPL, incluidas las libertades que esa licencia concede (por ejemplo, redistribuirlas conforme a la GPL). Esas libertades no se revocan.
- El código nuevo escrito después del cambio, y las versiones publicadas con él, se ofrecen únicamente bajo PolyForm Noncommercial 1.0.0.
- Antes del cambio, todos los commits del repositorio figuran bajo la misma autoría (la cuenta de quien mantiene el proyecto): no se había incorporado ninguna contribución de colaboradores externos que requiriera un permiso adicional para cambiar de licencia.

## Contribuciones

Las contribuciones requieren aceptar un [Contributor License Agreement](../CLA.md). El colaborador conserva la titularidad de su aporte y concede al titular del proyecto los derechos necesarios para publicarlo bajo esta licencia y para explotarlo comercialmente. Detalles y límites jurídicos en [`CLA.md`](../CLA.md).
