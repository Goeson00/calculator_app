"use strict";

const Helpers = {

    hasDecimalPoint(value) {
        return String(value).includes(".");
    },

    isNegative(value) {
        return String(value).startsWith("-");
    },

    createHTML(tagName, className, textContent) {
        const element = document.createElement(tagName);
        
        element.className = className;
        element.textContent = textContent;
        return element;
    }

};

const CalculatorModel = Object.assign(Object.create(Helpers), {

    init() {
        this.currentValue;
        this.pendingOperation = null;
    },

    setPendingOperation(operation) {
        this.pendingOperation = operation && this[operation];
    },

    setCurrentValue(value) {
        this.currentValue = Number(value);
    },

    add(value) {
        this.currentValue += Number(value);
    },
    
    subtract(value) {
        this.currentValue -= value;
    },
    
    multiply(value) {
        this.currentValue *= value;
    },
    
    divide(value) {
        this.currentValue /= value;
    },
    
    percent(value) {
        this.currentValue *= value / 100;
    },

    calculate(value) {
        if (this.pendingOperation) this.pendingOperation(value);
        this.pendingOperation = null;
    },

    reset() {
        this.currentValue = null;
        this.pendingOperation = null;
    }

});

const CalculatorView = Object.assign(Object.create(CalculatorModel), {

    resultField: document.querySelector(".calculator__result"),
    operationField: document.querySelector(".calculator__operation"),
    calculationField: document.querySelector(".calculator__calculation"),
    
    setResult(value) {
        this.resultField.textContent += value;
    },

    getResult() {
        return this.resultField.textContent;
    },

    clearResult() {
        this.resultField.textContent = "";
    },

    displayValue(value) {
        this.resultField.textContent = value;
    },

    displayOperator(operator) {
        this.operationField.textContent = operator;
    },

    attachMinus() {
        this.resultField.textContent = `-${this.resultField.textContent}`;
    },

    detachMinus() {
        this.resultField.textContent = this.resultField.textContent.slice(1);
    },

    setCalculation(value, operator) {
        const number = document.createTextNode(value);
        const operatorHTML = this.createHTML("span", "calculation__operator calculation__operator--theme--dark", operator)

        this.calculationField.appendChild(number);
        this.calculationField.appendChild(operatorHTML);
    },

    clearCalculation() {
        this.calculationField.innerHTML = "";
    }

});

const CalculatorController = Object.assign(Object.create(CalculatorView), {
    
    inputMode: false,
    
    setupApp() {
        const keyboard = document.querySelector(".calculator__keyboard");
        
        keyboard.addEventListener("click", (event) => {
            const key = event.target;
            
            if (key.tagName === "BUTTON") {
                const action = key.dataset.action;
                
                this[action](key.value, key.textContent);
            }
        });

        this.init();
    },

    inputDigit(value) {
        if (!this.inputMode) this.clearResult();
        this.setResult(value);
        this.inputMode = true;
    },

    inputDecimalPoint(value) {
        const result = this.getResult();

        if (!this.inputMode && result != 0) {
            this.clearResult();
            this.setResult(`0${value}`);
        } else if (!this.hasDecimalPoint(result)) this.setResult(value);

        this.inputMode = true;
    },
    
    inputOperation(operation, operator) {
        const result = this.getResult();
        
        if (this.currentValue === null || !this.pendingOperation) {
            this.setCurrentValue(result);
        } 
        if (this.inputMode) {
            this.calculate(result);
            this.setCalculation(result, operator);
        } 
        this.setPendingOperation(operation);
        this.displayValue(this.currentValue);
        this.displayOperator(operator);
        this.inputMode = false;
    },

    inputPercent() {
        if (this.pendingOperation === this.multiply) {
            const result = this.getResult();
    
            this.percent(result);
            this.setCalculation(result / 100)
            this.displayValue(this.currentValue);
            this.inputMode = false;
        }
    },

    inputNegation() {
        const result = this.getResult();

        if (result && !this.isNegative(result)) {
            this.attachMinus();
        } else if (result && this.isNegative(result)) {
            this.detachMinus();
        }
    },

    equal() {
        const result = this.getResult();

        this.calculate(result);
        this.displayValue(this.currentValue);
        this.clearCalculation();
        this.inputMode = false;
    },

    clear() {
        this.reset();
        this.displayValue(0);
        this.clearCalculation();
        this.inputMode = false;
    }

});

CalculatorController.setupApp();