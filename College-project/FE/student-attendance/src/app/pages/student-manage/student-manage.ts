import { Component, signal } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-manage',
  imports: [FormsModule],
  templateUrl: './student-manage.html',
  styleUrl: './student-manage.css',
})
export class StudentManage {
  students = signal<any[]>([]);
  departments = signal<any[]>([]);
  classes = signal<any[]>([]);
  // simple form model
  student_name = '';
  dob = '';
  username = '';
  password = '';
  dept_id!: number;
  class_id!: number;

  constructor(private api: ApiService) {}

  ngOnInit(){
this.loadMeta();
this.loadStudents();
  }

  loadStudents() {
    this.api.fetchStudentsForAttendance({
      dept_id: this.dept_id,
      class_id: this.class_id,
      hour_id: 1,
      attendance_date: new Date().toISOString().split('T')[0]
    }).subscribe((res: any) => {
      this.students.set(res);
    });
  }

  loadMeta() {
    this.api.getMeta().subscribe((res: any) => {
      this.departments.set(res.departments);
      this.classes.set(res.classes);
    });
  }

  addStudent() {
    if (!this.student_name || !this.username) {
      alert('Fill required fields');
      return;
    }

    this.api.addStudent({
      student_name: this.student_name,
      dob: this.dob,
      username: this.username,
      password: this.password,
      dept_id: this.dept_id,
      class_id: this.class_id
    }).subscribe(() => {
      alert('Student added');
      this.resetForm();
      this.loadStudents();
    });
  }

  deleteStudent(student_id: number) {
    if (!confirm('Are you sure?')) return;

    this.api.deleteStudent({ student_id }).subscribe(() => {
      alert('Student deleted');
      this.loadStudents();
    });
  }

  resetForm() {
    this.student_name = '';
    this.dob = '';
    this.username = '';
    this.password = '';
  }
}
