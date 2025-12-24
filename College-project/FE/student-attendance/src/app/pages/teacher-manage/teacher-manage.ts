import { Component, signal } from '@angular/core';
import { TeacherService } from '../../services/teacher.service';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-teacher-manage',
  imports: [FormsModule],
  templateUrl: './teacher-manage.html',
  styleUrl: './teacher-manage.css',
})
export class TeacherManage {
 teachers = signal<any[]>([]);
  departments = signal<any[]>([]);

  // Form model
  teacher_name = '';
  username = '';
  password = '';
  years_of_experience = 0;
  specialised_subject = '';
  dept_id!: number;

  constructor(private api: TeacherService, private api1:ApiService) {
    this.loadMeta();
    this.loadTeachers();
  }

  // Load all teachers
  loadTeachers() {
    this.api.fetchAllTeachers().subscribe((res: any[]) => {
      this.teachers.set(res);
    });
  }

  // Load all departments
  loadMeta() {
    this.api1.getMeta().subscribe((res: any) => {
      this.departments.set(res.departments);
    });
  }

  addTeacher() {
    if (!this.teacher_name || !this.username || !this.password || !this.dept_id) {
      alert('Please fill all required fields');
      return;
    }

    this.api.addTeacher({
      teacher_name: this.teacher_name,
      username: this.username,
      password: this.password,
      years_of_experience: this.years_of_experience,
      specialised_subject: this.specialised_subject,
      dept_id: this.dept_id
    }).subscribe(() => {
      alert('Teacher added successfully');
      this.resetForm();
      this.loadTeachers();
    });
  }

  deleteTeacher(teacher_id: number) {
    if (!confirm('Are you sure you want to delete this teacher?')) return;

    this.api.deleteTeacher({ teacher_id }).subscribe(() => {
      alert('Teacher deleted successfully');
      this.loadTeachers();
    });
  }

  resetForm() {
    this.teacher_name = '';
    this.username = '';
    this.password = '';
    this.years_of_experience = 0;
    this.specialised_subject = '';
    this.dept_id = 0;
  }
}
