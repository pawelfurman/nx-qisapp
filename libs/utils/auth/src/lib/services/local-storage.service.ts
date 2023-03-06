import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() {}

  public setItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }
    
  public getItem(key: string): string{ 
    return localStorage.getItem(key) || ''
  }
  public removeItem(key:string) {
    localStorage.removeItem(key);
  }
  public clear(){
    localStorage.clear(); 
  }
}