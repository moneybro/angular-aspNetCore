import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UsersService } from './users.service';

export interface Department {
  id?: number,
  indexNumber: number,
  createDate?: Date,
  updateDate?: Date,
  fullName?: string,
  shortName?: string;
}

export interface Sorter {
  name: string,
  type: string,
  asc: boolean
}

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {

  public depFormNewdepMode: boolean = true;
  public depFormEditMode: boolean = false;
  private hosting = environment.hostingUrl
  public tmpDep: Department;
  allDeps: Department[];
  deps: Department[];

  

  constructor(
    private http: HttpClient,
    private router: Router,
    public us: UsersService
  ) {
    this.getAllDeps();
  }

  getAllDeps() {
    this.http.get<Department[]>(this.hosting + "/api/deps")
      .subscribe(result => {
        this.allDeps = this.deps = result
        //this.sortBySeveralColumns()
        //this.sortArr("fullName", true)
        //this.usersDownloaded = true
        //this.allUsers.reduce((a, b) => new Date(a.updateDate) < new Date(b.updateDate) ? a : b).updateDate // находит самую раннюю дату в массиве
        //this.allUsers.reduce((a, b) => new Date(a.updateDate) > new Date(b.updateDate) ? a : b).updateDate // находит самую позднюю дату в массиве
      })
  }

  addNewDep() {
    this.depFormNewdepMode = true
    this.depFormEditMode = false
    this.router.navigate(['/deps/form'])
  }

  //addDep(tmpDep: any) {
  //  this.deps.push(
  //    {
  //      id: 100,
  //      indexNumber: 100,
  //      createDate: new Date(),
  //      updateDate: new Date(),
  //      fullName: tmpDep.fullName,
  //      shortName: tmpDep.shortName
  //    })
  //  this.router.navigate(['/deps']);
  //}


  addDep(dep: Department): boolean {
    let response: boolean = false
    this.http.post(this.hosting + "/api/deps/add/", dep)
      .subscribe(result => {
        if (result) {
          this.getAllDeps()
          this.router.navigate(['/deps'])
          response = true
        }
      })
    return response
  }





  getDepById(id: number): any {
    return this.deps.find(d => d.id === id);
  }


  getDepNameById(id: any): any {
    var numberId: number = +id;
    var dep = this.deps.find(d => d.id === numberId);
    return dep === undefined ? 'нет' : dep.shortName;
  }



  editDep(id: number) {
    this.depFormEditMode = true
    this.depFormNewdepMode = false
    this.tmpDep = this.getDepById(id)
    this.router.navigate(['/deps/form'])
  }

  

  deleteDep(id: number) {
    this.http.delete(this.hosting + "/api/deps/delete/" + id)
      .subscribe(result => {
        if (result) {
          this.getAllDeps()
          this.us.getAllUsers()
        }
      })
  }
}
