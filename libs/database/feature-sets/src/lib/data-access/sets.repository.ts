import { inject } from "@angular/core";
import { HttpClient } from '@angular/common/http';

export class SetRepository {
    http = inject(HttpClient)

    fetchSets(){
        return this.http.get<any[]>(`http://localhost:3000/sets`)
    }

    updateSet(anyId: number, data: Partial<any>){
        return this.http.put<any>(`http://localhost:3000/sets/${anyId}`, data);
    }

    createSet(data: any){
        return this.http.post<any>(`http://localhost:3000/sets`, data)
    }

    deleteSet(anyId: number){
        return this.http.delete<number>(`http://localhost:3000/sets/${anyId}`)
    }


    deleteCheckSet(anyId: number){
        return this.http.get<boolean>(`http://localhost:3000/sets/${anyId}/delete-check`)
    }


}