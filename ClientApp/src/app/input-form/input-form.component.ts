import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BoxesService, BoxType } from './interfaces/boxes.service';
import { AddressTypeLinkService, AddressTypeLink, BuildingObj } from './interfaces/addressTypeLink.service';
import { TaprService, Tapr } from './interfaces/taprs.service';
import { CountConatainer, Count_containerService } from './interfaces/count_container.service';


@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss'],
  providers: [Count_containerService]
})



export class InputFormComponent {

  public al: BuildingObj[];

  selectedAddress: BuildingObj = null
  selectedAddressName: string = ""
  selectedAddressTaprsLinks: string [] = null
  placement: string = ""
  taprName: string = ""
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
  taprs: Tapr[];
  countContainer: CountConatainer;

  pltype: string

  constructor(
    private http: HttpClient,
    private boxesService: BoxesService,
    public adrTypeLinkService: AddressTypeLinkService,
    private taprservice: TaprService,
    //private countContainerService: Count_containerService
  ) {
    this.boxes = boxesService.getBoxes()
    this.selectedBox = this.boxes[0]
    this.countContainer = {
      addressId: 0,
      addressType: "",
      placementName: "",
      taprName: "",
      placementType: "live",
      box: this.boxes[0].fullName,
      holeCable : 0,
      inputCable : 0,
      rj45Count : 0,
      korobCount : 0,
      podryadchik : ""
    }

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

  sendCountContainer(): void {
    const hosting = environment.hostingUrl
    this.http.post(hosting + "/api/dataenter", this.countContainer)
      .subscribe(result => {
        //JSON.stringify(this.countContainer)
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
    this.adrTypeLink = this.adrTypeLinkService.getAddressTypeLinkByType(this.selectedAddress)
    this.selectedBuildingTypeLink = this.adrTypeLink
    this.countContainer.addressType = this.selectedAddress.buildingType.toLowerCase(); // тип здания - комфорт, стандарт, эконом
    this.countContainer.addressId = this.selectedAddress.id
  }

  gettaprs() {
    this.taprs = this.taprservice.getTaprs(this.selectedBuildingType, this.selectedAddress.taprs)
  }

  placementValueChanged(event) {
    this.placement = event.target.value
    this.countContainer.placementName = event.target.value
  }

  taprNameEntered(event) {
    this.countContainer.taprName = event.target.value
  }

  selectedBoxChanged(id: number) {
    this.selectedBox = this.boxes.find(b => b.id == id)
    //this.countContainer.box = this.selectedBox.fullName
    this.countContainer.box = this.selectedBox.fullName
  }

  getboxbyid(e: number) {
    this.selectedBox = this.boxes.find(x => x.id === e)
  }

  borozdyCountAction() {
    //let z = Number(this.holeCable)
    //this.borozdyCount = (z - this.inputCable) / 500
  }

  holeCableEntered(val: number) {
    this.holeCable = val
    this.countContainer.holeCable = Number(val)
  }

  inputCableEntered(val: number) {
    //this.inputCable = v
    this.countContainer.inputCable = Number(val)
  }

  resetInputCable() {
    this.inputCable = 0
  }

  rj45CountChanged(val: number) {
    this.countContainer.rj45Count = Number(val)
  }

  korobCountChanged(val: number) {
    this.countContainer.korobCount = Number(val)
  }

  podryadchikChanged(val: string) {
    this.countContainer.podryadchik = val
  }

  printCountContainer() {
    console.log(this.countContainer)
    console.log(this.pltype)
  }
}









