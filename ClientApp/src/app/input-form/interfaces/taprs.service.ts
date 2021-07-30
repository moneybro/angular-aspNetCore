import { Injectable } from '@angular/core';

export interface Tapr {
  name: string;     // имя по русски
  type: string;     // тип коротко: e - econom, s - standert, c - comfort
  number: string;   // номер тапра
  descr: string;    // описание (там где этажи есть)
  link: string;     // ссылка на тапр
}

@Injectable({ providedIn: 'root'})
export class TaprService {
    constructor() {

  }

  taprs: Tapr[] = [];
  

  lettersMap = new Map([
    ["а", "a"],
    ["б", "b"],
    ["в", "v"],
    ["г", "g"],
    ["д", "d"],
    ["е", "e"],
    ["ж", "zh"],
    ["з", "z"],
    ["и", "i"],
    ["й", "y"],
    ["к", "k"],
    ["л", "l"],
    ["м", "m"],
    ["н", "n"],
    ["о", "o"],
    ["п", "p"],
    ["р", "r"],
    ["с", "s"],
    ["т", "t"],
    ["у", "u"],
    ["ф", "f"],
    ["х", "h"],
    ["ц", "c"]
  ]);

  getTaprs(type: string, numbers: string): Tapr[] {
    this.taprs = [] // обнуление массива
    type = type.toLowerCase();
    let en_type = "";
    let en_type_full = "";
    switch (type) {
      case "эконом": {
        en_type = "e";
        en_type_full = "econom";
        break;
      }
      case "стандарт": {
        en_type = "s";
        en_type_full = "standart";
        break;
      }
      case "комфорт": {
        en_type = "c";
        en_type_full = "comfort";
        break;
      }
      default: {
        en_type = ""
        break;
      }
    }

    if (en_type === "") return [] // если не многоквартирный дом, то возвращаем пустой массив
        let taprsNumbers: string[] = null

    taprsNumbers = numbers.split(",");

    taprsNumbers.forEach((name) => {
      let taprType = en_type
      let number = this.changeLangRu2En(name.trim())[0]
      let descr = this.changeLangRu2En(name.trim())[1]
      let link = "/api/taprs/" + en_type_full + "/" + en_type + "_" + number.trim() + ".pdf"

      this.taprs.push({
        name: type.substr(0, 1) + name + this.changeLangRu2En(name.trim())[1],
        type: taprType,
        number: number,
        descr: descr,
        link: link
      })
      
    })
    //console.log(this.taprs)
    return this.taprs
  }

  changeLangRu2En(str: string): string[]{
    let params = ["",""]
    let taprtmpNum = ""
    let taprDescr = ""
    let taprNameFull = ""
    if (str.includes("(")) {
      const indA = str.indexOf("(")
      const indB = str.indexOf(")")
      taprDescr = str.substr(indA, str.length - indA)
      //console.log("taprDescr ", taprDescr)
      taprtmpNum = str.substr(0, indA)
      //console.log("taprtmpNum ", taprtmpNum)
    } else {
      taprtmpNum = str
    }
    //console.log(taprtmpNum)
    let letters: string[] = null
    letters = taprtmpNum.split("", taprtmpNum.length)

    for (var i = 0; i < letters.length; i++) {
      if (this.lettersMap.get(letters[i]) != undefined)
        letters[i] = this.lettersMap.get(letters[i])
      taprNameFull += letters[i]
    }
    //console.log(taprNameFull + taprDescr)
    params[0] = taprNameFull
    params[1] = taprDescr
    return params
  }

  
}
