import { inject } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

export class LessonRepository {
    http = inject(HttpClient)

    fetchQuestionsBySetId(setId: string | number) {
        return this.http.get<any[]>(`http://localhost:3000/sets/${setId}/questions`)
    }

    fetchAllSets(){
        return this.http.get<any[]>(`http://localhost:3000/sets`)
    }
}