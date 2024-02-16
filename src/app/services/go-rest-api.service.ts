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

  getOneObjForTokenCheck(token: string | null): Observable<User> {
    this._tokenHeaders = new HttpHeaders({  'Authorization': 'Bearer ' + token })
    return this.http.get<User>(`${this.mainUrl}users?page=1&per_page=1`, { headers: this._tokenHeaders });
  }

  getUsersList(): Observable<User[]> {
    return this.http.get<User[]>(`${this.mainUrl}users`, { headers: this._tokenHeaders });
  }
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.mainUrl}users/${id}`, { headers: this._tokenHeaders });
  }

  getUserPosts(id: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.mainUrl}users/${id}/posts`, { headers: this._tokenHeaders });
  }

}
