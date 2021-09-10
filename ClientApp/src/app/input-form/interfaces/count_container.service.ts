import { Injectable } from '@angular/core';
import { BoxType } from './boxes.service';

export interface CountConatainer {
  addressId: number
  addressType: string
  placementName: string
  placementType: string //тип помещения (жилое, офисное)
  taprName: string
  box: string
  holeCable: number
  inputCable: number
  rj45Count: number
  korobCount: number
  podryadchik: string
}

@Injectable()
export class Count_containerService {
    constructor() {

    }
}
