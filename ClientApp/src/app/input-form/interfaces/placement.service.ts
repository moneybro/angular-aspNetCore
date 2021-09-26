import { Injectable } from '@angular/core';
import { Tapr } from './taprs.service';

export interface placement {
  id: number
  name: string
  type: string
  floor: string
  roomsCount: number
  sqHole: number
  sqLive: number
  taprName: number
}

@Injectable({ providedIn: 'root'})
export class AddressTypeLinkService {
    constructor() {

  }
}
