import { Injectable } from '@angular/core';

export interface AddressTypeLink {
  type: string;
  link: string;
}

export interface BuildingObj {
  id: number;
  name: string;
  buildingType: string;
  sks: string;
  taprs: string;
  catalogPage: number;
  placements: string[];
}

@Injectable({ providedIn: 'root'})
export class AddressTypeLinkService {
    constructor() {

  }

  tmpAddr: AddressTypeLink = null
  tmpAddrLink: string = ""

  links: AddressTypeLink[] = [
    {
      type: "эконом",
      link: "econom"
    },
    {
      type: "стандарт",
      link: "standart"
    },
    {
      type: "комфорт",
      link: "comfort"
    }
  ]


  getAddressTypeLinkByType(selectedAddress: BuildingObj): string {
    let type: string = ""
    let addrDescr: AddressTypeLink
    type = selectedAddress.buildingType.toLowerCase()

    this.tmpAddr = this.links.find(p => p.type == type)

    this.tmpAddr == null ?
      this.tmpAddrLink = "empty" :
      this.tmpAddrLink = "/api/taprs/" + this.tmpAddr.link + ".pdf#page=" + selectedAddress.catalogPage

    //if (this.tmpAddr == null) 
    //  {
    //    addrDescr.link = "empty",
    //    addrDescr.type = "empty"
    //} else
    //{
    //  addrDescr.type = addrDescr.link // для того чтобы вернуть только тип адреса по английски
    //  // для возврата всего пути
    //  addrDescr.link = "/api/taprs/" + this.tmpAddr.link + ".pdf#page=" + selectedAddress.catalogPage
    //}

    return this.tmpAddrLink
  }
}
