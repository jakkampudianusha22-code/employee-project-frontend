import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `
    <!-- HEADER -->
    <header class="header">
      <h1>Employee Management System</h1>
    </header>

    <!-- BODY -->
    <div class="container">

      <!-- LEFT MENU -->
      <aside class="sidebar">
        <label><b>Actions</b></label><br><br>

        <select (change)="changeAction($event)">
          <option value="home">Home</option>
          <option value="create">Create</option>
          <option value="read">Read</option>
          <option value="update">Update</option>
          <option value="delete">Delete</option>
        </select>
      </aside>

      <!-- MAIN CONTENT -->
      <main class="content">
        <router-outlet></router-outlet>
      </main>

    </div>

    <!-- FOOTER -->
    <footer class="footer">
      © 2025 Employee App
    </footer>
  `,
  styles: [`
    .header {
      background: #1976d2;
      color: white;
      padding: 10px;
      text-align: center;
    }

    .container {
      display: flex;
      min-height: 70vh;
    }

    .sidebar {
      width: 200px;
      padding: 15px;
      background: #f2f2f2;
    }

    .content {
      flex: 1;
      padding: 20px;
    }

    .footer {
      background: #eee;
      padding: 10px;
      text-align: center;
    }

    select {
      width: 100%;
      padding: 5px;
    }
  `]
})
export class AppComponent {

  changeAction(event: any) {
    const action = event.target.value;
    window.dispatchEvent(
      new CustomEvent('actionChange', { detail: action })
    );
  }
}
