import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Department, DepartmentsService } from '../../services/departments.service';
import { User, UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})


   
export class UserFormComponent implements OnInit {

  //@Output() onAdd: EventEmitter<User> = new EventEmitter<User>()

  tmpUser: User = {
    createDate: new Date,
    updateDate: new Date,
    fullName: '',
    age: 20,
    position: '',
    roomNumber: '',
    email: '',
    internalPhone: '',
    mobPhone: '',
    depId: 0
  }
  userForm: FormGroup

  constructor(
    public us: UsersService,
    public depserv: DepartmentsService
  ) {
    this._createFrom()
  }

  ngOnInit(): void {
    if (this.us.userFormEditMode) {
      this.tmpUser = this.us.tmpUser
    }
  }

  _createFrom() {
    this.userForm = new FormGroup({
      fullName: new FormControl('',
        [
          Validators.required
        ]),
      age: new FormControl('',
        [
          Validators.required,
          Validators.min(18),
          Validators.max(100)
        ]),
      position: new FormControl('',
        [
          Validators.required
        ]),
      roomNumber: new FormControl('',
        [
          Validators.required
        ]),
      email: new FormControl('',
        [
          Validators.required,
          Validators.email
        ]),
      internalPhone: new FormControl('',
        [
          Validators.required,
          Validators.pattern("[0-9]{4}")
        ]),
      mobPhone: new FormControl('',
        [
          Validators.required,
          Validators.pattern("[0-9]{10}")
        ]),
      password: new FormControl()
    })
  }

  updateUser() {
    this.tmpUser.updateDate = new Date()
    this.us.updateUser(this.tmpUser)
  }

  setDepId(event) {
    this.tmpUser.depId = event;
  }
}
