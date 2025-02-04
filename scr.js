const MAX_DISPLAY_LENGHT = 8;
//operator buttons
const operatorButtons = document.querySelectorAll(".operator");
//input for numbers
const DISPLAY = document.querySelector(".display");
//numbers keys 
const NUMERIC_KEYS = document.querySelector("#numerics");

const ENTER_KEY = document.querySelector("#enter")
//let currentOperator = "";

//Ds for saving operands
//Fixed size queue , max size 2
//if already full, make operation the insert the result
const OPERANDS_QUEUE = {
    queue:[],
    max_size:2,
    insert: function  (n) {
        if (this.queue.length >= this.max_size){
            this.queue.unshift(this.operate());
        }
        this.queue.unshift(n);
    },

    operate: function (){
        if (this.queue.length < 2){
            return this.queue.pop();
        }
        let a = this.queue.pop();
        let b = this.queue.pop();
        switch (currentOperator) {
            case "+":
                return a + b;
            case "*":
                return a * b;
                
            case "-":
                return a - b;
                
            case "/":
                if (b === 0){
                    return "Error";
                }

                return a / b;
                        }
    }
}





//add event listener for opreators buttons
operatorButtons.forEach((b) => {
    b.addEventListener("click", pressButton);
})

//event listener to update A or B when input numbers    
DISPLAY.addEventListener("keyup", flushNumber);

//event listener for numeric keys
NUMERIC_KEYS.addEventListener("click", pressNumber);

//event listener for enter key
ENTER_KEY.addEventListener("click",() => {
    OPERANDS_QUEUE.insert(getNumberFromDisplay());
    operate();
})





//chage state of a button to pressed
//unpress other buttons , of same type?
function pressButton (e){

    console.log(OPERANDS_QUEUE);

    //add press state
    const boton = e.target;
    currentOperator = boton.value;
    //insert value in operands queue
    const numberInDisplay = Number(DISPLAY.textContent);
    OPERANDS_QUEUE.insert(numberInDisplay);
    
    console.log(OPERANDS_QUEUE);
    if(boton.classList.contains("pressed")){
        return;
    }
    boton.classList.add("pressed");
    //remove press state from other buttons
    const otherButtons = Array.from(document.querySelectorAll(".operator"));        
    otherButtons.splice(otherButtons.indexOf(boton),1);
    otherButtons.forEach( (b) => {
            b.classList.remove("pressed");
    });    
}




//
function flushNumber (e) {
    //get number from input field
    let inputNumber = Number(e.target.value);
    //check buttons
    if (isOperatorPressed()){
        B = inputNumber;
    } else {
        A = inputNumber;
    }

    console.log("A : " + A);
    console.log("B : " + B);
};




function isOperatorPressed (){
    const operators =  document.querySelectorAll(".operator");
    let res = Array.prototype.some.call(operators, (op) => {
        return op.classList.contains("pressed");
    });

    return res;
}

function pressNumber(e) {
    const target = e.target;
    const currentDisplayed = Number(DISPLAY.textContent);
    
    if (target.tagName != "BUTTON"){
        return;
    }
    if(isNaN(currentDisplayed) | currentDisplayed === 0){
        toDisplay("");
    }
    if (isDisplayFull()) {
        return;
    }
    const number = target.value;
    if (!isOperatorPressed()){
        DISPLAY.textContent += number;
        return;
    }
    toDisplay(number)


    //remove operator pressing state
    //remove press state from other buttons
    const otherButtons = Array.from(document.querySelectorAll(".operator"));        
    otherButtons.forEach( (b) => {
            b.classList.remove("pressed");
    });
}

function isDisplayFull(){
    return DISPLAY.textContent.length >=MAX_DISPLAY_LENGHT;
}

function toDisplay(n){
    DISPLAY.textContent = n;
}

function operate(){
    let result = OPERANDS_QUEUE.operate();
    toDisplay(result);
}

function getNumberFromDisplay(){
    return Number(DISPLAY.textContent);
}

