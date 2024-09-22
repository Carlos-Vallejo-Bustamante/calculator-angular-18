import { Injectable, signal } from '@angular/core';

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operators = ['+', '-', '*', '/', '÷', 'x'];
const specials = ['C', '+/-', '=', '%', '.', 'Backspace']

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  public resultText = signal('0');
  public subResultText = signal('0');
  public lastOperator = signal('+');

  public constructNumber(value: string): void {
    //validar input
    if (![...numbers, ...operators, ...specials].includes(value)) {
      // console.log(value, 'is not a valid input');
      return;
    }

    // =
    if (value === '=') {
      this.calculateReult();
      return;
    }

    // C
    if (value === 'C') {
      this.resultText.set('0');
      this.subResultText.set('0');
      this.lastOperator.set('+');
      return;
    }

    // Backspace
    // TODO: revisar cuando tengamos números negativos
    if (value === 'Backspace') {
      // console.log('Borrar último caracter');
      if (this.resultText() === '0') return;
      if (this.resultText().includes('-') && this.resultText().length === 2) {
        this.resultText.set('0');
        return;
      }

      if (this.resultText().length === 1) {
        this.resultText.set('0');
        return;
      }

      this.resultText.update(value => value.slice(0, -1));

      return;
    }

    // Aplicar operarador
    if (operators.includes(value)) {
      this.calculateReult();

      this.lastOperator.set(value);
      this.subResultText.set(this.resultText());
      this.resultText.set('0');
      return;
    }

    // Limitar número de caracteres
    if (this.resultText().length >= 10) {
      console.log('No se puede ingresar más de 10 caracteres');
      return;
    }

    // Validar punto decimal
    if (value === '.' && !this.resultText().includes('.')) {
      if (this.resultText() === '0' || this.resultText() === '') {
        this.resultText.set('0.');
        return;
      }
      this.resultText.update(text => text + '.');
      return;
    }

    // Manejo del cero inicial
    if (value === '0' && (this.resultText() === '0' || this.resultText() === '-0')) {
      return;
    }

    // Cambiar signo
    if (value === '+/-') {
      if (this.resultText().includes('-')) {
        this.resultText.update(text => text.slice(1));
        return;
      }

      this.resultText.update(text => '-' + text);
      return;
    }

    // Números
    if (numbers.includes(value)) {

      if (this.resultText() === '0') {
        this.resultText.set(value);
        return;
      }

      if (this.resultText() === '-0') {
        this.resultText.set('-' + value);
        return;
      }

      this.resultText.update(text => text + value);
    }

  }


  public calculateReult() {

    const number1 = parseFloat(this.subResultText());
    const number2 = parseFloat(this.resultText());

    let result = 0;

    switch (this.lastOperator()) {
      case '+':
        result = number1 + number2;
        break;

      case '-':
        result = number1 - number2;
        break;

      case '*':
        result = number1 * number2;
        break;

      case 'x':
        result = number1 * number2;
        break;

      case '/':
        result = number1 / number2;
        break;

      case '÷':
        result = number1 / number2;
        break;
    }

    this.resultText.set(result.toString());
    this.subResultText.set('0');
    this.lastOperator.set('+');
  }

}
