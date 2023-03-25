import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetsListDeleteStore } from './sets-list-delete.store';
import { SetsListDeleteVm } from './sets-list-delete.vm';

@Component({
  selector: 'qisapp-sets-list-delete',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sets-list-delete.component.html',
  styleUrls: ['./sets-list-delete.component.scss'],
  providers: [SetsListDeleteStore, SetsListDeleteVm]
})
export class SetsListDeleteComponent {

  store = inject(SetsListDeleteStore)
  view =  inject(SetsListDeleteVm)

  vm = this.view.vm
  
  @Input() set setId(setId: number){
      this.store.patchState({setId});
  }


  removeSet(setId: number){
    console.log('revmeo ', setId)
    this.store.removeSet(setId)
  }
}
