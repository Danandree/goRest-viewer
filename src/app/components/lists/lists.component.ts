import { Component } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { GoRestAPIService } from '../../services/go-rest-api.service';
import { Post, User } from '../../interfaces/go-rest-apidata-structure';

import { UserCardMinimalComponent } from '../user-card-minimal/user-card-minimal.component';
import { PostCardComponent } from '../post-card/post-card.component';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [
    UserCardMinimalComponent,
    PostCardComponent,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.css'
})
export class ListsComponent {

  typeOfObj: string | null = null;

  objList: User[] | Post[] = []
  userList: User[] = [];
  postList: Post[] = [];

  constructor(private route: ActivatedRoute, private goRestApi: GoRestAPIService, private router: Router) { }
  
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.typeOfObj = params.get('type');
      console.log(this.typeOfObj);
      if (this.typeOfObj != 'users' && this.typeOfObj != 'posts' && this.typeOfObj != null) {
        this.router.navigate(['/404']);
      }
      if (this.typeOfObj == 'users') {
        this.goRestApi.getUsersList().subscribe({
          next: (users: User[]) => { this.userList = users; },
          error: (err: any) => { console.log(err); }
        });
      } else if (this.typeOfObj == 'posts') {
        this.goRestApi.getPostsList().subscribe({
          next: (posts: Post[]) => { this.postList = posts; },
          error: (err: any) => { console.log(err); }
        });
      }
    });
  }

  deleteUser(user: User): void {
    console.log(this.userList.length);
    this.userList = this.userList.filter(u => u.id != user.id);
    console.log(this.userList.length);
  }
}
