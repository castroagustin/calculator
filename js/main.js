const previousValueElement = document.querySelector('.calculator__displayTop');
const currentValueElement = document.querySelector('.calculator__displayBottom');

const buttonOperator = document.getElementsByClassName('calculator__operator');
const buttonNumber = document.getElementsByClassName('calculator__number');
const buttonEquals = document.querySelector('.calculator__equals');
const buttonClearAll = document.querySelector('.calculator__clearAll');
const buttonDelete = document.querySelector('.calculator__clear');

class Calculator{
    constructor(currentValueElement, previousValueElement){
        this.currentValueElement = currentValueElement;
        this.previousValueElement = previousValueElement;
        this.clear()
    }
    clear(){
        this.currentValue = '';
        this.previousValue = '';
        this.operation = undefined;
    }
    addNumber(number){
        if(number == '.' && this.currentValue.includes('.')) return
        this.currentValue = this.currentValue.toString() + number.toString();
    }
    delete(){
        this.currentValue = this.currentValue.slice(0, -1);
    }
    selectOperation(operation){
        if(operation == '' || this.currentValue == '') return;
        if(this.previousValue !== ''){
            this.compute();
        }
        this.operation = operation;
        this.previousValue = this.currentValue;
        this.currentValue = '';
    }
    compute(){
        let result;
        const prev = Number(this.previousValue);
        const curr = Number(this.currentValue);
        if(isNaN(prev) || isNaN(curr)) return
        switch(this.operation){
            case '+':
                result = prev + curr;
                break;
            case '-':
                result = prev - curr;
                break;
            case 'x':
                result = prev * curr;
                break;
            case '÷':
                result = prev / curr;
                break;
            default:
                return
        }
        this.currentValue = result.toString();
        this.operation = undefined;
        this.previousValue = ''
    }
    formatNumber(number){
        const stringNumber = number.toString();
        const intDigits = Number(number) !== 0 ? Number(stringNumber.split('.')[0]) : '';
        const decDigits = stringNumber.split('.')[1]
        let displayDigits;
        if(isNaN(intDigits)){
            return displayDigits;
        } else {
            displayDigits = intDigits.toLocaleString('en', {maximumFractionDigits: 0});
        }
        if(decDigits != null){
            return `${displayDigits}.${decDigits}`
        }else{
            return displayDigits;
        }
    }
    updateDisplay(){
        this.currentValueElement.innerText = this.formatNumber(this.currentValue); 
        this.previousValueElement.innerHTML = `${this.formatNumber(this.previousValue)}  <span>${this.operation ? this.operation : ''}</span>`;
    }
}

const calculator = new Calculator(currentValueElement, previousValueElement);

buttonNumberArr = [...buttonNumber];
buttonOperatorArr = [...buttonOperator];

buttonNumberArr.forEach(button => {
    button.addEventListener('click', () => {
        calculator.addNumber(button.innerText);
        calculator.updateDisplay();
    })
});

buttonOperatorArr.forEach(button => {
    button.addEventListener('click', () => {
        calculator.selectOperation(button.innerText);
        calculator.updateDisplay();
    })
});

buttonDelete.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})

buttonClearAll.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})

buttonEquals.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
})