import { Component, OnInit, Inject, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BoxesService, BoxType } from './interfaces/boxes.service';
import { AddressTypeLinkService, AddressTypeLink, BuildingObj } from './interfaces/addressTypeLink.service';
import { TaprService, Tapr } from './interfaces/taprs.service';
import { CountConatainer, Count_containerService } from './interfaces/count_container.service';
import { fromEvent} from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';



@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss'],
  providers: [Count_containerService]
})

export class InputFormComponent implements OnInit {

  public al: BuildingObj[];
  
  selectedAddress: BuildingObj = null
  selectedAddressName: string = ""
  selectedAddressTaprsLinks: string [] = null
  placement: string = ""
  placements: object[]
  taprName: string = ""
  holeCable: number = 0;
  inputCable: number = 0;
  borozdyCount: number = 0;
  plcInp: any

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
    //this.http.get<buildingObj[]>("http://95.31.18.248:8089/api/users/")   // on web-serv-mini
    //this.http.get<User[]>("http://localhost:5001/api/users/")
    this.http.get<BuildingObj[]>(hosting + "/api/AddressesListValues")
      .subscribe(result => {
        this.al = result
        this.selectedAddress = this.al[0]
        this.selectedAddressName = this.selectedAddress.name
        this.selectedBuildingChanged(1) // чтобы при старте приложения сразу был виден тип здания
        //this.adrTypeLink = this.adrTypeLinkService.getAddressTypeLinkByType(this.selectedBuildingType)
        this.adrTypeLink = this.adrTypeLinkService.getAddressTypeLinkByType(this.selectedAddress)
      })

    fromEvent(document.getElementById('placementNameInput'), 'input')
      .pipe(
        debounceTime(1000)
    ).subscribe(event => this.placementValueChanged(event));

    fromEvent(document.getElementById('placementNameSelect'), 'change')
      .pipe(
        debounceTime(1000)
      ).subscribe(event => this.placementValueChanged(event));
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
    this.getPlacementsListFromServ(this.selectedAddress.id);
  }

  gettaprs() {
    this.taprs = this.taprservice.getTaprs(this.selectedBuildingType, this.selectedAddress.taprs)
  }

  getPlacementsListFromServ(adrId: number) {
    const hosting = environment.hostingUrl
    this.http.get<object[]>(hosting + "/api/placements/" + adrId)
      .subscribe(result => {
        this.placements = result;
        console.log(this.placements)
      })
  }
  
  placementValueChanged(ev) {
    let tmpPlc = this.placements.find(p => p["name"] === ev.target['value'])
    if (tmpPlc != null) {
      this.countContainer.taprName = this.placements.find(p => p["name"] === ev.target['value'])["tapr"]
    } else {
      console.log("помещение не найдено")
    }
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









