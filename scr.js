const MAX_DISPLAY_LENGHT = 8;
let A=0;
let B=0;
//buttons + -
const sumButton = document.querySelector("#sum");
const subButton = document.querySelector("#sub");
//input for numbers
const display = document.querySelector(".display");
//numbers keys
const numericKeys = document.querySelector("#numerics");


//add event listener for buttons
sumButton.addEventListener("click", pressButton);
subButton.addEventListener("click", pressButton);

//event listener to update A or B when input numbers    
display.addEventListener("keyup", flushNumber);

//event listener for numeric keys
numericKeys.addEventListener("click", pressNumber);





//chage state of a button to pressed
//unpress other buttons , of same type?
function pressButton (e){
    //add press state
    const boton = e.target;
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
        display.textContent += number;
        return;
    }
    //clear display
    display.textContent = "";
    
    display.textContent = target.value;


    //remove operator pressing state
    //remove press state from other buttons
    const otherButtons = Array.from(document.querySelectorAll(".operator"));        
    otherButtons.forEach( (b) => {
            b.classList.remove("pressed");
    });
}

function isDisplayFull(){
    return display.textContent.length >=MAX_DISPLAY_LENGHT;
}

