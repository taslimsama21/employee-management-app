import { UserServiceService } from './../services/user-service.service';
import { HttpClientService } from './../services/http-client.service';

import { Employee } from './../model/employee.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: Array<Employee>;
  employeesRecieved: Array<Employee>;
  selectedEmployee: Employee;
  action: string;

  constructor(private userService: UserServiceService, private httpClientService: HttpClientService,private activedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.httpClientService.getEmployees().subscribe(
      response => this.handleSuccessfulResponse(response)
    );
    this.refreshData();
  }

  refreshData() {
    this.httpClientService.getEmployees().subscribe(
      response => this.handleSuccessfulResponse(response)
    );
    this.activedRoute.queryParams.subscribe(
      (params) => {
        // get the url parameter named action. this can either be add or view.
        this.action = params['action'];
      	const id = params['id'];
      	// if id exists, convert it to integer and then retrive the employee from
       	// the employees array
        if (id) {
          this.selectedEmployee = this.employees.find(employee => {
            return employee.id === +id;
          });
        }
      }
    );
  }
  // we will be taking the employees response returned from the database
  // and we will be adding the retrieved
  handleSuccessfulResponse(response) {
    this.employees = new Array<Employee>();
    this.employeesRecieved = response;
    for (const employee of this.employeesRecieved) {
      const employeewithRetrievedFields = new Employee();
      employeewithRetrievedFields.id = employee.id;
      employeewithRetrievedFields.empId = employee.id;
      employeewithRetrievedFields.firstname = employee.firstname;
      employeewithRetrievedFields.lastname = employee.lastname;
      employeewithRetrievedFields.address = employee.address;
      employeewithRetrievedFields.mobile = employee.mobile;
      employeewithRetrievedFields.city = employee.city;
      employeewithRetrievedFields.dateofBirth = employee.dateofBirth;
      this.employees.push(employeewithRetrievedFields);
    }
  }
  addEmoloyee() {
    this.selectedEmployee = new Employee();
    this.router.navigate(['employees'], { queryParams: { action: 'add' } });
  }
  viewEmployee(id: number) {
    this.router.navigate(['employees'], { queryParams: { id, action: 'view' } });
  }

}
