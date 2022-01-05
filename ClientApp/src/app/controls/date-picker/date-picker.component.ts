import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { min } from 'rxjs/operators';
import { DepartmentsService } from '../../services/departments.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {
  

  form: FormGroup = new FormGroup({
    dateYMD: new FormControl(new Date()),
    dateFull: new FormControl(new Date()),
    dateMDY: new FormControl(new Date()),
    dateRange: new FormControl([this.us.startDate, this.us.endDate]) // здесь не трогать, если изменить, то не будут сохраняться диапазоны дат при операциях редактирования, отмены редактировани и т.п.!!!
    //dateRange: new FormControl([this.us.startDate, this.us.endDate]) // здесь не трогать, если изменить, то не будут сохраняться диапазоны дат при операциях редактирования, отмены редактировани и т.п.!!!
  });

  constructor(
    public us: UsersService
  ) {
  }

  ngOnInit(): void {
  }

  @Output() dateRangeChanged = new EventEmitter();

  public onValueChange(value: Date[]): void {
    //this.dateRangeChanged.emit(value);
    this.us.startDate = value[0]
    this.us.endDate = value[1]
  }

  public useDateRange() {
    this.us.dateRangeInUse = true;
    this.dateRangeChanged.emit([this.us.startDate, this.us.endDate]);
  }
}
