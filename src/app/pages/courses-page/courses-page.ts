import { Component } from '@angular/core';
import { Courses } from '../../components/courses/courses';

@Component({
  imports: [Courses],
  selector: 'app-courses-page',
  styleUrl: './courses-page.css',
  templateUrl: './courses-page.html',
})
export class CoursesPage {}
