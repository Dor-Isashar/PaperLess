import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor( protected httpClient: HttpClient) { }

  baseUrl = "http://localhost:7018/api/currency";

  getCurrencyRates (yymm:string){
    return this.httpClient.get(`${this.baseUrl}/${yymm}`);
  }
}
