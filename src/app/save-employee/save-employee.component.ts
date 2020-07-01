import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientService } from './../services/http-client.service';
import { Employee } from './../model/employee.model';
import { Component, OnInit, Input, Output,  EventEmitter } from '@angular/core';

@Component({
  selector: 'app-save-employee',
  templateUrl: './save-employee.component.html',
  styleUrls: ['./save-employee.component.css']
})
export class SaveEmployeeComponent implements OnInit {
  @Input()
  employee: Employee;

  @Output()
  employeeAddedEvent = new EventEmitter();

  constructor(private httpClientService: HttpClientService, private activedRoute: ActivatedRoute, private router: Router,private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.employee = Object.assign({}, this.employee);
  }
  saveEmployee() {
    this.httpClientService.addEmployee(this.employee).subscribe(
    (employee) => {
    this.employeeAddedEvent.emit();
    this.router.navigate(['employees']);
    }
    );
   }

}
