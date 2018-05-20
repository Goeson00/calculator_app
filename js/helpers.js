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