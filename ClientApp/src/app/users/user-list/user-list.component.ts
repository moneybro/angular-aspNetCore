import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output } from '@angular/core';
import { User, UsersService } from '../../services/users.service';
import { environment } from '../../../environments/environment';
import { isUndefined } from 'util';
import { DepartmentsService } from '../../services/departments.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  private hosting = environment.hostingUrl
  dateRange: Date[] = []
  sDate: Date
  eDate: Date
  users: User[]
  currentSortedColumnName: string = 'fullName'
  sortDirectionAsc: boolean = true
  sortBySeveralColumns: boolean = false

  constructor(
    private http: HttpClient,
    public us: UsersService,
    public depserv: DepartmentsService
  ) {

  }

  ngOnInit(): void {
  }

  sortBySeveralColumnsCheckbox() {
    if (!this.sortBySeveralColumns) {
      this.us.sorters.length = 0
    }

  }

  getRange() {
    this.http.get<User[]>(this.hosting + "/api/users")
      .subscribe(result => {
        this.users = result
        this.sDate = this.users.reduce((a, b) => new Date(a.updateDate) < new Date(b.updateDate) ? a : b).updateDate // находит самую раннюю дату в массиве
        this.eDate = this.users.reduce((a, b) => new Date(a.updateDate) > new Date(b.updateDate) ? a : b).updateDate // находит самую позднюю дату в массиве
        this.us.startDate = this.sDate
        this.us.endDate = this.eDate
        this.onDateRangeChanged([this.sDate, this.eDate])
      })
  }

  displayAllUsers() {
    this.sortBySeveralColumns = false
    this.us.dateRangeInUse = false
    this.us.getAllUsers()
  }

  onDateRangeChanged(dateRange: Date[]) {
    this.us.selectUsersByDateRange(dateRange)
  }

  refreshUsersList() {
    this.us.getAllUsers()
  }

  changeSort(columnName) {
    if (this.sortBySeveralColumns) {
      if (isUndefined(this.us.sorters.find(s => s['name'] === columnName))) {
        let columnType = typeof this.us.users[0][columnName]
        this.us.sorters.push({ name: columnName, type: columnType, asc: true })
      } else {
        let tmpSorter = this.us.sorters.find(s => s['name'] === columnName)
        tmpSorter['asc'] = !tmpSorter['asc']
      }
      this.us.sortBySeveralColumns()
    } else {
      if (this.currentSortedColumnName == columnName) {
        this.sortDirectionAsc = !this.sortDirectionAsc
        this.us.sortArr(columnName, this.sortDirectionAsc)
      } else {
        this.sortDirectionAsc = true
        this.us.sortArr(columnName, this.sortDirectionAsc)
        this.currentSortedColumnName = columnName
      }
    }
  }

  loadGoodData() {
    this.http.get("/api/users/loadGoodData")
      .subscribe(res => {
        if (res) {
          this.us.getAllUsers()
        }
      })
  }

  listUsersByDeps() {
    this.us.viewUsersByDeps = !this.us.viewUsersByDeps
    
  }
}


