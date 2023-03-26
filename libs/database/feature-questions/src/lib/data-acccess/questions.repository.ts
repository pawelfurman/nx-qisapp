import { inject } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, of } from "rxjs";

export class QuestionsRepository {
    http = inject(HttpClient)

    getQuestions(){
        return this.http.get<any[]>(`http://localhost:3000/questions`)
    }

    fetchQuestionsBySetId(setId: number){
        return this.http.get<any[]>(`http://localhost:3000/sets/${setId}/questions`)
    }

    deleteQuestion(id: any){
        return this.http.delete<any[]>(`http://localhost:3000/questions/${id}`)
    }

    createQuestion(setId: number, data: Partial<any>){
        return this.http.post<any>(`http://localhost:3000/sets/${setId}/questions`, data)
    }
}