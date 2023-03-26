import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuestionsSetsCreateFormVm } from './question-sets-create-form.vm';
import { QuestionSetsListStore } from './question-sets-create-form.store';

@Component({
  selector: 'qisapp-question-sets-create-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './question-sets-create-form.component.html',
  styleUrls: ['./question-sets-create-form.component.scss'],
  providers: [QuestionsSetsCreateFormVm, QuestionSetsListStore]
})
export class QuestionSetsCreateFormComponent {

  view = inject(QuestionsSetsCreateFormVm)
  store = inject(QuestionSetsListStore)

  vm = this.view.vm

  @Input() set setId(setId: number | string){
      this.store.patchState({setId})
  }

  createQuestion(){
    this.store.createQuestion(this.view.form())
    this.view.resetForm()
  }

}
