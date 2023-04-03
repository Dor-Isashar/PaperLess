import {Component} from '@angular/core';
import {NgForm} from "@angular/forms";
import {HttpService} from "./services/http.service";
import {CurrenciesResponseModel} from "./currencies-response-model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  constructor(private httpService: HttpService) {  }
  minDate = new Date("2000-01-01");
  maxDate = new Date();
  dateInvalid: boolean = false;
  rates: { date: string, value: string }[] = [];
  maxValue: number = 0
  minValue: number = 0
  yymm: string = "";
  getDate(e: { year: any; month: any; }) {
    this.dateInvalid = e.year == this.maxDate.getFullYear().toString().slice(2) && e.month > this.maxDate.getMonth() + 1;
    this.yymm = `${e.year}${e.month}`
  }
  onSubmit(form: NgForm) {
    this.rates = [];
    this.maxValue = 0;
    this.minValue = 0;
    // @ts-ignore
    this.httpService.getCurrencyRates(this.yymm).subscribe((res: CurrenciesResponseModel) => {
      this.maxValue = res.max;
      this.minValue = res.min;
      for (let rate in res.currencyData.GRAPH) {
        // @ts-ignore
        this.rates.push({date: rate, value: res.currencyData.GRAPH[rate]["USD"]})
      }
    })
  }
}
