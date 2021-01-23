import { Injectable } from "@angular/core"
import { LogServiceService } from "./log-service.service"

@Injectable({
  providedIn:'root'
})
export class AppCounterService {
  counter = 0

  constructor(
    private logServ: LogServiceService
  ) {

  }

  increase() {
    this.logServ.log('+')
    this.counter++
  }

  decrease() {
    this.logServ.log('-')
    this.counter--
  }
}
