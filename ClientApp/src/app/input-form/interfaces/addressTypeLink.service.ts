import { Injectable } from '@angular/core';

export interface AddressTypeLink {
  type: string;
  link: string;
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
      link: "e_1-22_20180927"
    },
    {
      type: "стандарт",
      link: "s_all_20180927"
    },
    {
      type: "комфорт",
      link: "c_all_20180927"
    }
  ]


  getAddressTypeLinkByType(type: string): string {
    type = type.toLowerCase();

    this.tmpAddr = this.links.find(p => p.type == type)
    this.tmpAddr == null ?
      this.tmpAddrLink = "empty" :
      this.tmpAddrLink = "/api/taprs/" + this.tmpAddr.link + ".pdf"
    return this.tmpAddrLink
  }

}
