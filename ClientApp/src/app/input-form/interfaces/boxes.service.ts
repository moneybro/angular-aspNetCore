import { Injectable } from '@angular/core';

export interface BoxType {
  id: number;
  descr: string;
  fullName: string;
  partnum: string;
  manufacturer: string;
}

@Injectable({ providedIn: 'root'})
export class BoxesService {
    constructor() {

  }

  boxes: BoxType[] = [
  {
    id: 0,
    descr: 'навесной, шнайдер',
    fullName: 'Распределительный шкаф Schneider Electric Easy9, 36 мод., IP40, навесной, пластик, белая дверь, с клеммами, EZ9E312P2SRU',
    partnum: 'EZ9E312P2SRU',
    manufacturer: 'Schneider Electric'
  },
  {
    id: 1,
    descr: 'навесной, ABB',
    fullName: 'Распределительный шкаф ABB Mistral41, 36 мод., IP41, навесной, термопласт, белая дверь, 1SPE007717F0610',
    partnum: '1SPE007717F0610',
    manufacturer: 'ABB'
  },
  {
    id: 2,
    descr: 'офисный',
    fullName: 'Шкаф настенный 19" ZPAS WZ- 3715 - 01 - 04 - 011, СЕРИИ SJ2 15U, 737 * 600 * 600 со стеклянной дверью, цвет серый RAL 7035',
    partnum: 'WZ-3715-01-04-011',
    manufacturer: 'ZPAS'
  },
  {
    id: 3,
    descr: 'встроенный, шнайдер',
    fullName: 'Распределительный шкаф Schneider Electric Easy9 36 мод., IP40, встраиваемый, пластик, прозрачная дверь, с клеммами, EZ9E312S2FRU',
    partnum: 'EZ9E312S2FRU',
    manufacturer: 'Schneider Electric'
  },
  {
    id: 4,
    descr: 'встроенный, ABB',
    fullName: 'Распределительный шкаф ABB Mistral41 36 мод., IP41, встраиваемый, термопласт, белая дверь, 1SLM004100A1107',
    partnum: '1SLM004100A1107',
    manufacturer: 'ABB'
  }
]


  getBoxes() {
    return this.boxes
  }

  getBoxById(id: number) {
    return this.boxes.find(p => p.id === id)
  }

}
