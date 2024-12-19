class AdvancedCalculator {
    constructor() {
        this.equationElement = document.querySelector('.equation');
        this.resultElement = document.querySelector('.result');
        this.scientificButtons = document.querySelector('.scientific-buttons');
        this.currentOperand = '';
        this.previousOperand = '';
        this.operator = null;
        this.isScientificMode = false;

        this.initializeEventListeners();
    }

    initializeEventListeners() {
        document.querySelectorAll('.btn.number').forEach(btn =>
            btn.addEventListener('click', () => this.appendNumber(btn.textContent))
        );

        document.querySelectorAll('.btn.operator').forEach(btn =>
            btn.addEventListener('click', () => this.chooseOperator(btn.textContent))
        );

        document.querySelector('.btn.equals').addEventListener('click', () => this.compute());

        document.querySelector('.btn.clear').addEventListener('click', () => this.clear());

        document.querySelector('.btn.delete').addEventListener('click', () => this.delete());

        document.querySelector('.btn.decimal').addEventListener('click', () => this.addDecimal());

        document.querySelector('.btn.toggle-mode').addEventListener('click', () =>
            this.toggleScientificMode()
        );

        document.querySelectorAll('.btn.function').forEach(btn =>
            btn.addEventListener('click', () => this.applyFunction(btn.textContent))
        );

        document.addEventListener('keydown', (e) => this.handleKeyboardInput(e));
    }

    appendNumber(number) {
        if (this.currentOperand.includes('.') && number === '.') return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
        this.updateDisplay();
    }

    chooseOperator(operator) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') this.compute();

        this.operator = operator;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
        this.updateDisplay();
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const curr = parseFloat(this.currentOperand);

        if (isNaN(prev) || isNaN(curr)) return;

        switch (this.operator) {
            case '+':
                computation = prev + curr;
                break;
            case '-':
                computation = prev - curr;
                break;
            case '×':
                computation = prev * curr;
                break;
            case '÷':
                computation = curr === 0 ? 'Error' : prev / curr;
                break;
            case '%':
                computation = prev % curr;
                break;
            default:
                return;
        }

        this.currentOperand = computation;
        this.operator = null;
        this.previousOperand = '';
        this.updateDisplay();
    }
    applyFunction(func) {
        let computation;
        const value = parseFloat(this.currentOperand);

        if (isNaN(value)) return;

        switch (func) {
            case '√':
                computation = Math.sqrt(value);
                break;
            case 'sin':
                computation = Math.sin((value * Math.PI) / 180);
                break;
            case 'cos':
                computation = Math.cos((value * Math.PI) / 180);
                break;
            case 'tan':
                computation = Math.tan((value * Math.PI) / 180);
                break;
            default:
                return;
        }

        this.currentOperand = computation;
        this.updateDisplay();
    }
   
    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operator = null;
        this.updateDisplay();
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        this.updateDisplay();
    }

    addDecimal() {
        if (!this.currentOperand.includes('.')) {
            this.currentOperand += '.';
        }
        this.updateDisplay();
    }

    toggleScientificMode() {
        this.isScientificMode = !this.isScientificMode;
        this.scientificButtons.classList.toggle('hidden');
    }

    handleKeyboardInput(e) {
        if (!isNaN(e.key)) {
            this.appendNumber(e.key);
        } else if (['+', '-', '*', '/'].includes(e.key)) {
            const operator = e.key === '*' ? '×' : e.key === '/' ? '÷' : e.key;
            this.chooseOperator(operator);
        } else if (e.key === 'Enter' || e.key === '=') {
            e.preventDefault();
            this.compute();
        } else if (e.key === 'Backspace') {
            this.delete();
        } else if (e.key === '.') {
            this.addDecimal();
        } else if (e.key.toLowerCase() === 'c') {
            this.clear();
        }
    }

    updateDisplay() {
        this.resultElement.textContent = this.currentOperand || '0';
        this.equationElement.textContent = `${this.previousOperand} ${this.operator || ''}`;
    }
}

// Initialize the calculator
document.addEventListener('DOMContentLoaded', () => new AdvancedCalculator());
