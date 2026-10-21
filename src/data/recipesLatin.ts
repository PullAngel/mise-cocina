import type { MiseRecipe } from "../types";
import { makeRecipe as recipe, makeStep as step } from "./recipeFactory";

export const latinRecipes: MiseRecipe[] = [
  recipe(
    "arepas-reina",
    "Arepas reina pepiada con palta y pollo",
    "Arepas doradas y tiernas con un relleno fresco, cremoso y cítrico, adaptado a productos fáciles de conseguir en Argentina.",
    4,
    [["main", "Arepas", "main"], ["filling", "Reina pepiada", "garnish"], ["topping", "Terminación fresca", "topping"]],
    [
      ["harina", "harina de maíz precocida", 300, "g", "grain"], ["agua", "agua", 420, "ml", "liquid"],
      ["pollo", "pollo cocido", 350, "g", "protein"], ["palta", "paltas", 2, "unidades", "vegetable"],
      ["mayonesa", "mayonesa", 2, "cdas", "fat"], ["limon", "limón", 1, "unidad", "vegetable"],
      ["verdeo", "verdeo", 1, "unidad", "vegetable"], ["cilantro", "cilantro o perejil", 2, "cdas", "vegetable", true],
      ["aceite", "aceite neutro", 1, "cda", "fat", false, "fixed"], ["sal", "sal", 1, "cdta", "seasoning"]
    ],
    [
      step("mise", "filling", "Preparar relleno y masa", "Desmenuzá pollo, picá verdeo y hierbas, exprimí limón y reservá una palta sin cortar hasta el final.", [["pollo", 350, "g"], ["verdeo", 1, "unidad"], ["cilantro", 2, "cdas"], ["limon", 1, "unidad"]], "Antes de hidratar la harina.", "Los elementos del relleno están fríos y listos.", { avoid: ["No cortes ambas paltas al principio: una parte se oxidará."] }),
      step("hidratar", "main", "Hidratar la harina", "Disolvé sal en agua, agregá harina en lluvia y mezclá con la mano abierta. Reposá.", [["agua", 420, "ml"], ["harina", 300, "g"], ["sal", 1, "cdta"]], "El agua está a temperatura ambiente.", "La masa es húmeda, suave y no deja harina seca.", { seconds: 300, depends: ["mise"], rescues: [["Se agrieta al apretarla", "Agregá agua de a una cucharada y esperá un minuto."], ["Está pegajosa", "Sumá una cucharada de harina y dejá hidratar."]] }),
      step("formar", "main", "Formar las arepas", "Dividí en cuatro, hacé bolas y aplastá hasta 1,5 cm, cerrando grietas con dedos húmedos.", [], "La masa terminó de reposar.", "Los discos tienen espesor parejo y bordes cerrados.", { depends: ["hidratar"], avoid: ["Muy gruesas quedan crudas; muy finas no admiten relleno."] }),
      step("dorar", "main", "Dorar las caras", "Aceitá apenas la sartén y cociná sin mover hasta formar costra. Girá una sola vez.", [["aceite", 1, "cda"]], "La sartén está caliente sin humear.", "Ambas caras muestran costra dorada y se despegan fácilmente.", { heat: "medio", seconds: 720, depends: ["formar"], parallel: ["base-relleno"] }),
      step("base-relleno", "filling", "Hacer la base cremosa", "Pisá una palta con mayonesa, parte del limón y sal. Mezclá con pollo y verdeo sin triturar las fibras.", [["palta", 1, "unidad"], ["mayonesa", 2, "cdas"], ["limon", 0.5, "unidad"]], "Las arepas están dorándose.", "El pollo queda ligado y jugoso, no convertido en pasta.", { depends: ["mise"], parallel: ["dorar"], rescues: [["El pollo está seco", "Agregá caldo frío o más palta de a cucharadas."]] }),
      step("terminar-arepas", "main", "Cocinar el centro", "Bajá el fuego, tapá y terminá las arepas. Destapá el último minuto para secar la costra.", [], "Las dos caras están doradas.", "Suenan huecas al golpearlas y el borde está firme.", { heat: "bajo", seconds: 600, depends: ["dorar"], parallel: ["terminar-relleno"], cues: [["sound", "Al golpear la base suenan huecas."], ["texture", "El borde está firme y la corteza seca."]] }),
      step("terminar-relleno", "filling", "Terminar la reina pepiada", "Cortá la palta restante en cubos e incorporala con hierbas. Ajustá limón, sal y pimienta.", [["palta", 1, "unidad"], ["limon", 0.5, "unidad"]], "La base de pollo está ligada.", "Se distinguen cubos de palta y el sabor es fresco, cremoso y cítrico.", { depends: ["base-relleno"], parallel: ["terminar-arepas"], avoid: ["Mezclá con espátula para no deshacer toda la palta."] }),
      step("abrir", "main", "Reposar y abrir", "Reposá dos minutos. Abrí cada arepa como bolsillo sin separar por completo las tapas.", [], "Las arepas están cocidas.", "Sale vapor y la miga está húmeda pero sin masa cruda.", { seconds: 120, depends: ["terminar-arepas"], rescues: [["El centro sigue pastoso", "Volvé a tapar a fuego mínimo tres minutos por lado."]] }),
      step("rellenar", "topping", "Rellenar y servir", "Rellená justo antes de comer y terminá con hierbas o gotas de limón.", [], "Arepas tibias y relleno frío están listos.", "La costra sigue seca y el relleno queda contenido.", { depends: ["abrir", "terminar-relleno"] })
    ],
    ["bol", "sartén pesada con tapa", "espátula", "cuchillo"],
    { decisions: ["Parte de la palta liga y parte queda en cubos", "Las arepas se doran y terminan tapadas"], storage: "Guardar arepas y relleno separados; cubrir el relleno en contacto.", reheat: "Recalentar las arepas solas y rellenar al final." }
  ),

  recipe(
    "pabellon",
    "Pabellón criollo accesible",
    "Carne mechada jugosa, porotos negros cremosos, arroz suelto y banana caramelizada con productos fáciles de conseguir en Argentina.",
    4,
    [["main", "Carne mechada", "main"], ["beans", "Porotos negros", "sauce"], ["rice", "Arroz blanco", "garnish"], ["banana", "Banana caramelizada", "topping"]],
    [
      ["carne", "roast beef", 650, "g", "protein"], ["porotos", "porotos negros cocidos", 500, "g", "vegetable"],
      ["arroz", "arroz largo fino", 280, "g", "grain"], ["banana", "bananas firmes", 2, "unidades", "vegetable"],
      ["cebolla", "cebollas", 2, "unidades", "vegetable"], ["morron", "morrón rojo", 1, "unidad", "vegetable"],
      ["ajo", "ajo", 3, "dientes", "seasoning"], ["tomate", "tomate triturado", 200, "g", "vegetable"],
      ["comino", "comino", 1, "cdta", "seasoning"], ["mascabo", "azúcar mascabo", 1, "cdta", "seasoning", true],
      ["aceite", "aceite neutro", 3, "cdas", "fat", false, "fixed"], ["sal", "sal y pimienta", "a gusto", "", "seasoning"]
    ],
    [
      step("mise", "main", "Ordenar las cuatro partes", "Cortá cebolla y morrón, picá ajo, enjuagá arroz y escurrí porotos. Separá la cebolla de carne, porotos y sofrito.", [["cebolla", 2, "unidades"], ["morron", 1, "unidad"], ["ajo", 3, "dientes"], ["arroz", 280, "g"], ["porotos", 500, "g"]], "Antes de encender las hornallas.", "Cada parte tiene sus ingredientes separados.", { avoid: ["No mezcles las cebollas: entran en preparaciones distintas."] }),
      step("cocer-carne", "main", "Ablandar la carne", "Cubrí apenas la carne con agua, media cebolla y sal. Cociná con hervor muy suave.", [["carne", 650, "g"], ["cebolla", 0.5, "unidad"]], "La carne está en una olla de tamaño justo.", "Dos tenedores separan las fibras sin esfuerzo.", { heat: "bajo", seconds: 5400, depends: ["mise"], parallel: ["porotos"], avoid: ["No tires el caldo: devuelve jugosidad."] }),
      step("porotos", "beans", "Volver cremosos los porotos", "Dorá parte de la cebolla con ajo y comino. Sumá porotos y caldo; pisá solo una parte y reducí.", [["cebolla", 0.25, "unidad"], ["ajo", 1, "diente"], ["comino", 0.25, "cdta"], ["aceite", 1, "cda"], ["mascabo", 1, "cdta"]], "La carne ya se cocina.", "Hay salsa cremosa alrededor de granos todavía enteros.", { heat: "bajo", seconds: 900, depends: ["mise"], parallel: ["cocer-carne"], rescues: [["Quedaron pastosos", "Aflojá con caldo caliente y mezclá lo mínimo."], ["Saben planos", "Ajustá sal, comino y apenas mascabo, en ese orden."]] }),
      step("arroz", "rice", "Cocer el arroz", "Cociná con tu proporción habitual de agua y sal. Reposá tapado y soltá con tenedor.", [["arroz", 280, "g"]], "Faltan unos treinta minutos para servir.", "Los granos están tiernos, separados y sin agua libre.", { heat: "bajo", seconds: 1080, depends: ["mise"], parallel: ["sofrito"], avoid: ["No lo revuelvas durante la cocción."] }),
      step("desmechar", "main", "Desmechar y guardar caldo", "Retirá la carne, colá y reservá caldo. Separala en fibras medianas, descartando grasa dura.", [], "La carne cede con tenedores.", "Las fibras conservan longitud y jugosidad.", { depends: ["cocer-carne"], avoid: ["Muy fina se seca al volver a la sartén."] }),
      step("sofrito", "main", "Concentrar el sofrito", "Dorá cebolla restante y morrón. Sumá ajo y comino; incorporá tomate y reducí.", [["cebolla", 1.25, "unidades"], ["morron", 1, "unidad"], ["ajo", 2, "dientes"], ["comino", 0.75, "cdta"], ["tomate", 200, "g"], ["aceite", 1, "cda"]], "La carne está desmechada.", "El tomate perdió agua y el sofrito está espeso y fragante.", { heat: "medio", seconds: 900, depends: ["desmechar"], parallel: ["arroz"] }),
      step("integrar-carne", "main", "Devolver jugosidad", "Sumá la carne al sofrito y caldo de a poco, solo hasta que las fibras queden brillantes.", [], "El sofrito está concentrado.", "Se adhiere a la carne y no queda líquido acuoso.", { heat: "medio-bajo", seconds: 600, depends: ["sofrito"], rescues: [["Quedó seca", "Agregá caldo, tapá dos minutos y apagá."], ["Quedó aguada", "Retirá carne y reducí el líquido solo."]] }),
      step("banana", "banana", "Caramelizar la banana", "Cortá a lo largo y dorá en una película de aceite, primero por la cara plana.", [["banana", 2, "unidades"], ["aceite", 1, "cda"]], "El resto está casi listo.", "Las caras están doradas y el centro conserva forma.", { heat: "medio", seconds: 240, depends: ["integrar-carne", "arroz", "porotos"], avoid: ["Una banana demasiado madura se desarma."] }),
      step("servir", "banana", "Armar el pabellón", "Serví las cuatro partes separadas pero próximas. Probá una cucharada combinada antes del ajuste final.", [], "Todo está caliente y la banana recién dorada.", "Cada parte conserva textura y juntas resultan dulces, saladas y jugosas.", { depends: ["banana"] })
    ],
    ["olla para carne", "olla para arroz", "dos sartenes u ollas medianas", "dos tenedores"],
    { decisions: ["Se conserva el caldo", "Se pisa solo parte de los porotos", "La banana va al final"], storage: "Guardar cada componente por separado hasta tres días.", reheat: "Carne y porotos con caldo; banana fresca si es posible." }
  ),

  recipe(
    "lomo-saltado",
    "Lomo saltado con papas crocantes",
    "Salteado peruano jugoso con fuego alto, carne dorada, vegetales vivos y papas que conservan su crocante.",
    3,
    [["main", "Lomo saltado", "main"], ["sauce", "Jugo de salteado", "sauce"], ["garnish", "Papas y arroz", "garnish"], ["topping", "Terminación", "topping"]],
    [
      ["carne", "lomo o cuadril tierno", 500, "g", "protein"], ["cebolla", "cebolla morada", 1, "unidad", "vegetable"],
      ["tomate", "tomates firmes", 2, "unidades", "vegetable"], ["soja", "salsa de soja", 3, "cdas", "liquid"],
      ["vinagre", "vinagre de vino tinto", 1, "cda", "liquid"], ["ajo", "ajo", 2, "dientes", "seasoning"],
      ["papas", "papas", 600, "g", "vegetable"], ["arroz", "arroz blanco cocido", 450, "g", "grain"],
      ["cilantro", "cilantro o perejil", 2, "cdas", "vegetable", true], ["aceite", "aceite neutro", 4, "cdas", "fat", false, "fixed"],
      ["sal", "sal y pimienta", "a gusto", "", "seasoning"]
    ],
    [
      step("mise", "main", "Preparar todo antes del wok", "Cortá carne contra la fibra, cebolla y tomate en gajos gruesos. Picá ajo y mezclá soja con vinagre.", [["carne", 500, "g"], ["cebolla", 1, "unidad"], ["tomate", 2, "unidades"], ["ajo", 2, "dientes"], ["soja", 3, "cdas"], ["vinagre", 1, "cda"]], "El fuego está apagado.", "Ingredientes, salsa y fuente de salida están al alcance; la carne está seca.", { avoid: ["Con el wok caliente no habrá tiempo para medir."] }),
      step("precocer-papas", "garnish", "Precocer las papas", "Cortá bastones, enjuagá hasta que el agua salga clara y precociná hasta que flexionen sin romperse.", [["papas", 600, "g"]], "Los bastones son parejos.", "Exterior tierno y centro todavía resistente.", { heat: "medio", seconds: 420, depends: ["mise"], rescues: [["Se ablandaron demasiado", "Extendelas y enfrialas antes de dorar."]] }),
      step("dorar-papas", "garnish", "Secar y dorar", "Escurrí, secá por completo y freí o dorá por tandas. Salá al salir y mantené destapado.", [["aceite", 3, "cdas"]], "No dejan humedad en la mano.", "Los bordes están dorados y firmes.", { heat: "alto", seconds: 720, depends: ["precocer-papas"], avoid: ["No las mezcles con el jugo hasta el plato."] }),
      step("sellar-1", "main", "Sellar la primera tanda", "Calentá el wok hasta que humee levemente. Agregá aceite y sellá la mitad de la carne sin mover al principio.", [["aceite", 0.5, "cda"]], "Papas y arroz están listos o casi listos.", "La carne tiene caras marrones y centro jugoso.", { heat: "muy alto", seconds: 90, depends: ["mise"], avoid: ["Llenar el wok hace hervir la carne."] }),
      step("sellar-2", "main", "Sellar la segunda tanda", "Retirá la primera tanda, recuperá calor y repetí con la carne restante. Reservá sin tapar.", [["aceite", 0.5, "cda"]], "El wok volvió a humear levemente.", "La segunda tanda tiene dorado y dejó fondo sabroso.", { heat: "muy alto", seconds: 90, depends: ["sellar-1"] }),
      step("vegetales", "main", "Saltear los vegetales", "Salteá cebolla pocos segundos; sumá ajo y tomate, moviendo con decisión sin desarmar.", [], "La carne está reservada.", "La cebolla tiene bordes tostados y el tomate está caliente pero entero.", { heat: "muy alto", seconds: 90, depends: ["sellar-2"], avoid: ["El tomate no debe convertirse en salsa."] }),
      step("jugo", "sauce", "Formar el jugo", "Devolvé carne, volcá soja y vinagre por el borde caliente y mezclá una sola vez.", [], "Los vegetales conservan forma.", "El líquido hierve de inmediato y forma un jugo brillante y corto.", { heat: "muy alto", seconds: 45, depends: ["vegetales"], cues: [["sound", "La salsa chisporrotea al tocar el borde."], ["smell", "El vinagre pierde el golpe crudo."]], rescues: [["Hay mucho líquido", "Retirá sólidos y reducí el jugo treinta segundos."], ["Está salado", "Agregá agua y más tomate fresco."]] }),
      step("servir", "topping", "Servir sin perder crocante", "Serví arroz, lomo con jugo y papas a un lado. Terminá con cilantro o perejil.", [["arroz", 450, "g"], ["cilantro", 2, "cdas"]], "El jugo acaba de ligar.", "Las papas permanecen secas y el plato conserva vapor y perfume.", { depends: ["jugo", "dorar-papas"] })
    ],
    ["wok o sartén muy amplia", "olla para arroz", "olla o sartén para papas", "fuente para reservar"],
    { decisions: ["Carne por tandas", "Tomate casi al final", "Papas fuera del wok"], storage: "Guardar papas separadas del salteado.", reheat: "Papas en horno fuerte; salteado muy breve en sartén." }
  )
];
