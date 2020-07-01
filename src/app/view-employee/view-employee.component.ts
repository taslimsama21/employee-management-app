import { Router } from '@angular/router';
import { HttpClientService } from './../services/http-client.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Employee } from '../model/employee.model';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {
  @Input()
  employee: Employee;
  @Output()
  employeeDeletedEvent = new EventEmitter();
  constructor(private httpClientService: HttpClientService, private router: Router) { }

  ngOnInit(): void {
  }
  deleteEmployee() {
    this.httpClientService.deleteEmployee(this.employee.id).subscribe(
      (employee) => {
        this.employeeDeletedEvent.emit();
        this.router.navigate(['employees']);
      }
    );
  }
  editEmployee() {
    this.router.navigate(['edit'], { queryParams: { action: 'edit', id: this.employee.id } });
  }
}
