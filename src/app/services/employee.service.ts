import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class EmployeeService {

  private url = 'http://localhost:8080/api/employees';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any[]>(this.url);
  }

  create(emp: any) {
    return this.http.post(this.url, emp);
  }

  update(id: number, emp: any) {
    return this.http.put(`${this.url}/${id}`, emp);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
