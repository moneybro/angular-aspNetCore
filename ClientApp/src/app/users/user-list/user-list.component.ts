import { Component, OnInit } from '@angular/core';
import { User, UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: User[] = []
  usersListChanged: boolean

  constructor(
    private us: UsersService
  )
  {
  }

  ngOnInit(): void {
  }

}


