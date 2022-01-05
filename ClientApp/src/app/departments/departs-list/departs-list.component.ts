import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DepartmentsService } from '../../services/departments.service';

@Component({
  selector: 'app-departs-list',
  templateUrl: './departs-list.component.html',
  styleUrls: ['./departs-list.component.scss']
})
export class DepartsListComponent implements OnInit {

  constructor(
    public ds: DepartmentsService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
  }

  loadGoodData() {
    this.http.get("/api/deps/loadGoodData")
      .subscribe(res => {
        if (res) {
          this.ds.getAllDeps()
        }
      })
  }
}
