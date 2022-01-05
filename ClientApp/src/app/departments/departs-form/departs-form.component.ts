import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Department, DepartmentsService } from '../../services/departments.service';

@Component({
  selector: 'app-departs-form',
  templateUrl: './departs-form.component.html',
  styleUrls: ['./departs-form.component.css']
})
export class DepartsFormComponent implements OnInit {

  tmpDep: Department = {
    id: 0,
    indexNumber: 999,
    createDate: new Date,
    updateDate: new Date,
    fullName: '',
    shortName: ''
  }
  depForm: FormGroup

  constructor(
    public ds: DepartmentsService
  ) {
    this._createFrom()
  }
  ngOnInit(): void {
    if (this.ds.depFormEditMode) {
      this.tmpDep = this.ds.tmpDep
    }
  }

  _createFrom() {
    this.depForm = new FormGroup({
      fullName: new FormControl('',
        [
          Validators.required
        ]),
      shortName: new FormControl('',
        [
          Validators.required
        ]),
    })
  }
}
