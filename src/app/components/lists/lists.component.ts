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
    MatCardModule,
  ],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.css'
})
export class ListsComponent {

  typeOfObj: string = '';
  typeOfObjName = { users: "Utenti", posts: "Posts" }

  userList: User[] = [];
  postList: Post[] = [];

  pageSize = 10;
  userPage = 1;
  postPage = 1;

  constructor(private route: ActivatedRoute, private goRestApi: GoRestAPIService, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.typeOfObj = params.get('type')!;
      if (this.typeOfObj == 'users') { this.userPage = 1; this.userList = []; this.getUsersList(); }
      else if (this.typeOfObj == 'posts') { this.postPage = 1; this.postList = []; this.getPostsList(); }
      else { this.router.navigate(['/404']); }
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

  loadMore() {
    if (this.typeOfObj == 'users') { this.userPage++; this.getUsersList(); }
    else if (this.typeOfObj == 'posts') { this.postPage++; this.getPostsList(); }
  }
  goToSearch() {
    if (this.typeOfObj == 'users') { this.router.navigate(['/search/users']); }
    if (this.typeOfObj == 'posts') { this.router.navigate(['/search/posts']); }
  }
}
