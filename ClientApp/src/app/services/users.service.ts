import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

export interface User {
  id?: number,
  fullName: string,
  email: string,
  internalPhone: string,
  mobPhone: string,
}

@Injectable({ providedIn: 'root' })

export class UsersService {


  public users: User[]
  private hosting = environment.hostingUrl
  public userFormEditMode: boolean = false;
  public userFormNewUserMode: boolean = true;
  public tmpUser: User;
  public errorOnAddUser: boolean = false;
  
  constructor(
    private http: HttpClient,
    private router: Router
    ) {
      this.getAllUsers()
    }

  getAllUsers() {
    this.http.get<User[]>(this.hosting + "/api/users")
      .subscribe(result => {
        this.users = result
        this.sortArr("fullName")
      })
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

  getUserById(id: number) {
    const tmptmpuser = this.users.find(p => p.id === id)
    console.log(tmptmpuser)
    return tmptmpuser
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
              this.users = result
              this.sortArr("fullName")
            })
        }
      })
  }

  sortArr(column: string) {
    this.users.sort((a, b) => a[column].localeCompare(b[column]))
  }
}
