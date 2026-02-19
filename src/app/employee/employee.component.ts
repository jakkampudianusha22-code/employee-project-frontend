import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- CREATE / UPDATE / DELETE FORM -->
    <div *ngIf="action !== 'read' && action !== 'home'">
      <h3>{{ action | uppercase }} Employee</h3>

      <!-- 🔥 FORM START -->
      <form #empForm="ngForm" (ngSubmit)="submit(empForm)">

        <input *ngIf="action !== 'create'"
               type="number"
               name="id"
               placeholder="Employee ID"
               [(ngModel)]="employee.id"
               required><br><br>

        <input *ngIf="action !== 'delete'"
               name="name"
               placeholder="Name"
               [(ngModel)]="employee.name"
               required><br><br>

        <input *ngIf="action !== 'delete'"
               name="salary"
               placeholder="Salary"
               [(ngModel)]="employee.salary"
               required><br><br>

        <!-- ❌ REMOVED (click) -->
        <!-- ✅ type=submit -->
        <button type="submit" [disabled]="empForm.invalid">
          Submit
        </button>

      </form>
      <!-- 🔥 FORM END -->

      <hr>
    </div>

    <!-- EMPLOYEE LIST -->
    <h3>Employee List</h3>

    <table border="1" width="100%">
      <tr>
        <th>ID</th><th>Name</th><th>Salary</th>
      </tr>
      <tr *ngFor="let e of employees">
        <td>{{e.id}}</td>
        <td>{{e.name}}</td>
        <td>{{e.salary}}</td>
      </tr>
    </table>
  `
})
export class EmployeeComponent implements OnInit {

  employees: any[] = [];
  employee: any = {};
  action: string = 'home';

  constructor(private service: EmployeeService) {}

  ngOnInit() {
    this.loadEmployees();

    window.addEventListener('actionChange', (e: any) => {
      this.action = e.detail;
      this.employee = {};
      this.loadEmployees();
    });
  }

  loadEmployees() {
    this.service.getAll().subscribe(data => this.employees = data);
  }

  // 🔥 ONE CLICK WORKS HERE
  submit(form: any) {

    if (form.invalid) return;

    if (this.action === 'create') {
      this.service.create(this.employee).subscribe(() => {
        this.loadEmployees();
        form.resetForm();
      });
    }

    if (this.action === 'update') {
      this.service.update(this.employee.id, this.employee)
        .subscribe(() => {
          this.loadEmployees();
          form.resetForm();
        });
    }

    if (this.action === 'delete') {
      this.service.delete(this.employee.id)
        .subscribe(() => {
          this.loadEmployees();
          form.resetForm();
        });
    }

    this.employee = {};
  }
}
