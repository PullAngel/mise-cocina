import type { MiseRecipe } from "../types";
import { makeRecipe as recipe, makeStep as step } from "./recipeFactory";

export const argentineRecipes: MiseRecipe[] = [
  recipe(
    "milanesa-pure",
    "Milanesa argentina con puré sedoso y limón tostado",
    "Costra seca y crocante, carne jugosa y un puré clásico con textura de restaurante sin abandonar el sabor de casa.",
    2,
    [["main", "Milanesa", "main"], ["garnish", "Puré sedoso", "garnish"], ["topping", "Limón y terminación", "topping"]],
    [
      ["carne", "bifes para milanesa", 400, "g", "protein"], ["huevo", "huevo", 1, "unidad", "dairy"],
      ["pan", "pan rallado", 140, "g", "grain"], ["papa", "papas harinosas", 500, "g", "vegetable"],
      ["manteca", "manteca", 35, "g", "fat"], ["leche", "leche", 80, "ml", "dairy"],
      ["limon", "limón", 1, "unidad", "vegetable"], ["aceite", "aceite neutro para freír", 600, "ml", "fat", false, "fixed"],
      ["mostaza", "mostaza", 1, "cdta", "seasoning", true], ["perejil", "perejil picado", 1, "cda", "vegetable", true],
      ["sal", "sal y pimienta", "a gusto", "", "seasoning"]
    ],
    [
      step("mise", "main", "Preparar la mesada", "Pelá y cortá las papas parejas. Aplaná los bifes si hace falta, secá la carne y prepará huevo, pan, rejilla y limón cortado.", [["papa", 500, "g"], ["carne", 400, "g"], ["limon", 1, "unidad"]], "Todavía no encendiste el aceite.", "Las papas tienen tamaño parejo y la estación de empanado está completa.", { avoid: ["La humedad hace que el empanado se despegue."], rescues: [["Los bifes tienen grosor desigual", "Cubrilos y golpeá suavemente desde el centro hacia afuera."]] }),
      step("papas", "garnish", "Cocer las papas", "Poné las papas desde agua fría con sal, llevá a hervor y bajá a cocción suave.", [["papa", 500, "g"]], "Las papas están cubiertas por dos dedos de agua.", "Un cuchillo entra sin resistencia y los bordes siguen enteros.", { heat: "medio y luego bajo", seconds: 1080, parallel: ["empanar"], cues: [["texture", "Un cuchillo entra sin resistencia."], ["visual", "Los bordes siguen enteros y el hervor es tranquilo."]] }),
      step("empanar", "main", "Sazonar y empanar", "Sazoná la carne. Mezclá el huevo con mostaza y perejil si los usás; empaná presionando el pan con la palma.", [["huevo", 1, "unidad"], ["pan", 140, "g"], ["mostaza", 1, "cdta"], ["perejil", 1, "cda"]], "La carne está seca y fría.", "La cobertura es fina, uniforme y sin sectores húmedos.", { parallel: ["papas"], avoid: ["Una montaña de pan absorbe aceite.", "No apiles sin separadores."] }),
      step("reposar", "main", "Asentar el empanado", "Dejá las milanesas en una sola capa mientras terminan las papas y calentás el aceite.", [], "Terminaste de empanar.", "El pan se siente adherido y la superficie perdió humedad.", { seconds: 600, depends: ["empanar"], parallel: ["papas"], rescues: [["Se abre una zona", "Pincelá apenas con huevo y presioná pan solo en ese punto."]] }),
      step("secar-papas", "garnish", "Secar y pisar", "Escurrí muy bien, devolvé las papas un minuto a la olla caliente y pisalas todavía humeantes.", [], "El cuchillo atraviesa las papas.", "No hay agua visible y la base queda seca y sin trozos.", { heat: "bajo", seconds: 60, depends: ["papas"], avoid: ["No uses licuadora ni procesadora: vuelven gomosa la papa."] }),
      step("pure", "garnish", "Emulsionar el puré", "Sumá manteca primero y leche caliente de a poco. Mezclá solo hasta alisar y ajustá sal.", [["manteca", 35, "g"], ["leche", 80, "ml"]], "La papa está pisada y caliente.", "Cae de la cuchara en una cinta cremosa y conserva cuerpo.", { depends: ["secar-papas"], rescues: [["Quedó firme", "Agregá leche caliente de a una cucharada."], ["Quedó flojo", "Mantenelo un minuto a fuego mínimo, mezclando."]] }),
      step("freir", "main", "Freír por tandas", "Freí sin que las milanesas se toquen, girá una sola vez y pasá a rejilla.", [["aceite", 600, "ml"]], "Una miga burbujea enseguida sin quemarse.", "La costra está dorada pareja y suena seca al rozarla.", { heat: "medio-alto", seconds: 240, depends: ["reposar"], avoid: ["No tapes ni apoyes sobre papel plano.", "Si el aceite humea, está demasiado caliente."], rescues: [["Se dora demasiado rápido", "Bajá el fuego antes de continuar."], ["Absorbe aceite", "Esperá a que el aceite recupere temperatura."]] }),
      step("servir", "topping", "Tostar limón y servir", "Tostá el limón por la cara cortada en una sartén seca. Serví la milanesa apenas hecha con puré y limón aparte.", [["limon", 1, "unidad"]], "La última tanda está en la rejilla.", "El limón huele dulce y la costra todavía cruje.", { heat: "alto", seconds: 90, depends: ["freir", "pure"], cues: [["smell", "El limón huele dulce y tostado."], ["sound", "La milanesa cruje al cortarla."]] })
    ],
    ["olla", "sartén amplia", "rejilla", "pisapapas", "tres platos o fuentes"],
    { decisions: ["Empanado fino y asentado", "Manteca antes que leche", "Limón tostado servido aparte"], reheat: "Milanesa destapada en horno fuerte; puré a fuego bajo con un chorrito de leche." }
  ),

  recipe(
    "bondiola-malbec",
    "Bondiola al Malbec con batatas doradas",
    "Carne tierna que todavía se puede cortar, salsa oscura y brillante y batatas caramelizadas sin resultar dulzonas.",
    4,
    [["main", "Bondiola braseada", "main"], ["sauce", "Salsa Malbec", "sauce"], ["garnish", "Batatas doradas", "garnish"]],
    [
      ["bondiola", "bondiola en una pieza", 900, "g", "protein"], ["vino", "vino Malbec", 350, "ml", "liquid"],
      ["cebolla", "cebollas", 2, "unidades", "vegetable"], ["ajo", "ajo", 3, "dientes", "seasoning"],
      ["batata", "batatas", 800, "g", "vegetable"], ["miel", "miel", 1, "cda", "seasoning", true],
      ["caldo", "caldo suave", 300, "ml", "liquid"], ["mostaza", "mostaza", 1, "cda", "seasoning"],
      ["tomillo", "tomillo", 4, "ramitas", "seasoning", true], ["aceite", "aceite neutro", 2, "cdas", "fat", false, "fixed"],
      ["sal", "sal y pimienta", "a gusto", "", "seasoning"]
    ],
    [
      step("mise", "main", "Preparar la mesada", "Secá y salpimentá la bondiola. Cortá cebolla, picá ajo y hacé gajos parejos de batata; mezclá caldo con mostaza.", [["bondiola", 900, "g"], ["cebolla", 2, "unidades"], ["ajo", 3, "dientes"], ["batata", 800, "g"], ["mostaza", 1, "cda"], ["caldo", 300, "ml"]], "La mesada está despejada.", "Carne seca, vegetales listos y líquidos medidos.", { avoid: ["La carne congelada o húmeda dorará de forma desigual."] }),
      step("sellar", "main", "Sellar profundamente", "Dorá la bondiola con aceite por todas sus caras, sin moverla hasta que se despegue sola.", [["aceite", 2, "cdas"]], "La olla pesada está caliente.", "Hay una costra marrón caoba sin sectores negros.", { heat: "alto", seconds: 600, depends: ["mise"], rescues: [["Se pega al girarla", "Esperá: una costra formada se suelta con menor resistencia."]] }),
      step("cebolla", "sauce", "Dorar la cebolla", "Retirá la carne, bajá el fuego y cociná cebolla con sal raspando el fondo. Sumá ajo y tomillo al final.", [["tomillo", 4, "ramitas"]], "La bondiola está sellada.", "La cebolla está color avellana y el ajo perfuma sin oscurecerse.", { heat: "medio-bajo", seconds: 900, depends: ["sellar"], avoid: ["El ajo entra al final para no amargar."] }),
      step("vino", "sauce", "Reducir el Malbec", "Agregá vino, subí el fuego y raspá el fondo. Reducí hasta perder el aroma alcohólico agresivo.", [["vino", 350, "ml"]], "La cebolla está dorada.", "El vino huele frutal y bajó aproximadamente a la mitad.", { heat: "medio-alto", seconds: 600, depends: ["cebolla"], cues: [["smell", "El alcohol ya no pica la nariz."], ["visual", "La salsa deja una película en la cuchara."]] }),
      step("brasear", "main", "Brasear suavemente", "Volvé a poner la bondiola, añadí caldo con mostaza y tapá. Cociná con burbujeo mínimo, girando a mitad de tiempo.", [], "El vino está reducido.", "Un tenedor entra con facilidad pero la pieza se sostiene.", { heat: "muy bajo", seconds: 6300, depends: ["vino"], parallel: ["batatas"], avoid: ["Un hervor fuerte endurece la carne y enturbia la salsa."], rescues: [["El líquido baja pronto", "Agregá agua caliente de a 100 ml y tapá."]] }),
      step("batatas", "garnish", "Asar las batatas", "Secá los gajos, aceitá, salpimentá y asá separados a 210 °C. Pincelá miel diluida solo en los últimos cinco minutos.", [["miel", 1, "cda"]], "La bondiola empezó el braseado.", "Bordes tostados, centro cremoso y miel sin quemarse.", { seconds: 2100, parallel: ["brasear"], avoid: ["Amontonadas se cocinan al vapor."], rescues: [["Están tiernas pero pálidas", "Dales cinco minutos de grill vigilado."]] }),
      step("salsa-final", "sauce", "Afinar la salsa", "Retirá la bondiola y dejala reposar. Reducí la salsa destapada hasta que cubra el dorso de una cuchara.", [], "La carne está tierna.", "Un dedo deja en la cuchara un camino limpio que no se cierra.", { heat: "medio", seconds: 480, depends: ["brasear"], rescues: [["Está demasiado fuerte", "Agregá caldo y una nuez de manteca fuera del fuego."], ["Está plana", "Ajustá sal antes de sumar una gota de acidez."]] }),
      step("servir", "sauce", "Reposar, cortar y lacar", "Cortá la bondiola contra la fibra, mojá las fetas con salsa y serví con las batatas.", [], "La carne reposó diez minutos y la salsa está brillante.", "La carne conserva jugos, la salsa se adhiere y las batatas siguen secas.", { seconds: 600, depends: ["salsa-final", "batatas"] })
    ],
    ["olla pesada con tapa", "fuente de horno", "pinza", "cuchillo"],
    { decisions: ["El vino se reduce antes del caldo", "La miel es opcional y entra al final", "La carne reposa antes de cortarse"], reheat: "Carne dentro de la salsa a fuego bajo; batatas aparte en horno fuerte." }
  ),

  recipe(
    "humita-provoleta",
    "Humita cremosa con provoleta crocante",
    "Dulzor fresco de choclo, perfume de albahaca y queso tostado, con textura cremosa e identidad norteña reconocible.",
    4,
    [["main", "Humita", "main"], ["sauce", "Aceite de pimentón", "sauce"], ["topping", "Provoleta crocante", "topping"]],
    [
      ["choclo", "choclos frescos", 6, "unidades", "vegetable"], ["cebolla", "cebolla", 1, "unidad", "vegetable"],
      ["zapallo", "zapallo anco", 250, "g", "vegetable"], ["leche", "leche", 150, "ml", "dairy"],
      ["queso", "provoleta", 180, "g", "dairy"], ["albahaca", "albahaca fresca", 12, "hojas", "vegetable"],
      ["pimenton", "pimentón dulce", 1, "cdta", "seasoning"], ["comino", "comino", 0.25, "cdta", "seasoning", true],
      ["manteca", "manteca", 25, "g", "fat"], ["sal", "sal y pimienta", "a gusto", "", "seasoning"]
    ],
    [
      step("mise", "main", "Rallar y ordenar", "Rallá choclo sobre un bol para conservar sus jugos, rallá zapallo, picá cebolla y dejá la albahaca entera hasta el final.", [["choclo", 6, "unidades"], ["zapallo", 250, "g"], ["cebolla", 1, "unidad"]], "La mesada está libre.", "Todo está medido y el choclo conserva su leche.", { avoid: ["No descartes el líquido del choclo: aporta sabor y cremosidad."] }),
      step("sudar", "main", "Sudar la cebolla", "Derretí parte de la manteca y cociná cebolla con sal sin dorar. Sumá comino si lo usás.", [["manteca", 15, "g"], ["comino", 0.25, "cdta"]], "La olla está apenas caliente.", "La cebolla está translúcida y dulce.", { heat: "bajo", seconds: 600, depends: ["mise"] }),
      step("pimenton", "sauce", "Despertar el pimentón", "Apartá la olla del fuego, agregá pimentón con la manteca restante y mezclá pocos segundos.", [["pimenton", 1, "cdta"], ["manteca", 10, "g"]], "La cebolla está lista.", "La grasa queda rojo ladrillo y huele dulce, sin humo.", { depends: ["sudar"], avoid: ["El pimentón se quema rápido; entra fuera del fuego."] }),
      step("cocer", "main", "Cocinar choclo y zapallo", "Sumá choclo con sus jugos y zapallo. Revolvé desde el fondo hasta que pierdan sabor crudo.", [], "El pimentón perfumó la grasa.", "La mezcla espesa y sabe dulce, sin gusto vegetal crudo.", { heat: "medio-bajo", seconds: 900, depends: ["pimenton"], avoid: ["Raspá esquinas y fondo: el choclo se pega antes de que se note."] }),
      step("cremosidad", "main", "Ajustar la cremosidad", "Agregá leche de a poco solo hasta lograr una humita cremosa. Cociná y corregí sal.", [["leche", 150, "ml"]], "La base está cocida y espesa.", "La cuchara abre un camino que tarda dos segundos en cerrarse.", { heat: "bajo", seconds: 420, depends: ["cocer"], rescues: [["Quedó líquida", "Reducí destapada; no agregues espesantes."], ["Quedó densa", "Aflojá con leche caliente de a cucharadas."]] }),
      step("albahaca", "main", "Perfumar al final", "Apagá, incorporá albahaca cortada y probá. Debe sentirse fresca, no cocida.", [["albahaca", 12, "hojas"]], "La textura ya está ajustada.", "La albahaca aparece al acercar la cuchara y conserva color.", { depends: ["cremosidad"], cues: [["smell", "La albahaca aparece fresca sobre el choclo."], ["taste", "Dulce y salado están equilibrados."]] }),
      step("gratinar", "topping", "Gratinar la provoleta", "Pasá a una fuente, repartí provoleta y gratiná cerca del grill.", [["queso", 180, "g"]], "La humita está caliente.", "El queso burbujea, con manchas doradas y bordes crocantes.", { heat: "grill", seconds: 300, depends: ["albahaca"], avoid: ["No esperes que toda la superficie quede oscura."] }),
      step("reposar", "topping", "Reposar y servir", "Esperá unos minutos para que recupere cuerpo. Serví tomando queso y base en cada porción.", [], "La fuente salió del grill.", "Se sostiene en la cuchara pero sigue cremosa.", { seconds: 300, depends: ["gratinar"] })
    ],
    ["rallador", "olla de fondo grueso", "espátula", "fuente apta para horno"],
    { decisions: ["La leche se ajusta según el choclo", "El pimentón va fuera del fuego", "La albahaca entra al final"], reheat: "Tapada a horno medio; destapar y gratinar brevemente." }
  ),

  recipe(
    "merluza-papas",
    "Merluza dorada con papas aplastadas y manteca de limón",
    "Pescado jugoso con costra delicada, papas muy crocantes y salsa fresca de manteca y limón.",
    3,
    [["main", "Merluza dorada", "main"], ["garnish", "Papas y arvejas", "garnish"], ["sauce", "Manteca de limón", "sauce"], ["topping", "Hierbas frescas", "topping"]],
    [
      ["merluza", "filetes gruesos de merluza", 600, "g", "protein"], ["papa", "papas pequeñas", 700, "g", "vegetable"],
      ["arvejas", "arvejas", 250, "g", "vegetable"], ["manteca", "manteca", 70, "g", "fat"],
      ["limon", "limones", 2, "unidades", "vegetable"], ["ajo", "ajo", 1, "diente", "seasoning", true],
      ["perejil", "perejil", 3, "cdas", "vegetable"], ["harina", "harina 0000", 2, "cdas", "grain", true],
      ["aceite", "aceite de oliva", 3, "cdas", "fat", false, "fixed"], ["sal", "sal y pimienta", "a gusto", "", "seasoning"]
    ],
    [
      step("mise", "main", "Preparar pescado y salsa", "Revisá espinas, secá los filetes, rallá un limón, exprimí ambos y picá perejil y ajo.", [["merluza", 600, "g"], ["limon", 2, "unidades"], ["perejil", 3, "cdas"], ["ajo", 1, "diente"]], "Antes de cocer las papas.", "Pescado seco y frío; jugo, ralladura y hierbas separados.", { avoid: ["Tomá solo la parte amarilla de la piel: lo blanco amarga."] }),
      step("cocer-papas", "garnish", "Cocer las papas", "Herví las papas enteras con sal hasta que un cuchillo entre con poca resistencia.", [["papa", 700, "g"]], "Están cubiertas con agua fría.", "Están tiernas pero no se rompen al levantarlas.", { heat: "medio", seconds: 1200, depends: ["mise"] }),
      step("dorar-papas", "garnish", "Aplastar y dorar", "Escurrí, dejá salir vapor y aplastá sin separar. Aceitá y horneá a 220 °C hasta dorar ambas caras.", [["aceite", 2, "cdas"]], "Las papas siguen calientes.", "Muchos bordes están avellana y el centro permanece cremoso.", { seconds: 1800, depends: ["cocer-papas"], parallel: ["sazonar-pescado"], avoid: ["Si aplastás demasiado se vuelven puré."] }),
      step("sazonar-pescado", "main", "Sazonar la merluza", "Salpimentá justo antes de cocinar. Espolvoreá una película mínima de harina si querés una costra más segura.", [["harina", 2, "cdas"]], "Las papas ya están en el horno.", "Los filetes están secos y la cobertura apenas se ve.", { depends: ["mise"], parallel: ["dorar-papas"], avoid: ["Salar con anticipación extrae agua."] }),
      step("dorar-pescado", "main", "Dorar sin mover", "Apoyá la cara de presentación en sartén caliente con aceite y no muevas hasta que se libere sola. Girá con espátula ancha.", [["aceite", 1, "cda"]], "El aceite está fluido sin humear.", "La primera cara está dorada y se despega sin romperse.", { heat: "medio-alto", seconds: 240, depends: ["sazonar-pescado"], rescues: [["Se empieza a romper", "No lo fuerces; esperá treinta segundos y usá espátula ancha."]] }),
      step("terminar-pescado", "main", "Terminar el centro", "Cociná la segunda cara y retiralo apenas las láminas comiencen a separarse.", [], "La primera cara está dorada.", "El centro está opaco y jugoso; las láminas ceden con presión suave.", { heat: "medio", seconds: 180, depends: ["dorar-pescado"], cues: [["texture", "Las láminas ceden pero conservan humedad."], ["visual", "No queda transparencia cruda."]], avoid: ["El calor residual seguirá cocinándolo."] }),
      step("salsa", "sauce", "Montar manteca de limón", "Bajá el fuego, agregá manteca y ajo; cuando espume, apagá y sumá jugo, ralladura y perejil.", [["manteca", 70, "g"], ["ajo", 1, "diente"]], "El pescado reposa fuera de la sartén.", "La salsa está amarilla, brillante y no se separa.", { heat: "bajo y fuera del fuego", seconds: 120, depends: ["terminar-pescado"], rescues: [["Se separó", "Agregá una cucharada de agua fría y agitá fuera del fuego."], ["Quedó ácida", "Sumá una nuez de manteca y sal."]] }),
      step("arvejas", "garnish", "Calentar las arvejas", "Calentá las arvejas apenas con una cucharada de la salsa.", [["arvejas", 250, "g"]], "La salsa está montada.", "Están calientes, verdes y todavía dulces.", { heat: "medio", seconds: 180, depends: ["salsa"] }),
      step("servir", "topping", "Servir con precisión", "Serví merluza, papas y arvejas; salseá alrededor y apenas sobre el pescado. Terminá con perejil.", [], "Todos los componentes están listos.", "La costra del pescado y de las papas permanece visible, no sumergida.", { depends: ["salsa", "dorar-papas", "arvejas"] })
    ],
    ["olla", "fuente de horno", "sartén antiadherente", "espátula ancha", "rallador"],
    { decisions: ["El pescado se sala justo antes", "La salsa se monta fuera del fuego", "La harina es opcional y mínima"], storage: "Guardar pescado y guarnición separados hasta dos días.", reheat: "Pescado brevemente en horno bajo; papas en horno fuerte." }
  ),

  recipe(
    "risotto-hongos",
    "Risotto de hongos, puerro y queso",
    "Arroz cremoso por su almidón, hongos intensamente dorados y una terminación brillante que se extiende suavemente en el plato.",
    4,
    [["main", "Risotto", "main"], ["garnish", "Hongos dorados", "garnish"], ["sauce", "Mantecatura", "sauce"], ["topping", "Terminación", "topping"]],
    [
      ["arroz", "arroz carnaroli o arborio", 320, "g", "grain"], ["hongos", "hongos frescos", 500, "g", "vegetable"],
      ["puerro", "puerros", 2, "unidades", "vegetable"], ["caldo", "caldo suave", 1200, "ml", "liquid"],
      ["vino", "vino blanco seco", 150, "ml", "liquid"], ["manteca", "manteca fría", 80, "g", "fat"],
      ["queso", "queso duro rallado", 100, "g", "dairy"], ["ajo", "ajo", 1, "diente", "seasoning", true],
      ["tomillo", "tomillo", 4, "ramitas", "seasoning", true], ["limon", "limón", 0.5, "unidad", "vegetable", true],
      ["aceite", "aceite de oliva", 2, "cdas", "fat", false, "fixed"], ["sal", "sal y pimienta", "a gusto", "", "seasoning"]
    ],
    [
      step("mise", "main", "Preparar antes del arroz", "Limpiá y cortá hongos, picá puerro, rallá queso, dividí manteca y calentá el caldo en otra olla.", [["hongos", 500, "g"], ["puerro", 2, "unidades"], ["queso", 100, "g"], ["manteca", 80, "g"], ["caldo", 1200, "ml"]], "Antes de tostar el arroz.", "El caldo está caliente sin hervir y todo queda al alcance.", { avoid: ["Después del primer caldo no habrá pausas largas."] }),
      step("hongos", "garnish", "Dorar los hongos", "Doralos en dos tandas y en una sola capa. Salá al final; sumá ajo y tomillo a la segunda tanda.", [["aceite", 2, "cdas"], ["ajo", 1, "diente"], ["tomillo", 4, "ramitas"]], "Los hongos están secos y la sartén caliente.", "Tienen caras marrones, bordes firmes y no nadan en agua.", { heat: "alto", seconds: 600, depends: ["mise"], parallel: ["puerro"], avoid: ["Llenar la sartén los hierve."], rescues: [["Largaron agua", "Retiralos, evaporá el líquido y volvé a dorar por tandas."]] }),
      step("puerro", "main", "Sudar el puerro", "Derretí parte de la manteca y cociná puerro con sal hasta que esté tierno, sin dorar.", [["manteca", 25, "g"]], "El caldo está caliente.", "El puerro está translúcido y dulce.", { heat: "bajo", seconds: 480, depends: ["mise"], parallel: ["hongos"] }),
      step("nacarar", "main", "Nacarar el arroz", "Sumá arroz sin lavar y mezclá hasta que esté caliente, con bordes translúcidos y centro blanco.", [["arroz", 320, "g"]], "El puerro está blando.", "Los granos brillan y suenan secos al mezclar.", { heat: "medio", seconds: 120, depends: ["puerro"] }),
      step("vino", "main", "Reducir el vino", "Agregá vino y mezclá hasta que casi se evapore y desaparezca el aroma alcohólico crudo.", [["vino", 150, "ml"]], "El arroz está nacarado.", "La olla vuelve a verse casi seca y el vino huele frutal.", { heat: "medio", seconds: 180, depends: ["nacarar"] }),
      step("caldo", "main", "Cocinar con caldo", "Agregá caldo caliente de a dos cucharones y mezclá seguido. Repetí cuando el fondo aparezca un instante.", [], "El vino está reducido.", "El grano está tierno afuera, apenas firme al centro y la crema fluye.", { heat: "medio-bajo", seconds: 960, depends: ["vino"], cues: [["texture", "El grano conserva mínima resistencia central."], ["visual", "El fondo aparece un segundo y vuelve a cubrirse."]], avoid: ["No dejes secar por completo entre adiciones."], rescues: [["Falta caldo y sigue duro", "Continuá con agua caliente."], ["Está cocido pero líquido", "Retirá líquido y mezclá un minuto."]] }),
      step("integrar", "garnish", "Integrar parte de los hongos", "Sumá dos tercios de los hongos en los últimos minutos y reservá los más dorados.", [], "Al arroz le faltan unos tres minutos.", "El sabor se integró y las piezas conservan textura.", { heat: "medio-bajo", seconds: 180, depends: ["caldo", "hongos"] }),
      step("mantecar", "sauce", "Mantecar fuera del fuego", "Apagá, agregá manteca fría y queso. Mezclá con energía; ajustá sal y limón si usás.", [["manteca", 55, "g"], ["queso", 100, "g"], ["limon", 0.5, "unidad"]], "El arroz está un punto más firme de lo deseado.", "Está brillante y se extiende lentamente al mover el plato.", { depends: ["integrar"], rescues: [["Quedó compacto", "Añadí caldo caliente de a una cucharada."], ["Se ve grasoso", "Agregá caldo y mezclá fuera del fuego."]] }),
      step("servir", "topping", "Reposar solo dos minutos", "Tapá apenas dos minutos y serví en platos tibios con hongos reservados y pimienta.", [], "La mantecatura está estable.", "Se acomoda solo en el plato y los hongos siguen dorados.", { seconds: 120, depends: ["mantecar"], avoid: ["No lo dejes esperando: sigue absorbiendo líquido."] })
    ],
    ["olla ancha", "olla pequeña para caldo", "sartén amplia", "cucharón", "rallador"],
    { decisions: ["Hongos por tandas", "Caldo siempre caliente", "Mantecatura fuera del fuego"], storage: "Refrigerar hasta dos días y reutilizar como croquetas.", reheat: "Con caldo a fuego bajo, aceptando una textura más ligada." }
  )
];
