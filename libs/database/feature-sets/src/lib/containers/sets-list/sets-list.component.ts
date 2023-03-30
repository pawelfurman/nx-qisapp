import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetsListStore } from './sets-list.store';
import { SetsFetchStore } from '../../store/sets.fetch';
import { SetsListVm } from './sets-list.vm';
import { SetsListDeleteComponent } from '../sets-list-delete/sets-list-delete.component';
import { RouterModule } from '@angular/router';
import { SetsListUpdateComponent } from '../sets-list-update/sets-list-update.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'qisapp-sets-list',
  standalone: true,
  imports: [
    CommonModule,
    SetsListDeleteComponent,
    RouterModule,
    SetsListUpdateComponent,
    FormsModule
  ],
  templateUrl: './sets-list.component.html',
  styleUrls: ['./sets-list.component.scss'],
  providers: [SetsListStore, SetsListVm]
})
export class SetsListComponent implements OnInit {

  store = inject(SetsListStore)
  setsFetchStore = inject(SetsFetchStore)
  view = inject(SetsListVm)

  vm = this.view.vm

  ngOnInit(){
    this.setsFetchStore.fetchSets()
  }

  //@TODO: should be done better by spliting into smaller components
  getEntity(entity: any){
    return {...entity}
  }
  
}
