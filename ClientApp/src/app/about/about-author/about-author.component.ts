import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-author',
  templateUrl: './about-author.component.html',
  styleUrls: ['./about-author.component.scss']
})
export class AboutAuthorComponent implements OnInit {

  startDate = new Date("2009-08-10")
  currentDate = new Date();
  monthsCountTxt = ""

  constructor() {
    this.currentDate = new Date();
  }

  ngOnInit(): void {
    this.getWorkExperienceYears()
    this.getMonthsCountTxt(this.getWorkExperienceMonths())
    
  }

  workExperienceYears: number
  workExperienceMonths

  getWorkExperienceYears() {
    this.workExperienceYears = this.currentDate.getFullYear() - 2009;
    console.log(this.workExperienceMonths);
  }


  getWorkExperienceMonths(): number {
    let razn = this.currentDate.getMonth() - this.startDate.getMonth()
    if (razn < 0) {
      this.workExperienceMonths = 12 + razn + 1
      --this.workExperienceYears
      return this.workExperienceMonths
    }
    else {
      this.workExperienceMonths = this.currentDate.getMonth() - this.startDate.getMonth()
      return this.workExperienceMonths + 1
    }
  }

  getMonthsCountTxt(monthNum: number) {
    switch (monthNum) {
      case 1:
        this.monthsCountTxt = "месяц"
        break;
      case 2:
      case 3:
      case 4:
        this.monthsCountTxt = "месяца"
        break;
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
      case 10:
      case 11:
      case 12:
        this.monthsCountTxt = "месяцев"
        break;
      default:
    }
    this.monthsCountTxt = monthNum + " " + this.monthsCountTxt
  }
}
