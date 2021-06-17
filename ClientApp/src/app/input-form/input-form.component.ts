import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss']
})

export class InputFormComponent {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const hosting = environment.hostingUrl
    //this.http.get<buildingObj[]>("http://95.31.18.248:8089/api/AddressesListValues")   // on web-serv-mini
    //this.http.get<buildingObj[]>("https://localhost:5001/api/AddressesListValues")
    this.http.get<buildingObj[]>(hosting + "/api/AddressesListValues")
      .subscribe(result => {
        this.al = result
    })
  }

  public al: buildingObj[];

  hasSks: boolean = false
  txtColor: string = ""
  selectedBuildingType: string = ""


  selectedBuildingChanged(e: number) {
    e--
    if (this.al[e].sks === "+") {
      this.hasSks = true
      this.txtColor = 'green'

    } else {
      this.hasSks = false
      this.txtColor = 'red'
    };

    this.selectedBuildingType = this.al[e].buildingType

  }

  holeCable: number = 0;
  inputCable: number = 0;
  borozdyCount: number = 0;

  borozdyCountAction() {
    this.borozdyCount = (this.holeCable - this.inputCable) / 500
  }

  holeCableEntered(value: number) {
    this.holeCable = value
  }

  inputCableEntered(val: number) {
    this.inputCable = val
  }

  resetInputCable() {
    this.inputCable = 0
  }

}

interface buildingObj {
  id: number;
  name: string;
  buildingType: string;
  sks: string;
}
