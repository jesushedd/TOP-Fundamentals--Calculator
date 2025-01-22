let A=0;
let B=0;
//set buttons + -
const sumButton = document.querySelector("#sum");
const subButton = document.querySelector("#sub");
//add event listener for buttons
const updatePressed = (e) => {
    const boton = e.target;
    boton.classList.toggle("pressed"); 
}
sumButton.addEventListener("click", updatePressed);
subButton.addEventListener("click", updatePressed);



let acOP = false;

if (acOP){
    B = Number(prompt("Enter A num"));
} else {
    A = Number(prompt("Enter A num: "));
}



