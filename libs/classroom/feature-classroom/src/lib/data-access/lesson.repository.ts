import { inject } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, of } from "rxjs";

export class LessonRepository {
    http = inject(HttpClient)

    fetchQuestionsBySetId(setId: string | number) {
        return this.http.get<any[]>(`http://localhost:3000/sets/${setId}/questions`)
    }

    fetchAllSets(){
        return this.http.get<any[]>(`http://localhost:3000/sets`)
    }

    createLesson(data: any){
        return this.http.post(`http://localhost:3000/lessons`, data)
    }

    fetchQuestionsByTimeAmount(amount: number){
        return this.http.get(`http://localhost:3000/lessons/farthest`, {
            params: {
                amount
            }
        })
    }

    fetchQuestionsRandomly(amount: number){
        return this.http.get(`http://localhost:3000/lessons/random`, {
            params: {
                amount
            }
        }) 
    }
}