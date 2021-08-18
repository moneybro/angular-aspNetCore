import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BoxesService, BoxType } from './interfaces/boxes.service';
import { AddressTypeLinkService, AddressTypeLink, BuildingObj } from './interfaces/addressTypeLink.service';
import { TaprService, Tapr } from './interfaces/taprs.service';


@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss']
})

export class InputFormComponent {

  public al: BuildingObj[];

  selectedAddress: BuildingObj = null
  selectedAddressName: string = ""
  selectedAddressTaprsLinks: string [] = null
  placement: string = ""
  holeCable: number = 0;
  inputCable: number = 0;
  borozdyCount: number = 0;

  hasSks: boolean = false;
  txtColor: string = "";
  selectedBuildingType: string = "";
  selectedBuildingTypeLink: string = "";
  adrTypeLink: string;

  boxes: BoxType[];
  selectedBox: BoxType;
  taprs: Tapr[]

  constructor(
    private http: HttpClient,
    private boxesService: BoxesService,
    public adrTypeLinkService: AddressTypeLinkService,
    private taprservice: TaprService
  ) {
    this.boxes = boxesService.getBoxes()
    this.selectedBox = this.boxes[0]
  }

  ngOnInit(): void {
    const hosting = environment.hostingUrl
    //const hosting = "https://localhost:44322"
    this.http.get<BuildingObj[]>(hosting + "/api/AddressesListValues")
      .subscribe(result => {
        this.al = result
        this.selectedAddress = this.al[0]
        this.selectedAddressName = this.selectedAddress.name
        this.selectedBuildingChanged(1) // чтобы при старте приложения сразу был виден тип здания
        //this.adrTypeLink = this.adrTypeLinkService.getAddressTypeLinkByType(this.selectedBuildingType)
        this.adrTypeLink = this.adrTypeLinkService.getAddressTypeLinkByType(this.selectedAddress)
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

    this.gettaprs()
    //console.log(this.selectedAddress.taprs)

    this.selectedAddressName = this.al.find(a => a.id === e).name
    //this.adrTypeLink = this.adrTypeLinkService.getAddressTypeLinkByType(this.selectedBuildingType)
    this.adrTypeLink = this.adrTypeLinkService.getAddressTypeLinkByType(this.selectedAddress)
    this.selectedBuildingTypeLink = this.adrTypeLink
  }

  gettaprs() {
    this.taprs = this.taprservice.getTaprs(this.selectedBuildingType, this.selectedAddress.taprs)
  }

  gettaprskinks2() {
    this.taprservice.changeLangRu2En("1а2+б3в4гжз(этаж)")
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







