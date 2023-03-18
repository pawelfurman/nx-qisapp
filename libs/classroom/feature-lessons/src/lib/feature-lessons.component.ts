import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonsComponent } from './containers/lessons/lessons.component';
import { LessonsRepository } from './data-access/lessons.repository';

@Component({
  selector: 'qisapp-feature-lessons',
  standalone: true,
  imports: [CommonModule, LessonsComponent],
  templateUrl: './feature-lessons.component.html',
  styleUrls: ['./feature-lessons.component.scss'],
  providers: [LessonsRepository]
})
export class FeatureLessonsComponent {


}
