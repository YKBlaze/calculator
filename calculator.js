let runninTotal = 0;
let previousOperator = null;
let buffer = "0";
const MAX = 12;
const display = document.querySelector(".calculator__display-text");

document
 .querySelector(".calculator__button-container")
 .addEventListener("click", function(event) {
    buttonClick(event.target.innerText);
});

function buttonClick(value)
{
    if (isNaN(parseInt(value))) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    rerender();
}
function handleSymbol(value){
  switch(value) {
      case 'C':
          buffer = "0";
          runninTotal = 0;
          break;
      case '=':
        if (previousOperator === null) {
          return;
        }
        if (previousOperator !== null && buffer === "0") {
            return;
          }
        flushOperation(parseInt(buffer));
        previousOperator = null;
        buffer = "" + runninTotal;
        break;
      case "←":
          if (buffer.length === 1){
              buffer = "0"
          } else {
            buffer = buffer.substring(0, buffer.length - 1);
          }
          break;
      default:
          handleMath(value);
          break;
  }
}
function handleNumber(value){
 if (buffer === "0"){
     buffer = value;
 } else {
     buffer += value;
 }
 rerender();
}
function rerender() {
    if (buffer.length > MAX){
        buffer = buffer.substring(0, MAX);
    }
    display.innerText = buffer;
}
function handleMath(value) {
    const intBuffer = parseInt(buffer);
    if (runninTotal === 0){
        runninTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }
    previousOperator = value;
    buffer = "0";
}
function flushOperation(intBuffer) {    
    if (previousOperator === "+"){
        runninTotal += intBuffer;
    } else if (previousOperator === "-") {
        runninTotal -= intBuffer;
    } else if (previousOperator === "%") {
        runninTotal /= intBuffer;
    } else if (previousOperator === "x") {
        runninTotal *= intBuffer;
    }
}