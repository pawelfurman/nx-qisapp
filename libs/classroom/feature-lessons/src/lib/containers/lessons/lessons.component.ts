import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonsStore } from './lessons.store';

@Component({
  selector: 'qisapp-lessons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.scss'],
  providers: [LessonsStore]
})
export class LessonsComponent implements OnInit{

  store = inject(LessonsStore)

  vm$ = this.store.vm$


  ngOnInit(): void {
      this.store.fetchLessons()
  }


}
