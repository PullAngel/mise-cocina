# Cómo se aplica el CLA en GitHub

Documento para quien mantiene el proyecto. Explica cómo se exige hoy la aceptación del [CLA](../CLA.md), qué mecanismo automático se recomienda y qué falta configurar a mano en GitHub.

## Estado actual

| Pieza | Estado |
| --- | --- |
| [`CLA.md`](../CLA.md) | Redactado como propuesta para revisión jurídica, con dos datos por completar |
| Aviso y casilla de aceptación en la [plantilla de pull request](../.github/pull_request_template.md) | Activo |
| Compuerta manual (ver abajo) | Activa: nadie fusiona un PR sin aceptación registrada |
| Automatización con GitHub Actions | **No activa.** No se pudo probar en este repositorio, así que no se incluyó un workflow que pudiera dar falsos positivos |
| Protección de rama que exija el check del CLA | **Pendiente de configurar a mano** |

## Compuerta manual (la que rige hoy)

1. La persona que contribuye comenta en el pull request, con exactamente estas palabras: **Leí el CLA de Mise Cocina y lo acepto.** La frase está definida en [`CLA.md`, §10](../CLA.md#10-cómo-se-acepta-y-cómo-se-registra) y debe ser idéntica.
2. Quien mantiene el proyecto comprueba que el comentario existe, que lo escribió el autor del PR y que está en el propio PR. Ese comentario, con usuario, fecha y hora, **es el registro de la aceptación**.
3. Etiqueta el PR como `cla: firmado` (las etiquetas `cla: pendiente` y `cla: firmado` ya existen en el repositorio) y recién entonces lo revisa para fusionar.
4. Si el PR tiene commits de varias personas, todas deben aceptar.
5. Las siguientes contribuciones de la misma persona quedan cubiertas mientras no cambie la versión del CLA, pero conviene etiquetarlas igual al revisarlas.

Un PR sin aceptación queda con `cla: pendiente` y no se fusiona.

## Mecanismo automático recomendado

Se evaluaron tres opciones:

| Opción | Ventajas | Desventajas |
| --- | --- | --- |
| **A. [CLA Assistant Lite](https://github.com/contributor-assistant/github-action)** (GitHub Action) | Sin servicio externo. Las firmas quedan como un archivo JSON en una rama del propio repositorio. Bloquea el PR con un check fallido hasta que se firma | Requiere una rama sin protección para guardar las firmas. Lo mantienen terceros: conviene fijar la acción por SHA |
| **B. CLA Assistant alojado** (cla-assistant.io) | Configuración rápida con la interfaz web | Servicio de terceros: pide permisos OAuth sobre el repositorio y guarda los datos de quienes firman en su propia plataforma |
| **C. Compuerta manual** | Cero dependencias | Depende de que quien mantiene el proyecto no se olvide de comprobarlo |

**Recomendación:** usar la opción A cuando se la haya probado con un PR real, y mientras tanto la opción C.

### Receta de la opción A

Los parámetros siguientes se verificaron contra el README oficial de la acción (v2.6.1). **No se probó en este repositorio**: no actives el workflow sin hacer antes la prueba descrita más abajo.

Guardalo como `.github/workflows/cla.yml`:

```yaml
name: "CLA Assistant"
on:
  issue_comment:
    types: [created]
  pull_request_target:
    types: [opened, closed, synchronize]

permissions:
  actions: write
  contents: write
  pull-requests: write
  statuses: write

jobs:
  CLAAssistant:
    runs-on: ubuntu-latest
    steps:
      - name: "CLA Assistant"
        if: (github.event.comment.body == 'recheck' || github.event.comment.body == 'Leí el CLA de Mise Cocina y lo acepto.') || github.event_name == 'pull_request_target'
        # v2.6.1, fijada por commit
        uses: contributor-assistant/github-action@ca4a40a7d1004f18d9960b404b97e5f30a505a08
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          path-to-signatures: "signatures/v1/cla.json"
          path-to-document: "https://github.com/PullAngel/mise-cocina/blob/main/CLA.md"
          branch: "cla-signatures"
          allowlist: PullAngel,dependabot[bot]
          custom-pr-sign-comment: "Leí el CLA de Mise Cocina y lo acepto."
```

Notas:

- La rama `cla-signatures` **no debe estar protegida**, porque la acción escribe ahí el archivo de firmas. **No crees el archivo JSON a mano**: eso hace fallar el workflow.
- `PERSONAL_ACCESS_TOKEN` solo hace falta si las firmas se guardan en otro repositorio. Acá se guardan en el mismo.
- La frase de `custom-pr-sign-comment` y la de la condición `if` deben ser **idénticas** a la de `CLA.md` (§10) y a la de `CONTRIBUTING.md`.
- `pull_request_target` corre con permisos de escritura sin ejecutar el código del PR. Por eso la acción de terceros se fija por SHA y no se agregan pasos que descarguen o ejecuten código del PR.

### Cómo probarla antes de exigirla

1. Con una cuenta de GitHub secundaria, abrí un PR de prueba sobre una rama de prueba.
2. Comprobá que aparece el comentario pidiendo firmar y que el check queda en rojo.
3. Comentá la frase exacta y verificá que el check pasa y que se crea `signatures/v1/cla.json` en la rama `cla-signatures`.
4. Probá un PR con commits de dos autores y otro con un commit con una línea de coautoría. Si la acción marca como «sin firmar» a un bot o a un coautor que no corresponde, agregalo a `allowlist` **solo si no es una persona que aporta código**.
5. Cuando el comportamiento sea el esperado, en *Settings → Branches* (o *Rulesets*) de `main`, exigí como *required status check* el check que aparezca en el PR de prueba. El nombre exacto del check no figura en el README de la acción: copialo desde el PR.

## Mantenimiento

- **Nueva versión del CLA:** actualizá `CLA.md` (número y fecha), cambiá `path-to-signatures` a una ruta nueva (por ejemplo `signatures/v2/cla.json`) para que todas las personas vuelvan a aceptar y, si la frase cambia, actualizala también en `CONTRIBUTING.md`.
- **Copias de seguridad:** el archivo de firmas vive en la rama `cla-signatures`. Hacé una copia periódica fuera de GitHub, porque es la prueba de las aceptaciones.
- **Bots y personas de confianza:** se gestionan en `allowlist`. No agregues a nadie que contribuya código sin haber firmado.
- **CLA corporativo:** las entidades firman el Anexo A de `CLA.md` por fuera de la automatización; agregá a sus usuarios autorizados a `allowlist` y guardá la copia firmada.

## Pendientes que requieren intervención manual

- Completar en [`CLA.md`](../CLA.md) la identificación del Titular (§1) y la ley aplicable y jurisdicción (§15).
- Probar y activar la automatización de la opción A, y recién entonces exigir su check en la protección de `main`.
- Hacer revisar el CLA y la transición de licencia por un profesional (ver la sección siguiente).

## Límites jurídicos para revisar con un profesional

- **Licencia no es cesión.** El CLA concede una licencia no exclusiva, amplia, transferible y sublicenciable. No da la propiedad ni licencias exclusivas sobre aportes ajenos. Para vender la titularidad completa del proyecto con exclusividad hará falta una cesión de derechos (CAA) u otro acuerdo con cada colaborador, o reescribir sus aportes.
- **Formalidades por jurisdicción.** Algunas leyes exigen formas o límites específicos para licenciar o ceder derechos de autor, y declaran irrenunciables ciertos derechos morales. El CLA no puede resolverlo por sí solo.
- **Código asistido por IA.** Varios commits del historial llevan una línea de coautoría de un asistente de IA. Conviene revisar con un profesional cómo se tratan la titularidad y la protección de esas partes en la jurisdicción que corresponda, porque de eso depende cuánto protege la licencia no comercial.
- **Esquema y prompts.** El esquema `mise.recipe` y los prompts están cubiertos por la misma licencia. Conviene decidir, con asesoramiento, si se quiere permitir herramientas comerciales compatibles con el formato mediante una licencia aparte.
- **Material de `design/stitch/`.** Son exportaciones de una herramienta externa; los términos de esa herramienta determinan qué se puede hacer con ellas.
- **Marca.** [`TRADEMARKS.md`](../TRADEMARKS.md) es una política de uso, no un registro de marca.
