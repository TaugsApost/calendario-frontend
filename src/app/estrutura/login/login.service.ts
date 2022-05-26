import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
export class LoginService{
    constructor(private http: HttpClient) { }

    login(user: any) {
        return new Promise((resolve) => {
          window.localStorage.setItem('token', 'meu-token');
          resolve(true);
        });
      }
    
      createAccount(account: any) {
        return new Promise((resolve) => {
          resolve(true);
        });
      }

}