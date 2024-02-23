import { Component } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { GoRestAPIService } from '../../services/go-rest-api.service';
import { Post, User } from '../../interfaces/go-rest-apidata-structure';

import { UserCardMinimalComponent } from '../user-card-minimal/user-card-minimal.component';
import { PostCardComponent } from '../post-card/post-card.component';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';


import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [
    UserCardMinimalComponent,
    PostCardComponent,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    SearchBarComponent,
    MatCardModule,
  ],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.css'
})
export class ListsComponent {

  typeOfObj: string = '';

  userList: User[] = [];
  postList: Post[] = [];

  searchBar = false;

  pageSize = 10;
  userPage = 1;
  postPage = 1;

  constructor(private route: ActivatedRoute, private goRestApi: GoRestAPIService, private router: Router) { }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      if (this.searchBar) {this.searchBar = !this.searchBar}
        this.typeOfObj = params.get('type')!;
        if (this.typeOfObj != 'users' && this.typeOfObj != 'posts') { this.router.navigate(['/404']); }
        if (this.typeOfObj == 'users') { this.userPage = 1; this.userList = []; this.getUsersList(); }
        else if (this.typeOfObj == 'posts') { this.postPage = 1; this.postList = []; this.getPostsList(); }
    });

  }

  getUsersList() {
    this.goRestApi.getUsersList(this.userPage, this.pageSize).subscribe({
      next: (users: User[]) => { this.userList = this.userList.concat(users); },
      error: (err: any) => { console.log(err); }
    });
  }

  getPostsList() {
    this.goRestApi.getPostsList(this.postPage, this.pageSize).subscribe({
      next: (posts: Post[]) => { this.postList = this.postList.concat(posts); },
      error: (err: any) => { console.log(err); }
    });
  }

  deleteUser(user: User): void {
    this.userList = this.userList.filter(u => u.id != user.id);
  }

  createObj() {
    if (this.typeOfObj == 'users') { this.router.navigate(['/users/new']); }
    if (this.typeOfObj == 'posts') { this.router.navigate(['/posts/new']); }
  }


  openSearchBar() {
    this.searchBar = !this.searchBar;
    if (!this.searchBar) {
      if (this.typeOfObj == 'users') {
        this.userList = [];
        this.userPage = 1;
        this.getUsersList();
      }
      if (this.typeOfObj == 'posts') {
        this.postList = [];
        this.postPage = 1;
        this.getPostsList();
      }
    } else { this.userList = []; this.postList = []; }
  }

  loadMore() {
    if (this.typeOfObj == 'users') { this.userPage++; this.getUsersList(); }
    else if (this.typeOfObj == 'posts') { this.postPage++; this.getPostsList(); }
  }

  updateList(event: any) {
    if (event.obj == 'users') { this.userList = event.data; }
    if (event.obj == 'posts') { this.postList = event.data; }
  }
}
