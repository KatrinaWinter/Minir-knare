// Element vi uppdaterar och alla knappar vi lyssnar på
let display = document.querySelector("#display");
let buttons = document.querySelectorAll(".calc-btn");

// "Minnet" i kalkylatorn (state) — värden som ska finnas kvar mellan klick
let previousNumber = ""; // talet före operatorn (t.ex. första "1" i 1 + 2)
let currentNumber = "0"; // talet användaren skriver nu (visas på display)
let activeOperator = null; // vilken operator som väntar (+ i level 1-mallen)
// let displayText = ""; // talet som visas på display skärmen
let justCalculated = false;

// Samma mönster som i lektion del 3: en lyssnare per knapp
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function (e) {
    // data-value="1" i HTML → dataset.value === "1" här
    let val = e.target.dataset.value;

    // Vägskäl: Vilken typ av knapp klickades?
    if (val === "C") {
      handleReset();
    } else if (val === "+") {
      handlePlus();
    } else if (val === "-") {
      handleMinus();
    } else if (val === "*") {
      handleTimes();
    } else if (val === "/") {
      handleDivide();
    } else if (val === "**2") {
      handleRoot();
    } else if (val === "sqrt") {
      handleSquare();
    } else if (val === "=") {
      handleCalculate();
    } else {
      handleNumber(val);
    }
  });

  // Nollställer hela minnet och displayen
  function handleReset() {
    previousNumber = "";
    currentNumber = "0";
    display.innerText = "0";
    activeOperator = null;
  }

  // Dörrvakt
  function buttonGuard(disabled) {
    for (let i = 0; i < buttons.length; i++) {
      let value = buttons[i].dataset.value;

      if (
        value === "+" ||
        value === "-" ||
        value === "*" ||
        value === "/" ||
        value === "**2" ||
        value === "sqrt" ||
        value === "="
      ) {
        buttons[i].disabled = disabled;
      }
    }
  }

  //   Tar bort repitation från matten
  function mathShortcut(operator) {
    let result;
    if (operator === "+") {
      result = Number(previousNumber) + Number(currentNumber);
    } else if (operator === "-") {
      result = Number(previousNumber) - Number(currentNumber);
    } else if (operator === "*") {
      result = Number(previousNumber) * Number(currentNumber);
    } else if (operator === "/") {
      result = Number(previousNumber) / Number(currentNumber);
    }
    display.innerText = result;
    previousNumber = String(result);
    currentNumber = "0";
  }

  // Hanterar siffror (klistrar ihop eller ersätter nollan)
  function handleNumber(val) {
    buttonGuard(false);
    if (justCalculated) {
      currentNumber = val;
      justCalculated = false;
      display.innerText = currentNumber;
      return;
    }
    if (currentNumber === "0") {
      currentNumber = val;
    } else if (val === "." && currentNumber.includes(".")) {
      // hanterar decimaler
      return;
    } else {
      currentNumber += val;
    }
    display.innerText = currentNumber;
  }

  // Sparar operatorn och flyttar det första talet till "bakfickan"

  function handlePlus() {
    buttonGuard(true);
    if (activeOperator !== null) {
      mathShortcut(activeOperator);
    } else {
      previousNumber = currentNumber;
      currentNumber = "0";
    }
    activeOperator = "+";
  }

  function handleMinus() {
    buttonGuard(true);
    if (activeOperator !== null) {
      mathShortcut(activeOperator);
    } else {
      previousNumber = currentNumber;
      currentNumber = "0";
    }
    activeOperator = "-";
  }

  function handleTimes() {
    buttonGuard(true);
    if (activeOperator !== null) {
      mathShortcut(activeOperator);
    } else {
      previousNumber = currentNumber;
      currentNumber = "0";
    }
    activeOperator = "*";
  }

  function handleDivide() {
    buttonGuard(true);
    if (activeOperator !== null) {
      mathShortcut(activeOperator);
    } else {
      previousNumber = currentNumber;
      currentNumber = "0";
    }
    activeOperator = "/";
  }

  function handleRoot() {
    buttonGuard(true);
    let result = Number(currentNumber) ** 2;
    display.innerText = result;
    currentNumber = String(result);
  }

  function handleSquare() {
    buttonGuard(true);
    let result = Math.sqrt(Number(currentNumber));
    display.innerText = result;
    currentNumber = String(result);
  }

  // Utför själva uträkningen när användaren trycker på lika med
  function handleCalculate() {
    buttonGuard(true);
    if (activeOperator === "+") {
      let result = Number(previousNumber) + Number(currentNumber);
      display.innerText = result;
      currentNumber = String(result); // Gör om till sträng för att kunna skriva vidare
      justCalculated = true;
      activeOperator = null;
    } else if (activeOperator === "-") {
      let result = Number(previousNumber) - Number(currentNumber);
      display.innerText = result;
      currentNumber = String(result);
      activeOperator = null;
    } else if (activeOperator === "*") {
      let result = Number(previousNumber) * Number(currentNumber);
      display.innerText = result;
      currentNumber = String(result);
      activeOperator = null;
    } else if (activeOperator === "/") {
      if (currentNumber === "0") {
        display.innerText = "Error";
        activeOperator = null;
        return;
      }
      let result = Number(previousNumber) / Number(currentNumber);
      display.innerText = result;
      currentNumber = String(result);
      activeOperator = null;
    }
  }
  buttonGuard(true);
}
