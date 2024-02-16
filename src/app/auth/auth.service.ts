import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { User, ErrorFromGoRestApi } from '../interfaces/go-rest-apidata-structure';
import { Observable } from 'rxjs';
import { GoRestAPIService } from '../services/go-rest-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlForCheckToken: string = 'https://gorest.co.in/public/v2/users?page=1&per_page=1';

  private _isLogged: boolean = localStorage.getItem('isLogged') ? true : false;
  private _token: string | null = localStorage.getItem('token');
  get isLogged(): boolean { return this._isLogged; };
  get token(): string | null { return this._token; };

  constructor(private router: Router, private goRestApi: GoRestAPIService) { }

  setHttpHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + this._token
    })
  }
  checkToken(token: string | null): void {
    this._token = token;
    this.goRestApi.getOneObjForTokenCheck(token).subscribe({
      next: (user: User) => { 
        localStorage.setItem('isLogged', 'true');
        localStorage.setItem('token', token!);
        this._isLogged = true;
        this.router.navigate(['users']);
        console.log(user, " token OK");
       },
      error: (err: ErrorFromGoRestApi) => { console.log(err); }
    });
  }
  tryAutoLogin():void {
   if (localStorage.getItem('isLogged')){this.checkToken(localStorage.getItem('token'));}
  }
  logout() {
    localStorage.removeItem('isLogged');
    localStorage.removeItem('token');
    this._isLogged = false;
    this._token = null;
    this.router.navigate(['login']);
    // this.open.dialog
  }
}
