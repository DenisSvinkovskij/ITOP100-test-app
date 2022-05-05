import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-currency-input',
  templateUrl: './currency-input.component.html',
  styleUrls: ['./currency-input.component.css'],
})
export class CurrencyInputComponent implements OnInit {
  @Input() public amount!: number;
  @Input() public currency: string = 'UAH';
  @Input() public rates: string[] = ['UAH', 'EUR', 'USD'];
  @Output() public onChangeAmount = new EventEmitter<number>();
  @Output() public onChangeCurrency = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  onAmountChange(e: Event) {
    this.onChangeAmount.emit(Number((e.target as HTMLInputElement).value));
  }
  onCurrencyChange(e: Event) {
    this.onChangeCurrency.emit((e.target as HTMLSelectElement).value);
  }
}
