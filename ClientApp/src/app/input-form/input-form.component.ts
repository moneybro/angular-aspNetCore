import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BoxesService, BoxType } from './interfaces/boxes.service';
import { Post, PostsService } from './interfaces/posts.service';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss']
})

export class InputFormComponent {

  public al: buildingObj[];
  selectedAddress: buildingObj = null
  placement: string = ""
  holeCable: number = 0;
  inputCable: number = 0;
  borozdyCount: number = 0;

  hasSks: boolean = false;
  txtColor: string = "";
  selectedBuildingType: string = "";
  boxes: BoxType[];
  selectedBox: BoxType


  constructor(
    private http: HttpClient,
    private boxesService: BoxesService
  ) {
    this.boxes = boxesService.getBoxes()
    this.selectedBox = this.boxes[0]
  }

  ngOnInit(): void {
    const hosting = environment.hostingUrl
    //const hosting = "https://localhost:44322"
    this.http.get<buildingObj[]>(hosting + "/api/AddressesListValues")
      .subscribe(result => {
        this.al = result
        this.selectedAddress = this.al[0]
      })
  }

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
    e++
    this.selectedAddress = this.al.find(a => a.id === e)
  }

  placementValueChanged(event) {
    this.placement = event.target.value
  }

  selectedBoxChanged(id: number) {
    this.selectedBox = this.boxes.find(b => b.id == id)
  }

  getboxbyid(e: number) {
    this.selectedBox = this.boxes.find(x => x.id === e)
  }

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





