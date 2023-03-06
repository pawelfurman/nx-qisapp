import { inject } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

export class FeatureLoginRepository {
    http = inject(HttpClient)

    login(password: string): Observable<any>{
        return this.http.post<any>(`http://localhost:3000/login`, {username: 'admin', password})
      }
}