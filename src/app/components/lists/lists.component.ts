import { Component, Input } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { GoRestAPIService } from '../../services/go-rest-api.service';
import { Post, User } from '../../interfaces/go-rest-apidata-structure';

import { UserCardMinimalComponent } from '../user-card-minimal/user-card-minimal.component';
import { PostCardComponent } from '../post-card/post-card.component';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { MatPaginatorModule } from '@angular/material/paginator';

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
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.css'
})
export class ListsComponent {

  typeOfObj: string | null = null;

  objList: User[] | Post[] = []
  userList: User[] = [];
  postList: Post[] = [];

  pageSizeOptions = [5, 10, 25, 100];
  @Input() pageSize = 20;
  page = 1;

  constructor(private route: ActivatedRoute, private goRestApi: GoRestAPIService, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.typeOfObj = params.get('type');
      if (this.typeOfObj != 'users' && this.typeOfObj != 'posts') { this.router.navigate(['/404']); }
      if (this.typeOfObj == 'users') { this.getUsersList(); }
      else if (this.typeOfObj == 'posts') { this.getPostsList(); }
    });
  }

  getUsersList() {
    this.goRestApi.getUsersList(this.page, this.pageSize).subscribe({
      next: (users: User[]) => { this.userList = users; },
      error: (err: any) => { console.log(err); }
    });
  }
  getPostsList() {
    this.goRestApi.getPostsList().subscribe({
      next: (posts: Post[]) => { this.postList = posts; },
      error: (err: any) => { console.log(err); }
    });
  }

  deleteUser(user: User): void {
    this.userList = this.userList.filter(u => u.id != user.id);
  }

  createObj() {
    if (this.typeOfObj == 'users') { this.router.navigate(['/createUser']); }
    if (this.typeOfObj == 'posts') { this.router.navigate(['/createPost']); }
  }
}
