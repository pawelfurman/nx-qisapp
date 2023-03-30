import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetsListUpdateStore } from './sets-list-update.store';

@Component({
  selector: 'qisapp-sets-list-update',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sets-list-update.component.html',
  styleUrls: ['./sets-list-update.component.scss'],
  providers: [SetsListUpdateStore]
})
export class SetsListUpdateComponent {

  store = inject(SetsListUpdateStore)

  @Input() set entity(entity: any){
    this.store.patchState({entity: {...entity}})
  }


  updateEntity(){
    this.store.updateSet()
  }
}
