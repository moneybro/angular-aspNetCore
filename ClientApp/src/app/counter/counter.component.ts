import { Component } from '@angular/core';
import { AppCounterService } from '../services/app-counter.service';
import { LocalCounterService } from '../services/local-counter.service';

@Component({
  selector: 'app-counter-component',
  templateUrl: './counter.component.html',
  providers: [LocalCounterService]
})
export class CounterComponent {
  public currentCount = 0;

  constructor(
    private appCounterService: AppCounterService,
    private localCounterService: LocalCounterService
  ) {

  }

  public incrementCounter() {
    this.currentCount++;
  }


}
