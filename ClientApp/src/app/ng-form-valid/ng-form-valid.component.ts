import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms'
import { MyValidators } from './my.validators';

@Component({
  selector: 'app-ng-form-valid',
  templateUrl: './ng-form-valid.component.html',
  styleUrls: ['./ng-form-valid.component.scss']
})
export class NgFormValidComponent implements OnInit {
  form: FormGroup

  capital = ''

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('',
        [
          Validators.email,
          Validators.required,
          MyValidators.restrictedEmails
        ],
        MyValidators.uniqEmail),
      password: new FormControl('',
        [
          Validators.required,
          Validators.minLength(6)
        ]),
      address: new FormGroup({
        country: new FormControl('ru'),
        city: new FormControl('')
      }),
      skills: new FormArray([])
    })
    this.setCapital()
  }

  submit() {
    if (this.form.valid) {
      console.log('Form submitted: ', this.form)
      const formData = { ...this.form.value }

      console.log('Form data', formData)
    }
    this.form.reset()
  }

  setCapital() {
    const cityMap = {
      ru: 'Москва',
      us: 'Вашингтон',
      by: 'Минск'
    }
    const cityKey = this.form.get('address').get('country').value
    const city = cityMap[cityKey]
    this.capital = city

    this.form.patchValue({
      address: { city }
    })
  }

  addSkill() {
    const control = new FormControl('', Validators.required);
    //приведение типа и добавление контрола в массив формы. метод 1:
    (<FormArray>this.form.get('skills')).push(control)
    // метод 2:
    //(this.form.get('skills') as FormArray).push(control)
  }

  delSkill(idx) {
    (this.form.get('skills') as FormArray).removeAt(idx)
    //(<FormArray>this.form.get('skills')).removeAt(idx)
  }

}



