const MAX_DISPLAY_LENGHT = 8;

// Display abstraction
const Display = {
  element: document.querySelector(".display"),
  maxLength: MAX_DISPLAY_LENGHT,
  clearNext:false,

  getValue() {
    return Number(this.element.textContent);
  },

  setValue(value) {
    this.element.textContent = value;
  },

  append(value) {
    this.element.textContent += value;
  },

  clear() {
    this.element.textContent = "";
  },

  isFull() {
    return this.element.textContent.length >= this.maxLength;
  },

  isInvalid() {
    const content = this.element.textContent;
    return content == 0 || isNaN(content);
  },
};

//operator buttons
const operatorButtons = document.querySelectorAll(".operator");
//numbers keys 
const NUMERIC_KEYS = document.querySelector("#num-keyboard");
const ENTER_KEY = document.querySelector("#enter");

// Stack implementation for operations
const STACK = {
    number_stack: [],
    operator_stack: [],
    max_size: 2,
    push_number: function(n) {
        this.number_stack.push(n);
    },
    push_operator: function(o) {
        this.operator_stack.push(o);
    },
    operate: function() {
        if (this.number_stack.length < 2){
            return null;
        }
        let b = this.number_stack.pop();
        let a = this.number_stack.pop();
        switch (this.operator_stack.pop()) {
            case "+": return a + b;
            case "*": return a * b;
            case "-": return a - b;
            case "/": 
                if (b === 0) return "ZeroErr";
                return a / b;
        }
    },
    isFull(){
        return this.number_stack.length >= this.max_size;
    }
};

// Event listeners
operatorButtons.forEach((b) => b.addEventListener("click", operatorHandler));
NUMERIC_KEYS.addEventListener("click", numberHandler);
ENTER_KEY.addEventListener("click", performOperation);

// Handler functions
function performOperation() {
    STACK.push_number(Display.getValue());
    const result = STACK.operate();
    if (result) {
        Display.setValue(result);
        Display.clearNext = true;
    }
    
}

function numberHandler(e) {
    const target = e.target;
    if (target.tagName !== "BUTTON") return;

    if (Display.isInvalid()) Display.clear();

    const numberToWrite = target.value;
    if (isOperatorPressed()) {
        document.querySelector(".pressed").classList.remove("pressed");
    }
    
    if (Display.clearNext){
        Display.clear();
        Display.setValue(numberToWrite);
        Display.clearNext = false;
    } else if (Display.isFull()) {
        return;
    } else {
        Display.append(numberToWrite);
    }
}

function operatorHandler(e) {
    //un presed previous
    const formerPressed = document.querySelector(".pressed");
    if (formerPressed) formerPressed.classList.remove("pressed");
    //set press state
    const pressedOperator = e.target;
    pressedOperator.classList.add("pressed");


    STACK.push_number(Display.getValue());

    if (STACK.isFull()){
        let intermediateValue = STACK.operate();
        STACK.push_number(intermediateValue);
        Display.setValue(intermediateValue);
    }

    
    STACK.push_operator(e.target.value);

    Display.clearNext = true;
}

// Helper function
function isOperatorPressed() {
    return Array.from(operatorButtons).some(op => 
        op.classList.contains("pressed")
    );
}