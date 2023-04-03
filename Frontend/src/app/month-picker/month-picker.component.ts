import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MonthsService} from "../services/months.service";

@Component({
  selector: 'month-picker',
  templateUrl: './month-picker.component.html',
  styleUrls: ['./month-picker.component.scss']
})

export class MonthPickerComponent {
  constructor(    private monthService: MonthsService  ) {  }
  @Input() minDate: Date = new Date("2000-01-01");
  @Input() maxDate: Date = new Date();
  @Output() rangeChange = new EventEmitter<{ year: string, month: string }>();
  selectedYear: number = new Date().getFullYear();
  selectedMonth: string = this.getMonthString(new Date());
  months = this.monthService.months;
  years: number[] = [];
  ngOnInit() {
    const minYear = this.minDate.getFullYear() ;
    const maxYear = this.maxDate.getFullYear();

    for (let year = maxYear; year >= minYear; year--) {
      this.years.push(year);
    }
    this.onRangeChange();
  }
  onRangeChange() {
    const month = this.selectedMonth;
    const year = this.selectedYear.toString().slice(2);
    // @ts-ignore
    this.rangeChange.emit({ month, year});
  }
  private getMonthString(date: Date): string {
    const month = date.getMonth() + 1;
    return month < 10 ? '0' + month : '' + month;
  }
}
