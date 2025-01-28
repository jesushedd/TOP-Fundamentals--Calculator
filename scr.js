const MAX_DISPLAY_LENGHT = 8;

let currentOperator = "";

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
                return a / b;
                        }
    }
}


//buttons + -
const sumButton = document.querySelector("#sum");
const subButton = document.querySelector("#sub");
//input for numbers
const DISPLAY = document.querySelector(".display");
//numbers keys
const NUMERIC_KEYS = document.querySelector("#numerics");


//add event listener for buttons
sumButton.addEventListener("click", pressButton);
subButton.addEventListener("click", pressButton);

//event listener to update A or B when input numbers    
DISPLAY.addEventListener("keyup", flushNumber);

//event listener for numeric keys
NUMERIC_KEYS.addEventListener("click", pressNumber);





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
    
    if (target.tagName != "BUTTON"){
        return;
    }

    if (isDisplayFull()) {
        return;
    }
    const number = target.value;
    if (!isOperatorPressed()){
        DISPLAY.textContent += number;
        return;
    }
    //clear display
    DISPLAY.textContent = "";
    
    DISPLAY.textContent = target.value;


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

