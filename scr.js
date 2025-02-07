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
const STACK = {
    number_stack:[],
    operator_stack:[],
    max_size:2,
    push_number: function  (n) {
        this.number_stack.push(n);
    },

    push_operator: function (o){
        this.operator_stack.push(o);
    },

    operate: function (){
        
        let b = this.number_stack.pop();
        let a = this.number_stack.pop();
        switch (this.operator_stack.pop()) {
            case "+":
                return a + b;
            case "*":
                return a * b;
                
            case "-":
                return a - b;
                
            case "/":
                if (b === 0){
                    return "ZeroErr";
                }

                return a / b;
                        }
    }
}





//add event listener for opreators buttons
operatorButtons.forEach((b) => {
    b.addEventListener("click", operatorHandler);
})



//event listener for numeric keys
NUMERIC_KEYS.addEventListener("click", numberHandler);

//event listener for enter key
ENTER_KEY.addEventListener("click", operate);




function isOperatorPressed (){
    const operators =  document.querySelectorAll(".operator");
    let res = Array.prototype.some.call(operators, (op) => {
        return op.classList.contains("pressed");
    });

    return res;
}


function operate(){
    STACK.push_number(getNumberFromDisplay());
    const result = STACK.operate()
    toDisplay(result);
}

function getNumberFromDisplay(){
    return Number(DISPLAY.textContent);
}




function numberHandler(e) {
    const target = e.target;
    const currentDisplayed = Number(DISPLAY.textContent);
    
    if (target.tagName != "BUTTON"){
        return;
    }

    if (isDisplayInvalid()){
        clearDisplay()
    }

    

    const numberToWrite = target.value;
    if (isOperatorPressed()){
        //un pressed operator
        document.querySelector(".pressed").classList.remove("pressed");
        
        clearDisplay();

        toDisplay(numberToWrite);
    } else if (isDisplayFull()){
        return;
    } else{
        DISPLAY.textContent += numberToWrite;
    }

}

function isDisplayInvalid(){
    return DISPLAY.textContent == 0 | isNaN (DISPLAY.textContent)  
}

function clearDisplay(){
    DISPLAY.textContent = "";
}

function isDisplayFull(){
    return DISPLAY.textContent.length >=MAX_DISPLAY_LENGHT;
}

function toDisplay(n){
    DISPLAY.textContent = n;
}



function operatorHandler(e) {
    //un press previous operator button pressed
    const fomerPressed = document.querySelector(".pressed");
    if (fomerPressed != null){
        fomerPressed.classList.remove("pressed");
    }
    
    //set current pressed state
    const pressedOperator = e.target;
    pressedOperator.classList.add("pressed");

    //put number in display to stack
    const aNumber = getNumberFromDisplay();
    STACK.push_number(aNumber);
    //put operator to stack
    const operator =  e.target.value;
    STACK.push_operator(operator);

}

