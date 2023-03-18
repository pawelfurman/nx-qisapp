import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { LessonExerciseStore } from './lesson-exercise.store';
import { ExerciseEngineService } from '../../services/engine.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'qisapp-lesson-exercise',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lesson-exercise.component.html',
  styleUrls: ['./lesson-exercise.component.scss'],
  providers: [LessonExerciseStore, ExerciseEngineService]
})
export class LessonExerciseComponent implements OnInit {
  route = inject(ActivatedRoute)
  store = inject(LessonExerciseStore)

  vm$ = this.store.vm$


  ngOnInit(): void {
      const params = this.route.snapshot.params
      this.store.fetchLesson(params['id'])
      this.store.patchState({lessonId: params['id']})
      this.store.changeStatus(params['id'])
  }



  submitPhrase(){
    this.store.submitPhrase()
  }

  typePhrase(phrase: string){
    this.store.patchState({phrase})
  }

  finish(){
    // this.store.finish()
  }
}
