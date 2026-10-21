import type { MiseRecipe } from "../types";
import { makeRecipe as recipe, makeStep as step } from "./recipeFactory";

export const dessertRecipes: MiseRecipe[] = [
  recipe(
    "flan",
    "Flan casero con caramelo ámbar",
    "Flan liso y tembloroso, sin burbujas grandes, con caramelo profundo y dulce de leche servido con medida.",
    8,
    [["dessert", "Flan", "dessert"], ["sauce", "Caramelo ámbar", "sauce"], ["topping", "Servicio", "topping"]],
    [
      ["azucar", "azúcar", 220, "g", "seasoning"], ["leche", "leche entera", 750, "ml", "dairy"],
      ["huevos", "huevos", 6, "unidades", "dairy"], ["vainilla", "vainilla", 1, "cdta", "seasoning"],
      ["limon", "piel de limón", 2, "tiras", "vegetable", true], ["dulce", "dulce de leche", 250, "g", "dairy", true],
      ["sal", "sal", 1, "pizca", "seasoning"]
    ],
    [
      step("mise", "dessert", "Preparar baño y molde", "Elegí una fuente donde entre la flanera, calentá agua y dejá colador, jarra y guantes listos.", [], "El horno todavía está frío.", "El molde entra estable en la fuente y el agua caliente está preparada.", { avoid: ["Preparar el baño después del caramelo obliga a trabajar apurado."] }),
      step("caramelo", "sauce", "Llevar a ámbar", "Fundí el azúcar del caramelo en una olla limpia, moviendo solo la olla. Retirá al llegar a ámbar cobrizo.", [["azucar", 120, "g"]], "La flanera está seca y sobre una superficie resistente.", "El caramelo es ámbar, fluido y no desprende humo.", { heat: "medio", seconds: 480, depends: ["mise"], cues: [["visual", "Color de miel oscura, no marrón negro."], ["smell", "Huele tostado y limpio."]], avoid: ["No lo pruebes ni toques: una quemadura de caramelo es grave."], rescues: [["Se cristaliza", "Tapá unos segundos para que el vapor disuelva cristales; no revuelvas."], ["Humea oscuro", "Descartalo con seguridad cuando enfríe y empezá de nuevo."]] }),
      step("molde", "sauce", "Acaramelar el molde", "Volcá y girá la flanera con guantes para cubrir base y parte de los lados. Dejá endurecer.", [], "El caramelo alcanzó el color correcto.", "Hay una película pareja sin acumulación gruesa.", { depends: ["caramelo"], avoid: ["El molde queda muy caliente; usá protección."] }),
      step("leche", "dessert", "Entibiar y perfumar", "Calentá leche con piel de limón si la usás. Apagá antes de hervir e infusioná cinco minutos.", [["leche", 750, "ml"], ["limon", 2, "tiras"]], "El molde está acaramelado.", "La leche larga vapor suave y toma perfume.", { heat: "bajo", seconds: 300, depends: ["molde"] }),
      step("mezcla", "dessert", "Unir sin incorporar aire", "Mezclá huevos, azúcar restante, vainilla y sal con calma. Sumá leche tibia en hilo.", [["huevos", 6, "unidades"], ["azucar", 100, "g"], ["vainilla", 1, "cdta"], ["sal", 1, "pizca"]], "La leche está tibia, no hirviendo.", "La mezcla es uniforme y casi no tiene espuma.", { depends: ["leche"], avoid: ["No batas buscando volumen: el aire forma agujeros."], rescues: [["Hay espuma", "Reposá cinco minutos y retirala con cuchara."]] }),
      step("colar", "dessert", "Colar y montar el baño", "Colá dentro de la flanera. Ponela en la fuente y agregá agua caliente hasta media altura.", [], "La mezcla está homogénea.", "No quedan hebras de huevo y la flanera está estable.", { depends: ["mezcla"], avoid: ["Evitá que caiga agua dentro del flan."] }),
      step("hornear", "dessert", "Hornear suavemente", "Horneá a 150 °C. Empezá a revisar antes del tiempo y guiáte por el movimiento del centro.", [], "El baño está caliente y el horno estabilizado.", "Los bordes están firmes y el centro tiembla unido como gelatina.", { seconds: 3300, depends: ["colar"], cues: [["texture", "El centro tiembla unido, sin ondas líquidas."], ["visual", "La superficie sigue clara y sin globos grandes."]], avoid: ["El agua no debe hervir con violencia."], rescues: [["El baño hierve", "Agregá agua fría a la fuente y bajá el horno."]] }),
      step("enfriar", "dessert", "Enfriar en etapas", "Sacá la flanera del baño, enfriá a temperatura ambiente y refrigerá al menos cuatro horas.", [], "El centro tiene el punto correcto.", "Está completamente frío y firme.", { seconds: 14400, depends: ["hornear"], avoid: ["No desmoldes tibio: todavía no tiene estructura."] }),
      step("desmoldar", "topping", "Desmoldar y servir", "Pasá un cuchillo fino por el borde, calentá apenas la base y girá sobre una fuente con borde. Serví dulce aparte.", [["dulce", 250, "g"]], "El flan está bien frío.", "Cae entero, el caramelo fluye y el corte es liso.", { depends: ["enfriar"], rescues: [["No se despega", "Apoyá la base unos segundos en agua tibia."], ["Queda caramelo duro", "Disolvelo con una cucharada de agua caliente."]] })
    ],
    ["flanera", "fuente profunda", "colador fino", "olla", "jarra"],
    { decisions: ["Temperatura baja", "Mezcla sin batir", "Dulce de leche aparte"], storage: "Refrigerar cubierto hasta cuatro días.", reheat: "No recalentar; servir frío o atemperar diez minutos." }
  ),

  recipe(
    "torta-vasca",
    "Torta vasca de dulce de leche",
    "Superficie intensamente tostada, interior cremoso y un corazón argentino de dulce de leche que no invade cada bocado.",
    8,
    [["dessert", "Torta cremosa", "dessert"], ["topping", "Vetas de dulce de leche", "topping"]],
    [
      ["queso", "queso crema firme", 600, "g", "dairy"], ["crema", "crema de leche", 300, "ml", "dairy"],
      ["huevos", "huevos", 4, "unidades", "dairy"], ["azucar", "azúcar", 150, "g", "seasoning"],
      ["dulce", "dulce de leche repostero", 180, "g", "dairy"], ["harina", "harina 0000", 15, "g", "grain", true],
      ["sal", "sal", 1, "pizca", "seasoning"]
    ],
    [
      step("mise", "dessert", "Preparar horno e ingredientes", "Llevá queso, crema y huevos a temperatura ambiente. Pesá todo y precalentá el horno a 220 °C.", [["queso", 600, "g"], ["crema", 300, "ml"], ["huevos", 4, "unidades"]], "Una hora antes de hornear.", "Los ingredientes perdieron el frío intenso y el horno está estable.", { avoid: ["Ingredientes fríos producen grumos y obligan a batir."] }),
      step("molde", "dessert", "Forrar el molde", "Arrugá dos hojas de papel manteca, humedecelas apenas y forrá dejando bordes altos.", [], "El horno se está calentando.", "El papel se adapta y sobresale varios centímetros.", { depends: ["mise"], avoid: ["No recortes el borde: sostiene la torta cuando sube."] }),
      step("base", "dessert", "Alisar queso y azúcar", "Mezclá queso, azúcar y sal con espátula o batidor manual hasta que no haya vetas.", [["azucar", 150, "g"], ["sal", 1, "pizca"]], "El queso está blando.", "La base está lisa, pesada y sin aire visible.", { depends: ["mise"], avoid: ["No uses velocidad alta: no buscamos textura esponjosa."] }),
      step("huevos", "dessert", "Incorporar los huevos", "Agregá de a uno, integrando cada huevo antes del siguiente y raspando el bol.", [], "La base de queso está lisa.", "No quedan hebras de clara.", { depends: ["base"] }),
      step("crema", "dessert", "Terminar la mezcla", "Sumá crema en hilo. Si el queso es muy blando, tamizá harina e incorporala sin batir.", [["harina", 15, "g"]], "Los huevos están integrados.", "La mezcla cae en cinta gruesa y tiene pocas burbujas.", { depends: ["huevos"], rescues: [["Quedaron grumos", "Colá sin presionar espuma; no batas fuerte."]] }),
      step("dulce", "topping", "Distribuir el dulce", "Verté la mitad, repartí cucharadas frías de dulce lejos del borde y cubrí con el resto.", [["dulce", 180, "g"]], "Molde y mezcla están listos.", "El dulce queda en islas internas, no en una capa.", { depends: ["crema", "molde"], avoid: ["Una capa continua domina el sabor y dificulta el corte."] }),
      step("hornear", "dessert", "Hornear fuerte", "Horneá hasta que la superficie esté oscura y el centro todavía se mueva ampliamente como una pieza.", [], "El horno marca 220 °C.", "Arriba está café oscuro y un círculo central tiembla unido.", { heat: "220 °C", seconds: 2100, depends: ["dulce"], cues: [["visual", "Superficie muy tostada pero no carbonizada."], ["texture", "El centro se mueve como crema firme, no líquido."]], rescues: [["Se dora pronto", "Bajá una rejilla; no cubras."], ["Está pálida", "Usá grill uno o dos minutos vigilando."]] }),
      step("asentar", "dessert", "Enfriar y asentar", "Enfriá por completo en el molde y refrigerá cuatro horas. Sacá treinta minutos antes de servir.", [], "La torta salió alta y temblorosa.", "El centro es cremoso pero permite cortes con cuchillo caliente.", { seconds: 14400, depends: ["hornear"], avoid: ["Cortarla caliente hace que parezca cruda."] })
    ],
    ["molde desmontable de 20 cm", "papel manteca", "bol grande", "batidor manual", "balanza"],
    { decisions: ["Poco aire", "Dulce en islas", "Tostado intenso y centro móvil"], storage: "Refrigerar hasta cuatro días.", reheat: "No recalentar; atemperar treinta minutos." }
  )
];
