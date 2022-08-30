let selection = new Array(1).fill(0);
let values = {
    clear: "clear",
    equals: " = ",
    subtract: " - ",
    add: " + ",
    multiply: " x ",
    divide: " / ",
    one: 1,
    two: 2,
    three:3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    zero: 0,
    point: ".",
};
let a,b,o,r;
let count = 0;
let pointCount = 0;

function add (a,b) {
    return a + b;
}

function subtract (a,b) {
    return a - b;
}

function multiply (a,b) {
    return a * b;
}

function divide (a,b) {
    return a / b;
}

function operate (a,o,b) {
    if (o === ' + ') {
        return add(a,b);
    } else if (o === ' - ') {
        return subtract(a,b);
    } else if (o === ' x ') {
        return multiply(a,b);
    } else if (o === ' / ') {
        return divide(a,b);
    } else {
        
    }
}

function show (e) {
    value = convert(this.classList[this.classList.length - 1]);
    if (value!=="clear" && value!==" = ") {
        if (value===".") {
            pointCount++;
        }
        if (value==="." && pointCount>=2) {
            value="";
        }
        if (value===" + " || value===" - " || value===" / " || value===" x "){
            if (selection[selection.length-1] === " + " || selection[selection.length-1] === " - " || selection[selection.length-1] === " x " || selection[selection.length-1] === " / ") {
                return;
            }
            if (count === 1) {
                count = 0;
                b = parseFloat(selection.slice(selection.indexOf(o) + 1).join(''));
                r = Math.round(operate (a,o,b)*10000)/10000;
                selection = [];
                selection.push(r);
            }
            o = value;
            a = parseFloat(selection.join(''));
            count++;
            pointCount = 0;
        }
        if(selection.length === 1 && selection[0] === 0 && value!== "." && value !== " + " && value !== " - " && value !== " / " && value !== " x ") {
            selection = [];
        } 
        selection.push(value);
    } else {
        if (value===" = ") {
            if(!o && isNumber(selection[selection.length]) || selection[selection.length-1] === " + " || selection[selection.length-1] === " - " || selection[selection.length-1] === " x " || selection[selection.length-1] === " / ") {
                return;
            }
            b = parseFloat(selection.slice(selection.indexOf(o) + 1).join(''));
            r = Math.round(operate (a,o,b)*10000)/10000;
            selection = [];
            selection.push(r);
            count = 0;
            if(r.isInteger()) {
                pointCount = 0;
            }
            a = 0;
            b = 0;
            o = "";
            r = 0;
        } else {
            selection = [0];
            count = 0;
            pointCount = 0;
            a = 0;
            b = 0;
            o = "";
            r = 0;
        }
    }
    if (selection.length > 0 && isNaN(selection[0])) {
        screen.textContent = "ERROR"
    } else {
        screen.textContent = selection.join('');
    }
}

function convert(a) {
    return values[a];
}

const buttons = document.querySelectorAll(".pad");
buttons.forEach(button => button.addEventListener('click',show));

const screen = document.querySelector(".screen");
screen.textContent = selection.join('');