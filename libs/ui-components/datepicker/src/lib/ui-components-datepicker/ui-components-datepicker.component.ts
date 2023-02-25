import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatepickerStore } from './ui-components-datepicker.store';
import * as moment from 'moment';

@Component({
  selector: 'qisapp-ui-components-datepicker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-components-datepicker.component.html',
  styleUrls: ['./ui-components-datepicker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    DatepickerStore
  ]
})
export class UiComponentsDatepickerComponent implements OnInit {

  store = inject(DatepickerStore)

  vm$ = this.store.vm$

  ngOnInit(){
    this.store.patchState({
      year: moment().year(),
      month: moment().month()
    })
  }

  changeMonthBy(diff:number){
    this.store.changeMonthBy(diff)
  }

  selectDate(date: string){
    this.store.updateSelection(date)
  }

}
