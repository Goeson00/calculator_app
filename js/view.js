"use strict";

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