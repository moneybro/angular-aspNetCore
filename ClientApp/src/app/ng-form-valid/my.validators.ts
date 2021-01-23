import { FormControl } from "@angular/forms";
import { resolve } from "dns";
import { Observable } from "rxjs";

export class MyValidators {
  static restrictedEmails(control: FormControl): { [key: string]: boolean } {
    if (['q@q', 'w@w'].includes(control.value)) {
      return { restrictedEmail: true }
    }
    return null
  }

  static uniqEmail(control: FormControl): Promise<any> | Observable<any> {
    return new Promise(resolve => {
      setTimeout(() => {
        if (control.value === 'a@a') {
          resolve({ uniqEmail: true })
        } else {
          resolve(null)
        }
      }, 5000)
    })
  }
}
