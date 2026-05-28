// Element vi uppdaterar och alla knappar vi lyssnar på
let display = document.querySelector("#display");
let buttons = document.querySelectorAll(".calc-btn");

// "Minnet" i kalkylatorn (state) — värden som ska finnas kvar mellan klick
let previousNumber = ""; // talet före operatorn (t.ex. första "1" i 1 + 2)
let currentNumber = "0"; // talet användaren skriver nu (visas på display)
let activeOperator = null; // vilken operator som väntar (+ i level 1-mallen)
// let displayText = ""; // talet som visas på display skärmen

// Samma mönster som i lektion del 3: en lyssnare per knapp
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function (e) {
    // data-value="1" i HTML → dataset.value === "1" här
    let val = e.target.dataset.value;

    // --- Tömma / nollställa (C) ---
    if (val === "C") {
      previousNumber = "";
      currentNumber = "0";
      activeOperator = null;
      display.innerText = "0";
    }
    // --- Plus: spara första talet och börja skriva nästa ---
    else if (val === "+") {
      if (activeOperator === "+") {
        // Kollar först om det redan fins en delsumma att jobba med
        let result = Number(previousNumber) + Number(currentNumber);
        display.innerText = result;
        currentNumber = String(result); // resultatet blir nytt "nuvarande tal"
        activeOperator = null;
        previousNumber = String(result);
      }
      //  Kör addition
      activeOperator = "+";
      previousNumber = currentNumber; // det som stod på display blir "första talet"
      currentNumber = "0"; // nästa siffertal byggs upp från noll
      display.innerText = previousNumber;
    }
    // --- Minus: spara första talet och börja skriva nästa ---
    else if (val === "-") {
      if (activeOperator === "-") {
        // Kollar först om det redan fins en delsumma att jobba med
        let result = Number(previousNumber) - Number(currentNumber);
        display.innerText = result;
        currentNumber = String(result);
        activeOperator = null;
        previousNumber = String(result);
      }
      //  Kör subtraktion
      activeOperator = "-";
      previousNumber = currentNumber;
      currentNumber = "0";
      display.innerText = previousNumber;
    }
    // --- Gånger: spara första talet och börja skriva nästa ---
    else if (val === "*") {
      if (activeOperator === "*") {
        // Kollar först om det redan fins en delsumma att jobba med
        let result = Number(previousNumber) * Number(currentNumber);
        display.innerText = result;
        currentNumber = String(result);
        activeOperator = null;
        previousNumber = String(result);
      }
      //  Kör multiplikation
      activeOperator = "*";
      previousNumber = currentNumber;
      currentNumber = "0";
      display.innerText = previousNumber;
    }
    // --- Divition: spara första talet och börja skriva nästa ---
    else if (val === "/") {
      // Kollar först om det redan fins en delsumma att jobba med
      if (activeOperator === "/") {
        let result = Number(previousNumber) / Number(currentNumber);
        display.innerText = result;
        currentNumber = String(result);
        activeOperator = null;
        previousNumber = String(result);
      }
      //  Kör divition
      activeOperator = "/";
      previousNumber = currentNumber;
      currentNumber = "0";
      display.innerText = previousNumber;
    }
    // --- Kvadrat: spara första talet och börja skriva nästa ---
    else if (val === "**2") {
      //  Kör kvadraten
      let result = Number(currentNumber) ** 2;
      display.innerText = result;
      currentNumber = String(result);
    }
    // --- Roten: spara första talet och börja skriva nästa ---
    else if (val === "sqrt") {
      //  Kör kvadraten
      let result = Math.sqrt(Number(currentNumber));
      display.innerText = result;
      currentNumber = String(result);
    }

    // --- Lika med: räkna ut om vi har en aktiv + - * /
    else if (val === "=") {
      if (activeOperator === "+") {
        // Tal lagras som strängar — Number() gör om till tal innan addition
        let result = Number(previousNumber) + Number(currentNumber);
        display.innerText = result;
        currentNumber = String(result); // resultatet blir nytt "nuvarande tal"
        activeOperator = null;
        previousNumber = null;
      } else if (activeOperator === "-") {
        // = förstår att det handlar om subtraction
        let result = Number(previousNumber) - Number(currentNumber);
        display.innerText = result;
        currentNumber = String(result);
        activeOperator = null;
        previousNumber = null;
      } else if (activeOperator === "*") {
        // = förstår att det handlar om multiplikation
        let result = Number(previousNumber) * Number(currentNumber);
        display.innerText = result;
        currentNumber = String(result);
        activeOperator = null;
        previousNumber = null;
      } else if (activeOperator === "/") {
        // = förstår att det handlar om divition
        let result = Number(previousNumber) / Number(currentNumber);
        display.innerText = result;
        currentNumber = String(result);
        activeOperator = null;
        previousNumber = null;
      }
    }
    // --- Siffror 1, 2, 3 ---
    else {
      if (currentNumber === "0") {
        currentNumber = val; // ersätt startnollan
      } else {
        currentNumber += val; // bygg flersiffrigt tal: "1" + "2" → "12"
      }
      display.innerText = currentNumber;
    }
  });
}
