import type { MiseRecipe } from "../types";
import { makeRecipe as recipe, makeStep as step } from "./recipeFactory";

export const fusionRecipes: MiseRecipe[] = [
  recipe(
    "pollo-soja-miel",
    "Pollo glaseado de soja, miel y jengibre",
    "Fusión asiática sin picante: pollo bien dorado, glaseado equilibrado y brillante, brócoli verde y arroz perfumado.",
    3,
    [["main", "Pollo dorado", "main"], ["sauce", "Glaseado", "sauce"], ["garnish", "Arroz y brócoli", "garnish"], ["topping", "Terminación", "topping"]],
    [
      ["pollo", "muslos de pollo deshuesados", 650, "g", "protein"], ["soja", "salsa de soja", 3, "cdas", "liquid"],
      ["miel", "miel", 2, "cdas", "seasoning"], ["jengibre", "jengibre fresco", 12, "g", "seasoning"],
      ["ajo", "ajo", 2, "dientes", "seasoning"], ["brocoli", "brócoli", 350, "g", "vegetable"],
      ["arroz", "arroz jazmín", 240, "g", "grain"], ["vinagre", "vinagre de arroz o manzana", 1, "cda", "liquid"],
      ["sesamo", "semillas de sésamo", 1, "cda", "seasoning", true], ["verdeo", "verdeo", 1, "unidad", "vegetable", true],
      ["aceite", "aceite neutro", 1, "cda", "fat", false, "fixed"]
    ],
    [
      step("mise", "sauce", "Preparar la mesada", "Rallá ajo y jengibre, separá brócoli en flores parejas, cortá verdeo y secá muy bien el pollo. Medí la salsa.", [["ajo", 2, "dientes"], ["jengibre", 12, "g"], ["brocoli", 350, "g"], ["verdeo", 1, "unidad"], ["pollo", 650, "g"]], "Antes de calentar la sartén.", "Pollo seco, brócoli parejo y aromáticos listos.", { avoid: ["Ajo y jengibre sueltos se queman antes de glasear."] }),
      step("glaseado", "sauce", "Equilibrar el glaseado", "Mezclá soja, miel, vinagre, ajo, jengibre y tres cucharadas de agua. Probá una gota.", [["soja", 3, "cdas"], ["miel", 2, "cdas"], ["vinagre", 1, "cda"]], "Los aromáticos están rallados.", "La miel se disolvió y ningún sabor domina de forma agresiva.", { depends: ["mise"], rescues: [["Está salado", "Agregá agua de a una cucharada; no más miel automáticamente."], ["Está empalagoso", "Sumá gotas de vinagre."]] }),
      step("arroz", "garnish", "Cocer y reposar el arroz", "Lavá el arroz, cocinalo tapado a hervor suave y reposá diez minutos antes de soltar.", [["arroz", 240, "g"]], "El glaseado está listo.", "No queda agua libre y el grano está tierno pero separado.", { heat: "bajo", seconds: 900, depends: ["mise"], parallel: ["dorar-1"], avoid: ["No levantes la tapa."] }),
      step("dorar-1", "main", "Dorar la primera cara", "Apoyá el pollo en sartén caliente con aceite y no lo muevas hasta formar costra.", [["aceite", 1, "cda"]], "La sartén está caliente y el pollo seco.", "La cara inferior está caoba y se despega sin arrancarse.", { heat: "medio-alto", seconds: 300, depends: ["glaseado"], parallel: ["arroz"], rescues: [["Larga agua", "Retirá exceso, separá piezas y recuperá temperatura."]] }),
      step("dorar-2", "main", "Terminar el dorado", "Girá, bajá apenas el fuego y cociná la segunda cara hasta que el centro esté casi listo.", [], "La primera cara tiene costra.", "Los jugos salen claros y el centro conserva elasticidad.", { heat: "medio", seconds: 300, depends: ["dorar-1"], parallel: ["arroz"] }),
      step("brocoli", "garnish", "Cocinar el brócoli", "Retirá el pollo. Sumá brócoli con dos cucharadas de agua, tapá brevemente y destapá para evaporar.", [["brocoli", 350, "g"]], "El pollo está casi cocido.", "El brócoli está verde intenso y todavía firme.", { heat: "medio-alto", seconds: 240, depends: ["dorar-2"], avoid: ["No lo lleves a verde oliva: todavía pasará por el glaseado."] }),
      step("glasear", "sauce", "Glasear sin quemar", "Devolvé el pollo, volcá la mezcla y mové las piezas mientras reduce. Apagá apenas cubra la cuchara.", [], "El brócoli está firme y no queda agua.", "El pollo tiene película brillante y la salsa cae en hilo grueso.", { heat: "medio", seconds: 180, depends: ["brocoli"], cues: [["visual", "La salsa cubre sin volverse caramelo oscuro."], ["smell", "Jengibre y ajo aparecen sin olor quemado."]], rescues: [["Espesó demasiado", "Retirá del fuego y agregá agua de a cucharadas."], ["Quedó líquida", "Retirá sólidos y reducí la salsa sola."]] }),
      step("servir", "topping", "Terminar y servir", "Serví arroz, pollo y brócoli. Terminá con sésamo y verdeo si los tenés.", [["sesamo", 1, "cda"], ["verdeo", 1, "unidad"]], "El arroz reposó y el glaseado brilla.", "El arroz queda suelto, el pollo jugoso y el verdeo fresco.", { depends: ["glasear", "arroz"] })
    ],
    ["sartén amplia con tapa", "olla con tapa", "rallador", "taza para salsa"],
    { constraints: ["Sin picante", "Ingredientes accesibles en Argentina"], decisions: ["El glaseado se prueba antes", "Brócoli en la misma sartén", "Opcionales preparados desde el mise"], reheat: "A fuego bajo con una cucharada de agua." }
  ),

  recipe(
    "curry-calabaza",
    "Curry suave de calabaza, garbanzos y coco",
    "Guiso vegetariano cremoso y aromático, sin picante, con calabaza entera, garbanzos sabrosos y arroz suelto.",
    4,
    [["main", "Calabaza y garbanzos", "main"], ["sauce", "Coco y especias", "sauce"], ["garnish", "Arroz", "garnish"], ["topping", "Yogur y hierbas", "topping"]],
    [
      ["calabaza", "calabaza", 800, "g", "vegetable"], ["garbanzos", "garbanzos cocidos", 500, "g", "vegetable"],
      ["cebolla", "cebolla", 1, "unidad", "vegetable"], ["ajo", "ajo", 3, "dientes", "seasoning"],
      ["jengibre", "jengibre fresco", 15, "g", "seasoning"], ["curry", "curry suave", 2, "cdtas", "seasoning"],
      ["comino", "comino", 1, "cdta", "seasoning"], ["tomate", "tomate triturado", 300, "g", "vegetable"],
      ["coco", "leche de coco", 400, "ml", "liquid"], ["arroz", "arroz basmati o largo fino", 280, "g", "grain"],
      ["yogur", "yogur natural", 150, "g", "dairy", true], ["limon", "limón", 1, "unidad", "vegetable"],
      ["cilantro", "cilantro o perejil", 3, "cdas", "vegetable", true], ["aceite", "aceite neutro", 2, "cdas", "fat", false, "fixed"],
      ["sal", "sal", "a gusto", "", "seasoning"]
    ],
    [
      step("mise", "main", "Preparar la mesada", "Cortá calabaza en cubos iguales, picá cebolla, rallá ajo y jengibre, escurrí garbanzos, lavá arroz y cortá hierbas.", [["calabaza", 800, "g"], ["cebolla", 1, "unidad"], ["ajo", 3, "dientes"], ["jengibre", 15, "g"], ["garbanzos", 500, "g"], ["arroz", 280, "g"], ["cilantro", 3, "cdas"]], "Antes de encender el fuego.", "Todo está separado, las especias medidas y el limón listo.", { avoid: ["Calabaza muy pequeña se desarma en la salsa."] }),
      step("cebolla", "sauce", "Dorar la cebolla", "Cociná cebolla con aceite y sal hasta que esté muy tierna y empiece a dorar.", [["aceite", 2, "cdas"]], "La olla está a fuego medio.", "La cebolla es dulce, translúcida y tiene puntos avellana.", { heat: "medio-bajo", seconds: 720, depends: ["mise"], parallel: ["arroz"] }),
      step("especias", "sauce", "Despertar aromáticos", "Sumá ajo, jengibre, curry y comino. Mezclá brevemente hasta que perfumen.", [["curry", 2, "cdtas"], ["comino", 1, "cdta"]], "La cebolla está tierna.", "Las especias perfuman intensamente y conservan color.", { heat: "bajo", seconds: 60, depends: ["cebolla"], avoid: ["Si la olla está seca, agregá agua antes de que se quemen."], rescues: [["Se pegaron sin ennegrecer", "Agregá tomate de inmediato y raspá."]] }),
      step("tomate", "sauce", "Concentrar el tomate", "Agregá tomate y cociná hasta que pierda agua y la grasa asome en los bordes.", [["tomate", 300, "g"]], "Las especias están fragantes.", "La base es espesa, rojo ladrillo y sin gusto crudo.", { heat: "medio", seconds: 600, depends: ["especias"] }),
      step("calabaza", "main", "Cocer la calabaza", "Sumá calabaza, leche de coco y sal. Cociná destapado con hervor suave, moviendo lo mínimo.", [["coco", 400, "ml"]], "El tomate está concentrado.", "El cuchillo atraviesa la calabaza pero los cubos conservan esquinas.", { heat: "bajo", seconds: 1200, depends: ["tomate"], parallel: ["arroz"], avoid: ["Hervor fuerte y mezcla constante la desarman."] }),
      step("arroz", "garnish", "Cocer el arroz", "Cociná con sal a hervor suave. Apagá, reposá tapado y soltá con tenedor.", [["arroz", 280, "g"]], "La cebolla empezó a cocinarse.", "Los granos están tiernos y separados.", { heat: "bajo", seconds: 900, depends: ["mise"], parallel: ["cebolla", "calabaza"] }),
      step("garbanzos", "main", "Sumar los garbanzos", "Incorporá cuando la calabaza esté casi tierna. Cociná solo hasta que absorban sabor.", [], "La calabaza ofrece mínima resistencia.", "Los garbanzos están calientes y cubiertos sin volverse puré.", { heat: "bajo", seconds: 480, depends: ["calabaza"] }),
      step("equilibrar", "sauce", "Equilibrar con limón", "Apagá, agregá limón de a poco y probá con arroz. Ajustá sal, curry o agua recién entonces.", [["limon", 1, "unidad"]], "Calabaza y garbanzos están cocidos.", "La salsa es cremosa, aromática y el coco no pesa.", { depends: ["garbanzos"], cues: [["taste", "Especias suaves, dulzor y una acidez limpia."], ["texture", "Cubre la cuchara y fluye lentamente."]], rescues: [["Está espeso", "Agregá agua caliente de a 50 ml."], ["Domina el coco", "Sumá limón y sal, no más especias secas."], ["Falta aroma", "Calentá media cucharadita de curry con aceite y sumala al final."]] }),
      step("servir", "topping", "Terminar fresco", "Serví sobre arroz y agregá yogur y hierbas si los usás. Dejá limón en la mesa.", [["yogur", 150, "g"], ["cilantro", 3, "cdas"]], "El curry está equilibrado y el arroz reposó.", "Contrasta salsa caliente, yogur fresco y hierbas vivas.", { depends: ["equilibrar", "arroz"] })
    ],
    ["olla de fondo grueso", "olla con tapa para arroz", "rallador", "cuchillo"],
    { constraints: ["Sin picante", "Ingredientes accesibles en Argentina"], decisions: ["Especias tostadas brevemente", "Calabaza con forma", "Limón ajustado al final con arroz"], storage: "Guardar curry y arroz separados hasta cuatro días.", reheat: "Curry a fuego bajo con agua; yogur y hierbas al servir." }
  )
];
