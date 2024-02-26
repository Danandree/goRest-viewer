import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { User, ErrorFromGoRestApi } from '../interfaces/go-rest-apidata-structure';
import { Observable } from 'rxjs';
import { GoRestAPIService } from '../services/go-rest-api.service';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from '../components/message-dialog/message-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlForCheckToken: string = 'https://gorest.co.in/public/v2/users?page=1&per_page=1';

  // private _isLogged: boolean = localStorage.getItem('token') ? true : false;
  private _token: string | null = localStorage.getItem('token');
  get isLogged(): boolean { return localStorage.getItem('token') ? true : false; };
  get token(): string | null { return this._token; };

  constructor(private router: Router, private http: HttpClient, private dialog: MatDialog) { }


  checkToken(token: string | null): void {
    this._token = token;
    this.http.get<User>("https://gorest.co.in/public/v2/users?page=1&per_page=1", { headers: { 'Authorization': 'Bearer ' + token } })
      .subscribe({
        next: (user: User) => {
          localStorage.setItem('token', token!);
          // this._isLogged = true;
          this.router.navigate(['/lists/users']);
          console.log(user, " token OK");
        },
        error: (err: ErrorFromGoRestApi) => {
          console.log(err, "errore token");
          this.dialog.open(MessageDialogComponent, {
            data: { response: err, message: 'Token non valido' }
          })
          this.router.navigate(['login']);
        }
      });
  }

  tryAutoLogin(): void {
    if (localStorage.getItem('token')) {
      this.checkToken(localStorage.getItem('token'));
      console.log("LOCAL STORAGE TOKEN: ", localStorage.getItem('token'));
    }
  }

  logout() {
    localStorage.removeItem('token');
    // this._isLogged = false;
    this._token = null;
    this.router.navigate(['login']);
    // this.open.dialog
    this.dialog.open(MessageDialogComponent, {
      data: { response: null, message: 'Logout effettuato con successo' }
    });
  }
}
