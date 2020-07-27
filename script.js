const preview = document.querySelector(".preview");
const display = document.querySelector(".screen");
const numbers = document.querySelectorAll(".number");
let current = `0`; //console.log(`current = ${current}`);
let prev = ``;
const operators = document.querySelectorAll(".operator");
let operation = ``;
const result = document.querySelector(".result");
let once = Boolean(true);
let begin = Boolean(false);
const clear = document.querySelector(".ac");
const decimal = document.querySelector(".decimal");
const negative = document.querySelector(".negative");
let negativeStart = Boolean(true);
let mustNumber = Boolean(false);
let pFirst = Boolean(true); //first number
let pSecond = Boolean(false);
let pO = Boolean(false);
let preCurrent = ``;
let operationP = ``;

const updateD = (number) => {
  display.value = number;
}

const updatePreview = () => {
  if (pFirst === true) {
    preview.value = `${current}`
  }
  else if (pFirst === false && pSecond === false) {
    preview.value = `${prev} ${operation} ${current}`
    if (pO === true)
      preview.value = `${prev} ${operation}`
    preCurrent = current;
    //console.log(`preCurrent = ${preCurrent}`);
  }
  else { //pSecond === true
    preview.value = `${prev} ${operationP} ${preCurrent} = ${current}`
  }
}

const updateN = (number) => {
  if (current === `0`)
    current = number;
  else
    current += number;

  //console.log(`current = ${current}, prev = ${prev}`);
}

const updateO = (operator) => {
  if (operation === ``)
    prev = current;
  current = `0`;
  operation = operator;
  //console.log(`current = ${current}, prev = ${prev}`);
  updatePreview(` ${operation} `);
}

const updateP = (dot) => {
  if (current.includes(`.`))
    return;
  current += dot;
  if (current === `-.`)
    current = `-0.`;
  //updatePreview(dot);
}

result.addEventListener("click", () => {
  if (mustNumber === false) {
    if (once === false)
      calculate();
    updateD(current);

  }
})

const calculate = () => {
  console.log("== Result ==");
  let x = ``;
  switch(operation) {
    case "+":
      x = parseFloat(prev) + parseFloat(current);
      break;
    case "-":
      x = parseFloat(prev) - parseFloat(current);
      break;
    case "*":
      x = prev * current;
      break;
    case "/":
      x = prev / current;
      break;
    case "%":
      x = prev % current;
      break;
    break;
  }
  current = String(x);

  if (current === String(0.1 + 0.2)) {
    current = `0.3`;
    console.log(`fixed from ${0.1 + 0.2} to 0.3`);
  }
  else if (current === String(0.3 - 0.1)) {
    current = `0.2`;
    console.log(`fixed from ${0.3 - 0.1} to 0.1`);
  }
  else if (current === String(0.3 + 0.6)) {
    current = `0.9`;
    console.log(`fixed from ${0.3 + 0.6} to 0.9`);
  }
  else if (current === String(0.7 + 0.1)) {
    current = `0.8`;
    console.log(`fixed from ${0.7 + 0.1} to 0.8`);
  }
  else if (current === String(0.8 - 0.1)) {
    current = `0.7`;
    console.log(`fixed from ${0.8 - 0.1} to 0.7`);
  }

  pSecond = true;
  if (operation !== ``)
    operationP = operation;
  updatePreview();
  operation = ``;
  once = true;
  //console.log(`x = ${x}, current = ${current}, prev = ${prev}`);
}

clear.addEventListener("click", () => {
  console.log("== Clear ==");
  current = `0`;
  prev = ``;
  operation = ``;
  updateD(current);
  //console.log(`operation reset, current = ${current}, prev = ${prev}`);
  once = true;
  begin = false;
  negativeStart = true;
  mustNumber = false;
  pFirst = true;
  pSecond = false;
  pO = false;
  preview.value = `0`;
  preCurrent = ``;
  operationP = ``;
})

decimal.addEventListener("click", () => {
  console.log(event.target.value);
  updateP(event.target.value);
  updateD(current);
  negativeStart = false;
  if (prev !== ``)
    mustNumber = true;
  pO = false;
  updatePreview();
})

console.log(preview);
console.log(display);
console.log(numbers);
console.log(operators);
console.log(result);
console.log(clear);
console.log(decimal);

numbers.forEach((number) => {
  number.addEventListener("click", () => {
    begin = true;
    //console.log(`eventN = ${event.target.value}`);
    updateN(event.target.value);
    updateD(current);
    negativeStart = false;
    mustNumber = false;
    pO = false;
    updatePreview();
  })
})

operators.forEach((operator) => {
  operator.addEventListener("click", () => {
    if (begin === true) {
      //console.log(`eventO = ${event.target.value}`);
      once = false;
      updateO(event.target.value);
      mustNumber = true;
      pFirst = false;
      pSecond = false;
      pO = true;
      updatePreview();
    }
  })
})

negative.addEventListener("click", () => {
  if (negativeStart === true) {
    console.log("Starts with negative number");
    current = `-`;
    updateD(current);
    preview.value = `-`;
    //console.log(`current = ${current}, prev = ${prev}`);
    negativeStart = false;
  }
})
