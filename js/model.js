"use strict";

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