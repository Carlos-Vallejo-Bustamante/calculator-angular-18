import { ChangeDetectionStrategy, Component, computed, inject, viewChildren } from '@angular/core';
import { CalculatorButtonComponent } from "../calculator-button/calculator-button.component";
import { CalculatorService } from '@/calculator/services/calculator.service';

@Component({
    selector: 'calculator',
    standalone: true,
    imports: [CalculatorButtonComponent],
    templateUrl: './calculator.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '(document:keyup)': 'handleKeyboardEvent($event)',
    }
    // styles: `
    //     .is-command {
    //         @apply bg-indigo-700 bg-opacity-20;
    //     }
    // `
})
export class CalculatorComponent {

    private calculaterService = inject(CalculatorService);

    public calculatorButton = viewChildren(CalculatorButtonComponent);

    public resultText = computed(() => this.calculaterService.resultText());
    public subResultText = computed(() => this.calculaterService.subResultText());
    public lastOperator = computed(() => this.calculaterService.lastOperator());

    // get resultText() {
    //     return this.calculaterService.resultText();
    // }

    handleClick(key: string) {
        this.calculaterService.contructNumber(key);
    }

    // @HostListener('document:keyup', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        const key = event.key;

        const keyEquivalents: Record<string, string> = {
            Escape: 'C',
            Delete: 'C',
            Enter: '=',
            'x': '*',
            '/': '÷'
        };
        const keyValue = keyEquivalents[key] ?? key;

        this.handleClick(keyValue);

        this.calculatorButton().forEach(button => {
            button.keyboardPressedStyle(keyValue);
        })

    }

}
