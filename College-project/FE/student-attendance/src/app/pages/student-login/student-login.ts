import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-login',
  imports: [FormsModule],
  templateUrl: './student-login.html',
  styleUrl: './student-login.css',
})
export class StudentLogin {
 username = '';
 password = '';

  constructor(private api: ApiService, private auth: AuthService, private router: Router) {}

  login() {
    this.api.studentLogin({ username:this.username,password:this.password }).subscribe(res => {
      this.auth.loginStudent(res);
      this.router.navigate(['/student-report']);
    });
  }
}
