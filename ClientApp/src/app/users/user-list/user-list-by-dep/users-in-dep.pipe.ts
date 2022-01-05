import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../../../services/users.service';

@Pipe({
  name: 'usersInDep'
})
export class UsersInDepPipe implements PipeTransform {

  transform(users: User[], depid: number): User[] {
    var filteredUsers = users.filter(item => item.depId === depid)
    return filteredUsers
  }

}
