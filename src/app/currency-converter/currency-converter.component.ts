import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
interface ratesTypes {
  [s: string]: number;
}
@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.css'],
})
export class CurrencyConverterComponent implements OnInit {
  amountFrom: number = 0;
  amountTo: number = 0;
  currencyFrom: string = 'USD';
  currencyTo: string = 'UAH';
  rates: ratesTypes = {};
  ratesOptions: string[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<any>(`https://api.apilayer.com/fixer/latest`, {
        headers: { apikey: environment.API_FIXER },
      })
      .subscribe((res) => {
        console.log(res.rates);
        this.rates = res.rates;
        this.ratesOptions = Object.keys(res.rates);
        this.onChangeAmountFrom(1);
      });
  }

  format(num: number): number {
    return Number(num.toFixed(4));
  }

  onChangeAmountFrom(value: number) {
    if (!value) {
      this.amountFrom = 0;
      this.amountTo = 0;
      return;
    }

    this.amountTo = this.format(
      (+value * this.rates[this.currencyTo]) / this.rates[this.currencyFrom]
    );

    this.amountFrom = value;
  }

  onChangeAmountTo(value: number) {
    if (!value) {
      this.amountTo = 0;
      this.amountFrom = 0;
      return;
    }

    this.amountFrom = this.format(
      (value * this.rates[this.currencyFrom]) / this.rates[this.currencyTo]
    );

    this.amountTo = value;
  }

  onChangeCurrencyFrom(value: string) {
    this.amountTo = this.format(
      (this.amountFrom * this.rates[this.currencyTo]) /
        this.rates[this.currencyFrom]
    );

    this.currencyFrom = value;
  }

  onChangeCurrencyTo(value: string) {
    this.amountFrom = this.format(
      (this.amountTo * this.rates[this.currencyFrom]) /
        this.rates[this.currencyTo]
    );

    this.currencyTo = value;
  }
}
