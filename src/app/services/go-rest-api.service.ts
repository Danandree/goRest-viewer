import { Injectable } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Post, User, Comment } from '../interfaces/go-rest-apidata-structure';

@Injectable({
  providedIn: 'root'
})
export class GoRestAPIService {

  private mainUrl: string = 'https://gorest.co.in/public/v2/';
  private _tokenHeaders = new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.token })
  constructor(private http: HttpClient, private auth: AuthService) { }

  getOneObjForTokenCheck(token: string | null): Observable<User> {
    this._tokenHeaders = new HttpHeaders({ 'Authorization': 'Bearer ' + token })
    return this.http.get<User>(`${this.mainUrl}users?page=1&per_page=1`, { headers: this._tokenHeaders });
  }

  getUsersList(page: number, perPage: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.mainUrl}users?page=${page}&per_page=${perPage}`, { headers: this._tokenHeaders });
  }
  getPostsList(page: number, perPage: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.mainUrl}posts?page=${page}&per_page=${perPage}`, { headers: this._tokenHeaders });
  }
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.mainUrl}users/${id}`, { headers: this._tokenHeaders });
  }

  getUserPosts(id: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.mainUrl}users/${id}/posts`, { headers: this._tokenHeaders });
  }

  getCommentFromPostId(id: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.mainUrl}posts/${id}/comments`, { headers: this._tokenHeaders });
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.mainUrl}users`, user, { headers: this._tokenHeaders });
  }

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${this.mainUrl}users/${post.user_id}/posts`, post, { headers: this._tokenHeaders });
  }

  createComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${this.mainUrl}posts/${comment.post_id}/comments`, comment, { headers: this._tokenHeaders });
  }

  deleteUserById(id: number) {
    return this.http.delete(`${this.mainUrl}users/${id}`, { headers: this._tokenHeaders });
  }

  searchUsers(query: string, field: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.mainUrl}users?${field}=${query}`, { headers: this._tokenHeaders });
  }

  searchPosts(query: string, field: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.mainUrl}posts?${field}=${query}`, { headers: this._tokenHeaders });
  }

  searchObj(query: string, field: string, type: string): Observable<Post[] | User[]> {
    return this.http.get<Post[] | User[]>(`${this.mainUrl}${type}?${field}=${query}`, { headers: this._tokenHeaders });
  }
}
