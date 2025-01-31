const display = document.getElementById('display');

let currentInput = '';
let previousInput = '';
let operator = null;

function appendNumber(number) {
    if (number === '.' && currentInput.includes('.')) return;
    currentInput += number;
    updateDisplay();
}

function appendOperator(op) {
    if (currentInput === '' && previousInput === '') return;
    if (currentInput === '' && op === '-') {
        currentInput = '-';
        updateDisplay();
        return;
    }
    if (previousInput && currentInput) {
        calculateResult();
    }
    operator = op;
    previousInput = currentInput;
    currentInput = '';
}

function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operator = null;
    updateDisplay();
}

function updateDisplay() {
    display.textContent = currentInput || '0';
}

function calculateResult() {
    if (!previousInput || !currentInput || !operator) return;

    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);

    let result;

    switch (operator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            if (num2 === 0) {
                alert('Error: Division by zero is undefined.');
                clearDisplay();
                return;
            }
            result = num1 / num2;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    previousInput = '';
    operator = null;
    updateDisplay();
}