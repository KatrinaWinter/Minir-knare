// Element vi uppdaterar och alla knappar vi lyssnar på
let display = document.querySelector("#display");
let buttons = document.querySelectorAll(".calc-btn");

// "Minnet" i kalkylatorn (state) — värden som ska finnas kvar mellan klick
let previousNumber = ""; // talet före operatorn (t.ex. första "1" i 1 + 2)
let currentNumber = "0"; // talet användaren skriver nu (visas på display)
let activeOperator = null; // vilken operator som väntar (+ i level 1-mallen)
// let displayText = ""; // talet som visas på display skärmen

// .addEventListener("click",);

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

  // Hanterar siffror (klistrar ihop eller ersätter nollan)
  function handleNumber(val) {
    if (currentNumber === "0") {
      currentNumber = val;
    } else if (val === "." && currentNumber.includes(".")) {
      return;
    } else {
      currentNumber += val;
    }
    display.innerText = currentNumber;
  }

  // Sparar operatorn och flyttar det första talet till "bakfickan"
  function handlePlus() {
    activeOperator = "+";
    previousNumber = currentNumber;
    currentNumber = "0";
    display.innerText = "0";
  }

  function handleMinus() {
    activeOperator = "-";
    previousNumber = currentNumber;
    currentNumber = "0";
    display.innerText = "0";
  }

  function handleTimes() {
    activeOperator = "*";
    previousNumber = currentNumber;
    currentNumber = "0";
    display.innerText = "0";
  }

  function handleDivide() {
    activeOperator = "/";
    previousNumber = currentNumber;
    currentNumber = "0";
    display.innerText = "0";
  }

  function handleRoot() {
    let result = Number(currentNumber) ** 2;
    display.innerText = result;
    currentNumber = String(result);
  }

  function handleSquare() {
    let result = Math.sqrt(Number(currentNumber));
    display.innerText = result;
    currentNumber = String(result);
  }

  // Utför själva uträkningen när användaren trycker på lika med
  function handleCalculate() {
    if (activeOperator === "+") {
      let result = Number(previousNumber) + Number(currentNumber);
      display.innerText = result;
      currentNumber = String(result); // Gör om till sträng för att kunna skriva vidare
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
      let result = Number(previousNumber) / Number(currentNumber);
      display.innerText = result;
      currentNumber = String(result);
      activeOperator = null;
    }
  }
}
