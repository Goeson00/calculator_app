"use strict";

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
        this.displayOperator("");
        this.clearCalculation();
        this.inputMode = false;
    },

    clear() {
        this.reset();
        this.displayValue(0);
        this.displayOperator("");
        this.clearCalculation();
        this.inputMode = false;
    }

});

CalculatorController.setupApp();