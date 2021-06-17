import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { environment } from '../../environments/environment';

export interface User {
  id?: number,
  fullname: string,
  email: string,
  internalPhone: string,
  mobPhone: string,
}

@Injectable({ providedIn: 'root' })

export class UsersService {
    users: any;
  constructor(private http: HttpClient) {

  }

  public res: User[]
 
  getAllUsers() {
    const hosting = environment.hostingUrl
    //this.http.get<buildingObj[]>("http://95.31.18.248:8089/api/users/")   // on web-serv-mini
    //this.http.get<User[]>("http://localhost:5001/api/users/")
    this.http.get<User[]>(hosting + "/api/users/")
      .subscribe(result => {
        this.res = result
      })
    return this.users
  }

  addUser(user: User) {
    console.log("user service got user:", user)
  }

  getUserById(id: number) {
    return this.users.find(p => p.id === id)
  }

}
