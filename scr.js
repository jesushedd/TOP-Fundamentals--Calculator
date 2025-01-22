let A=0;
let B=0;
//buttons + -
const sumButton = document.querySelector("#sum");
const subButton = document.querySelector("#sub");
//input for numbers
const numsInput = document.querySelector("input");

//add event listener for buttons
const updatePressed = (e) => {
    const boton = e.target;
    boton.classList.toggle("pressed"); 
}
sumButton.addEventListener("click", updatePressed);
subButton.addEventListener("click", updatePressed);

//add event listener to update A or B when input numbers    
const flushNum = (e) => {
    let inputNumber = Number(e.target.value);
    if (isOperatorPressed()){
        B = inputNumber;
    } else {
        A = inputNumber;
    }

    console.log("A : " + A);
    console.log("B : " + B);
};

numsInput.addEventListener("keyup", flushNum)






let acOP = false;

if (acOP){
    B = Number(prompt("Enter A num"));
} else {
    A = Number(prompt("Enter A num: "));
}



function isOperatorPressed (){
    const operators =  document.querySelectorAll(".operator");
    let res = Array.prototype.some.call(operators, (op) => {
        return op.classList.contains("pressed");
    });

    return res;
}

