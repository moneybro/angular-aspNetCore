import { useAnimation } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Department, DepartmentsService } from '../../../services/departments.service';
import { User, UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-user-list-by-dep',
  templateUrl: './user-list-by-dep.component.html',
  styleUrls: ['./user-list-by-dep.component.scss']
})

export class UserListByDepComponent implements OnInit {

  users: User[] = []

  constructor(
    public us2: UsersService,
    public depserv: DepartmentsService
  ) {
  }

  ngOnInit(): void {
    
  }


}
