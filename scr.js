let A=0;
let B=0;
//buttons + -
const sumButton = document.querySelector("#sum");
const subButton = document.querySelector("#sub");
//input for numbers
const numsInput = document.querySelector("input");

//chage state of a button to pressed
//unpress other buttons , of same type?
const pressButton = (e) => {
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
//add event listener for buttons
sumButton.addEventListener("click", pressButton);
subButton.addEventListener("click", pressButton);



//
const flushNum = (e) => {
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
//event listener to update A or B when input numbers    
numsInput.addEventListener("keyup", flushNum)



function isOperatorPressed (){
    const operators =  document.querySelectorAll(".operator");
    let res = Array.prototype.some.call(operators, (op) => {
        return op.classList.contains("pressed");
    });

    return res;
}

