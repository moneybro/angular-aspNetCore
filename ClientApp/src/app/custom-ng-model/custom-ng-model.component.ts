import { Component } from '@angular/core';
import { SwitchComponent } from './switch/switch.component';



@Component({
  selector: 'app-custom-ng-model',
  templateUrl: './custom-ng-model.component.html',
  styleUrls: ['./custom-ng-model.component.css']
})

export class CustomNgModelComponent {

  appState = 'on'

  handleChange() {
    console.log(this.appState)
  }
}
