import { inject } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, of } from "rxjs";

export class LessonRepository {
    http = inject(HttpClient)

    getLesson(lessonId: any){
        return this.http.get<any[]>(`http://localhost:3000/lessons/${lessonId}`)
    }

    createLessonStep(lessonId: any, body: any){
        return this.http.post<any>(`http://localhost:3000/lessons/${lessonId}/step`, body)
    }

    createLessonStatus(lessonId: any, body: any){
        return this.http.post<any>(`http://localhost:3000/lessons/${lessonId}/status`, body)
    }
}