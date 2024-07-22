document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.button');
    let displayValue = '0';
    let firstOperand = null;
    let waitingForSecondOperand = false;
    let operator = null;
  
    function updateDisplay() {
      display.textContent = displayValue;
    }
  
    function handleNumber(number) {
      if (waitingForSecondOperand) {
        displayValue = number;
        waitingForSecondOperand = false;
      } else {
        displayValue = displayValue === '0' ? number : displayValue + number;
      }
    }
  
    function handleOperator(nextOperator) {
      const inputValue = parseFloat(displayValue);
  
      if (operator && waitingForSecondOperand) {
        operator = nextOperator;
        return;
      }
  
      if (firstOperand === null && !isNaN(inputValue)) {
        firstOperand = inputValue;
      } else if (operator) {
        const result = performCalculation[operator](firstOperand, inputValue);
        displayValue = `${parseFloat(result.toFixed(7))}`;
        firstOperand = result;
      }
  
      waitingForSecondOperand = true;
      operator = nextOperator;
    }
  
    const performCalculation = {
      '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
      '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
      '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
      '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
      '=': (firstOperand, secondOperand) => secondOperand
    };
  
    function resetCalculator() {
      displayValue = '0';
      firstOperand = null;
      waitingForSecondOperand = false;
      operator = null;
    }
  
    function handleDecimal(dot) {
      if (!displayValue.includes(dot)) {
        displayValue += dot;
      }
    }
  
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const { type } = button.dataset;
        const { textContent } = button;
  
        if (type === 'number') {
          handleNumber(textContent);
          updateDisplay();
        }
  
        if (type === 'operator') {
          handleOperator(textContent);
          updateDisplay();
        }
  
        if (type === 'decimal') {
          handleDecimal(textContent);
          updateDisplay();
        }
  
        if (type === 'clear') {
          resetCalculator();
          updateDisplay();
        }
  
        if (type === 'equal') {
          handleOperator(textContent);
          updateDisplay();
        }
      });
    });
  
    updateDisplay();
  });
  