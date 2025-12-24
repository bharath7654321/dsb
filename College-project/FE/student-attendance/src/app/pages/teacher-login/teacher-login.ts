import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-teacher-login',
  imports: [FormsModule],
  templateUrl: './teacher-login.html',
  styleUrl: './teacher-login.css',
})
export class TeacherLogin {
 username = '';
 password = '';

  constructor(private api: ApiService, private auth: AuthService, private router: Router) {}

  login() {
    this.api.teacherLogin({ username:this.username , password: this.password }).subscribe(res => {
      this.auth.loginTeacher(res);
      this.router.navigate(['/teacher/select']);
    });
  }
}
