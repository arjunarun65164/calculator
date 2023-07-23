//add a shadow effect to the calculator container
//hovering needs to have some effect over the buttons
//need to be able to use the operations/numbers thorugh keyboard as well
//keep an Ans variable to add on previous answers

//add a mini text in the top left showing everything that was written

function operate(num1, operator, num2){
    num1 = Number(num1);
    num2 = Number(num2);
    if (operator === "+"){
        return num1+num2;
    }
    else if (operator === "-"){
        return num1-num2;
    }
    else if (operator === "*"){
        return num1*num2;
    }
    else if (operator === "/"){
        return num1/num2;
    }
}

let display = document.querySelector(".answer-screen");
const numbers = document.querySelectorAll(".num");
let inputArray = [];
let operators = ['*', '-', '+', '/'];
let lastPress;

document.addEventListener('keydown', keyDown)
function keyDown(e){
    buttons = document.querySelectorAll("button");
    let finished = false;
    buttons.forEach(button => {
        if (finished){
            return;
        }
        if (e.key === button.innerText){
            button.click();
            return;
        }
        if (e.key === "Enter"){
            document.querySelector(".equals").click();
            finished = true;
            return;
        }
        if (e.key === "Backspace"){ //if the display is empty, call the clear function, otherwise reduce the display by one
            display.innerText = display.innerText.slice(0, -1);
            finished = true;
            return;
        }
    })
}

//Adds numbers to the display when they are clicked
numbers.forEach(number => number.addEventListener('click', changeDisplay));
function changeDisplay(){
    if (lastPress === "equals"){
        clearDisplay();
        inputArray.length = 0;
    }

    let number = this.innerText;
    console.log(number);
    display.innerText = display.innerText + number;
    lastPress = "number";
}

//clears the display when the Clear button is clicked
const clear = document.querySelector(".clear");
clear.addEventListener('click', () => {
    clearDisplay();
    inputArray.length = 0;
});

function clearDisplay() {
    display.innerText = "";
}

//if an operator is pressed, the previous number and the operator are pushed onto the array
const operations = document.querySelectorAll(".op");
operations.forEach(operation => operation.addEventListener('click', clickOperation));
function clickOperation(){
    //make all the other buttons white
    //make this button orange 
    //push this number and operator onto the array
    if (lastPress === "operator"){
        return;
    }

    console.log("clicked");
    let number = display.innerText;
    let operator = this.innerText;
    clearDisplay();
    inputArray.push(number);
    inputArray.push(operator);
    lastPress = "operator";
}

//if the equal button is pressed, store the display number and perform all the operations in the array
const equal = document.querySelector(".equals");
equal.addEventListener("click", () => {
    //if the last button clicked was an operator ignore the button click
    if (lastPress === "operator"){
        return;
    }

    inputArray.push(display.innerText);
    display.innerText = "";
    console.log(inputArray);


    //Calculate the result of all the calculations
    let result = Number(inputArray[0]);
    for (let index = 2; index < inputArray.length; index = index+2){
        result = operate(result, inputArray[index-1], inputArray[index]);
    }
    inputArray.length = 0;
    display.innerText = result;

    lastPress = "equals";
})