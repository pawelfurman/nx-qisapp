import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetsCreationFromStore } from './sets-creation-form.store';
import { SetsCreationFromVm } from './sets-creation-form.vm';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'qisapp-sets-creation-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sets-creation-form.component.html',
  styleUrls: ['./sets-creation-form.component.scss'],
  providers: [SetsCreationFromStore, SetsCreationFromVm]
})
export class SetsCreationFormComponent {

  store = inject(SetsCreationFromStore)
  view = inject(SetsCreationFromVm)

  vm = this.view.vm

  createSet(){
    this.store.createSet({
      name: this.view.name(),
      description: this.view.description()
    })
    this.view.clearForm()
  }

  reset(form: NgForm){
    this.view.clearForm()
    form.reset()
  }
}
