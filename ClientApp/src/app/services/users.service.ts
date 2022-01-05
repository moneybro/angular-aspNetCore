import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface User {
  id?: number,
  createDate: Date,
  updateDate: Date,
  fullName: string,
  age: number,
  position: string,
  roomNumber: string,
  email: string,
  internalPhone: string,
  mobPhone: string,
  depId?: number
}

export interface Sorter {
  name: string,
  type: string,
  asc: boolean
}

@Injectable({ providedIn: 'root' })

export class UsersService {

  private allUsers: User[]
  public users: User[]
  private hosting = environment.hostingUrl
  public userFormEditMode: boolean = false;
  public userFormNewUserMode: boolean = true;
  public tmpUser: User;
  public errorOnAddUser: boolean = false;
  public dateRange: Date[] = []
  public endDate: Date = new Date()
  public startDate: Date = new Date()
  public sorters: Sorter[] = [
    {
      name: "fullName",
      type: "string",
      asc: true
    }
  ]

  public usersDownloaded: boolean
  public viewUsersByDeps: boolean = false
  public dateRangeInUse: boolean = false

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.getAllUsers()
  }

  getAllUsers() {
    this.http.get<User[]>(this.hosting + "/api/users")
      .subscribe(result => {
        this.allUsers = this.users = result
        this.sortBySeveralColumns()
        //this.sortArr("fullName", true)
        this.usersDownloaded = true
        //this.allUsers.reduce((a, b) => new Date(a.updateDate) < new Date(b.updateDate) ? a : b).updateDate // находит самую раннюю дату в массиве
        //this.allUsers.reduce((a, b) => new Date(a.updateDate) > new Date(b.updateDate) ? a : b).updateDate // находит самую позднюю дату в массиве
      })
  }

  getStartDateRange(): Date[] {
    if (this.usersDownloaded) {
      return this.dateRange
    }
  }

  addNewUser() {
    this.userFormNewUserMode = true
    this.userFormEditMode = false
    this.router.navigate(['/user-form'])
  }

  addUser(user: User): boolean {
    let response: boolean = false
    this.http.post(this.hosting + "/api/users/add/", user)
      .subscribe(result => {
        if (result) {
          this.getAllUsers()
          this.router.navigate(['/userslist'])
          response = true
        }
      })
    return response
  }

  exportUsersToXml() {
    let usersToXml: number[] = []
    this.users.forEach(u => usersToXml.push(u.id));
    this.http.post(this.hosting + "/api/users/toXmlin/", usersToXml, {responseType: 'text'})
      .subscribe(result => {
        const url = this.router.serializeUrl(
          this.router.createUrlTree([`/api/users/toXmlout/${result}`])
        );
        window.open(url, '_blanc');
      })
  }

  getUserById(id: number) {
    const tmptmpuser = this.users.find(p => p.id === id)
    return tmptmpuser
  }

  getUsersByDepId(id: number): User[] {
    let internalId = +id;
    const filteredUsers = this.users.filter(p => p.depId === internalId)
    return filteredUsers
  }

  editUser(id: number) {
    this.userFormEditMode = true
    this.userFormNewUserMode = false
    this.tmpUser = this.getUserById(id)
    this.router.navigate(['/user-form'])
  }

  updateUser(user: User): boolean {
    let response: boolean = false
    this.http.put(this.hosting + "/api/users/update/", user)
      .subscribe(result => {
        this.router.navigate(['/userslist'])
        if (result) response = true
      })
    return response
  }

  deleteUser(id: number) {
    this.http.delete(this.hosting + "/api/users/delete/" + id)
      .subscribe(result => {
        if (result) {
          this.http.get<User[]>(this.hosting + "/api/users")
            .subscribe(result => {
              this.users = this.allUsers = result
              //this.sortArr("fullName", true)
              if (this.dateRangeInUse) this.selectUsersByDateRange(this.dateRange)
            })
        }
      })
  }

  selectUsersByDateRange(dateRange: Date[]) {
    this.dateRange[0] = dateRange[0]
    this.dateRange[1] = dateRange[1]
    let dp = new DatePipe('en-EN')
    if (this.usersDownloaded) {
      let sdate = dateRange[0]
      let edate = dateRange[1]

      if (dp.transform(sdate) === dp.transform(edate)) {
        this.users = this.allUsers.filter(
          m => dp.transform(m.updateDate) == dp.transform(sdate))
      }
      else {
        this.users = this.allUsers.filter(m => (new Date(dp.transform(m.updateDate)) >= new Date(dp.transform(sdate)) && new Date(dp.transform(m.updateDate)) <= new Date(dp.transform(edate))))
      }
    } 
  }

  sortArr(column: string, sortDirectionAsc: boolean) {
    // проверка данных на null, если попадется null, то сортировка выполнится неверно. чтобы сортировка выполнилась корректно null перемещаем в конец массива
    let columnType = ''
    var i = 0;
    var notFined = true // находим первый элемент не null
    do {
      if (this.users[i][column] != null) {
        columnType = typeof this.users[i][column]
        notFined = false
      }
      i++
      if (i === this.users.length) break
    } while (notFined);
    //---конец--- проверка данных на null, если попадется null, то сортировка выполнится неверно. чтобы сортировка выполнилась корректно null перемещаем в конец массива

    if (columnType === '') {
      column = "fullName"
      columnType = 'string'
    }
    switch (columnType) {
      case "number":
        this.sortByNumbers(column, sortDirectionAsc)
        break
      case "string":
        this.sortByString(column, sortDirectionAsc)
        break
      default:
        this.sortByString(column, sortDirectionAsc)
    }
  }

  getTypeOfColumnValue(column): string {
    let columnType = ''
    var i = 0;
    var notFined = true // находим первый элемент не null
    do {
      if (this.users[i][column] != null) {
        columnType = typeof this.users[i][column]
        notFined = false
      }
      i++
      if (i === this.users.length) break
    } while (notFined);
    if (columnType === '') {
      column = "fullName"
      columnType = 'string'
    }
    return columnType
  }

  sortByNumbers(column: string, dirAsc: boolean) {
    if (dirAsc) {
      this.users.sort((a, b) => a[column] < b[column] ? -1 : 1)
    } else {
      this.users.reverse()
    }
  }

  sortByString(column: string, dirAsc: boolean) {
    let nullIds: User[] = [] // массив юзеров, у которых в поле, по которому выполняется сортировка есть null, если они вдруг есть

    nullIds = this.users.filter(u => u[column] === null) // отбираем таких юзеров

    // пробегаемся по юзерам с null
    for (var i = 0; i < nullIds.length; i++) {
      let index = this.users.findIndex(u => u['id'] === nullIds[i]['id'])
      this.users.push(nullIds[i]) // добавляем этого юзера в конец массива
        this.users.splice(index, 1) // удаляем по индексу, где он раньше был
    }

    // сортировка с учетом значений null. они в конце, поэтому все работает корректно
    if (dirAsc) {
      this.users.sort((a, b) => a[column]?.localeCompare(b[column]))
    } else {
      this.users.reverse()
    }
  }

  sortBySeveralColumns() {
    //console.log(this.sorters)
    this.sorters.forEach(s => {
      const sorters: Sorter[] = this.sorters
      // функция возвращает результирующий компоратор, который состоит из нескольких
      // для сортировки по 3 столбцам mobPhone (по возраст), internalPhone (по убыв), roomNumber (по возраст)
      // результирующий компоратор будет иметь вид:
      // sortByStr(a, b, 0, true) || sortByStr(a, b, 1, false) || sortByStr(a, b, 2, true)
      // входящие параметры - последовательно элементы массива (предыдущий и следующий)
      // результирующий компоратор записывается в переменную res
      function resOrd(a, b) {
        var res;
        for (var i = 0; i < sorters.length; i++) {
          if (sorters[i]['type'] === 'number') {
            res = res || sortByNumbers(a, b, i, sorters[i]['asc'])
          } 
          if (sorters[i]['type'] === 'string') {
            res = res || sortByStr(a, b, i, sorters[i]['asc'])
          }
        }
        return res
      }

      // функция генерирует компоратор по входным параметрам
      // входящие параметры
      // a,b - члены массива, предыдущий и следующий (неизменяемые параметры)
      // sorterIndex - индекс поля, по которому производится сортировка, в массиве полей для сортировки
      function sortByStr(a, b, sorterIndex: number, asc: boolean) {
        a[sorters[sorterIndex]['name']] === null ? a[sorters[sorterIndex]['name']] = '' : a
        b[sorters[sorterIndex]['name']] === null ? b[sorters[sorterIndex]['name']] = '' : b
        if (!asc) {
          // если нужна сортировка по убыванию, то переприсваиваем a и b между собой (меняем значения местами), так как поменять местами параметры в функции синтаксически не получается
          let c = b
          b = a
          a = c
        }
        return a[sorters[sorterIndex]['name']].localeCompare(b[sorters[sorterIndex]['name']])
      }

      function sortByNumbers(a, b, sorterIndex: number, asc: boolean) {
        if (!asc) {
          // если нужна сортировка по убыванию, то переприсваиваем a и b между собой (меняем значения местами), так как поменять местами параметры в функции синтаксически не получается
          let c = b
          b = a
          a = c
        }

        let comp: number
        if (a[sorters[sorterIndex]['name']] < b[sorters[sorterIndex]['name']]) comp = -1
        else {
          if (a[sorters[sorterIndex]['name']] > b[sorters[sorterIndex]['name']]) comp = 1
          else {
            comp = 0
          }
        }
        return comp
          
      }

      this.users.sort(resOrd)
    })
  }

}
