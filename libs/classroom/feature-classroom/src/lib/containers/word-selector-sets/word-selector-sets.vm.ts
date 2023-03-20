import { computed, Injectable, signal } from "@angular/core";

@Injectable()
export class WordSelectorSetsVm {

    readonly entities = signal<any[]>([])
    readonly loading = signal<boolean>(false)
    readonly selectedSets = signal<any[]>([])

    
    readonly viewEntities = computed(() => {
        const entities = this.entities()
        const selectedSets = this.selectedSets()

        return entities.map((e: any) => ({
            ...e,
            isAdded: !!selectedSets.find(id => id === e.id)
        }))
    })


    readonly vm = computed(() => {
        return {
            entities: this.viewEntities(),
            loading: this.loading()
        }
    })

     

    
}