import { Injectable } from '@angular/core';

// import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Post, User } from '../interfaces/go-rest-apidata-structure';

@Injectable({
  providedIn: 'root'
})
export class GoRestAPIService {

  private mainUrl: string = 'https://gorest.co.in/public/v2/';
  private _tokenHeaders = new HttpHeaders({ })
  constructor(private http: HttpClient) { }

  getOneObjForTokenCheck(): Observable<User> {
    return this.http.get<User>(`${this.mainUrl}users?page=1&per_page=1`, { headers: this._tokenHeaders });
  }

}
