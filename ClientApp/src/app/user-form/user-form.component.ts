import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User, UsersService } from '../services/users.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
   
export class UserFormComponent implements OnInit {

  @Output() onAdd: EventEmitter<User> = new EventEmitter<User>()

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
  }

  tmpUser: User = {
    fullname: '',
    email: '',
    internalPhone: '',
    mobPhone: ''
  }

  addUser() {
    //if (this.tmpUser.fullName.trim() && this.tmpUser.internalPhone.trim()) {
    //  this.usersService.onAdd(this.tmpUser)
    //}
    this.usersService.addUser(this.tmpUser)
  }


  //addPost() {
  //  if (this.text.trim() && this.title.trim()) {
  //    const post: Post = {
  //      title: this.title,
  //      text: this.text,
  //      id: this.newPostId
  //    }
  //    this.onAdd.emit(post)
  //    this.title = this.text = ''
  //  }
  //}

}
