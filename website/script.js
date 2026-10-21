const demoSteps = [
  {
    component: "SALSA",
    action: "MEZCLÁ TAMARINDO, MIEL, SOJA, AJO Y JENGIBRE ANTES DE ENCENDER EL FUEGO.",
    cue: "La miel esté completamente disuelta.",
    label: "PREPARAR SALSA",
    time: 0,
    chips: [["sauce", "TAMARINDO · 2 cdas"], ["spice", "JENGIBRE · 2 cdtas"]]
  },
  {
    component: "POLLO",
    action: "DORÁ EL POLLO HASTA QUE LA COSTRA SUENE SECA AL TOCARLA.",
    cue: "La superficie esté dorada y se despegue sola.",
    label: "DORAR POLLO",
    time: 240,
    chips: [["protein", "POLLO · 500 g"], ["spice", "SAL · a gusto"]]
  },
  {
    component: "SALSA",
    action: "BAJÁ EL FUEGO, AGREGÁ EL LACADO Y MOVÉ HASTA QUE ABRACE CADA TROZO.",
    cue: "La salsa deje un trazo limpio al pasar la cuchara.",
    label: "LACAR",
    time: 150,
    chips: [["sauce", "LACADO · todo"], ["protein", "POLLO DORADO"]]
  },
  {
    component: "TERMINACIÓN",
    action: "SERVÍ EL POLLO SOBRE EL ARROZ Y TERMINÁ CON VERDEO Y SÉSAMO.",
    cue: "La salsa siga brillante y el arroz esté caliente.",
    label: "SERVIR",
    time: 0,
    chips: [["garnish", "ARROZ · 190 g"], ["garnish", "VERDEO · un poco"]]
  }
];

const number = document.querySelector("#demoNumber");
const component = document.querySelector("#demoComponent");
const action = document.querySelector("#demoAction");
const cue = document.querySelector("#demoCue");
const chips = document.querySelector("#demoChips");
const doneButton = document.querySelector("#demoDone");
const timerLabel = document.querySelector("#timerLabel");
const timerValue = document.querySelector("#timerValue");
const timerToggle = document.querySelector("#timerToggle");
const timerAdd = document.querySelector("#timerAdd");
const routeButtons = [...document.querySelectorAll(".route-step")];

let activeIndex = 1;
let isDone = false;
let timerSeconds = demoSteps[activeIndex].time;
let timerHandle;

function formatTime(total) {
  const minutes = Math.floor(total / 60).toString().padStart(2, "0");
  const seconds = Math.max(0, total % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function stopTimer() {
  window.clearInterval(timerHandle);
  timerHandle = undefined;
  timerToggle.textContent = timerSeconds > 0 ? "INICIAR" : "LISTO";
}

function renderStep(index) {
  activeIndex = index;
  isDone = routeButtons[index].classList.contains("done");
  const step = demoSteps[index];
  number.textContent = String(index + 1).padStart(2, "0");
  component.textContent = step.component;
  action.textContent = step.action;
  cue.textContent = step.cue;
  timerLabel.textContent = step.label;
  timerSeconds = step.time;
  timerValue.textContent = formatTime(timerSeconds);
  doneButton.textContent = isDone ? "✓ HECHO" : "PENDIENTE";
  doneButton.classList.toggle("is-done", isDone);
  timerToggle.disabled = timerSeconds === 0;
  timerToggle.textContent = timerSeconds === 0 ? "SIN RELOJ" : "INICIAR";
  chips.replaceChildren(...step.chips.map(([kind, text]) => {
    const chip = document.createElement("span");
    const symbol = document.createElement("i");
    symbol.className = kind;
    chip.append(symbol, document.createTextNode(text));
    return chip;
  }));
  routeButtons.forEach((button, buttonIndex) => button.classList.toggle("active", buttonIndex === index));
  stopTimer();
}

routeButtons.forEach((button, index) => button.addEventListener("click", () => renderStep(index)));

doneButton.addEventListener("click", () => {
  isDone = !isDone;
  const routeButton = routeButtons[activeIndex];
  routeButton.classList.toggle("done", isDone);
  routeButton.querySelector("i").textContent = isDone ? "✓" : "○";
  doneButton.textContent = isDone ? "✓ HECHO" : "PENDIENTE";
  doneButton.classList.toggle("is-done", isDone);
});

timerToggle.addEventListener("click", () => {
  if (timerHandle) {
    stopTimer();
    timerToggle.textContent = "SEGUIR";
    return;
  }
  if (timerSeconds <= 0) return;
  timerToggle.textContent = "PAUSAR";
  timerHandle = window.setInterval(() => {
    timerSeconds -= 1;
    timerValue.textContent = formatTime(timerSeconds);
    if (timerSeconds <= 0) stopTimer();
  }, 1000);
});

timerAdd.addEventListener("click", () => {
  timerSeconds += 30;
  timerValue.textContent = formatTime(timerSeconds);
  timerToggle.disabled = false;
  if (!timerHandle) timerToggle.textContent = "INICIAR";
});
