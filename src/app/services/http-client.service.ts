import { Employee } from './../model/employee.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient: HttpClient) { }

  getEmployees() {
    return this.httpClient.get<Employee[]>('http://localhost:8081/api/employees/get');
  }
  addEmployee(newEmployee: Employee) {
    return this.httpClient.post<Employee>('http://localhost:8080/api/add/employee', newEmployee);
  }

  deleteEmployee(id) {
    return this.httpClient.delete<Employee>('http://localhost:808q/api/delete/employee/' + id);
  }
  updateEmployee(updatedEmployee: Employee) {
    return this.httpClient.put<Employee>('http://localhost:8080/api/update/employee', updatedEmployee);
  }
}
