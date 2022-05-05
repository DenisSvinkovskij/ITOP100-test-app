import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public EUR_UAH: number = 0;
  public USD_UAH: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getUsdPrice();
    this.getEurPrice();
  }

  getUsdPrice(): void {
    this.http
      .get<any>(
        `https://api.apilayer.com/fixer/convert?to=UAH&from=USD&amount=1`,
        {
          headers: { apikey: environment.API_FIXER },
        }
      )
      .subscribe((res) => (this.USD_UAH = res.result));
  }

  getEurPrice(): void {
    this.http
      .get<any>(
        `https://api.apilayer.com/fixer/convert?to=UAH&from=EUR&amount=1`,
        {
          headers: { apikey: environment.API_FIXER },
        }
      )
      .subscribe((res) => (this.EUR_UAH = res.result));
  }
}
