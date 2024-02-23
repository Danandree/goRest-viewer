import { Component } from '@angular/core';

import { NgClass } from '@angular/common';

import { ActivatedRoute, Router } from '@angular/router';
import { User, Post, ErrorFromGoRestApi } from '../../interfaces/go-rest-apidata-structure';
import { GoRestAPIService } from '../../services/go-rest-api.service';
import { PostCardComponent } from '../post-card/post-card.component';

import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';

import { CreatePostComponent } from '../create-post/create-post.component';

@Component({
  selector: 'app-user-card-details',
  standalone: true,
  imports: [
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    PostCardComponent,
    MatDividerModule,
    NgClass,
    CreatePostComponent,
  ],
  templateUrl: './user-card-details.component.html',
  styleUrl: './user-card-details.component.css'
})
export class UserCardDetailsComponent {

  user!: User;
  postsList!: Post[];

  createPost = false;

  constructor(private route: ActivatedRoute, private goRestApi: GoRestAPIService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(userId => {
      console.log(userId,"USER ID?");
      this.goRestApi.getUserById(userId['id']).subscribe({
        next: (user: User) => { this.user = user; this.getUserPosts(); }, //Subscriptio nested Cosa fare?
        error: (err: ErrorFromGoRestApi) => { console.log(err);this.router.navigate(['/404']); }
      })
    });
  }

  getUserPosts(): void {
    this.goRestApi.getUserPosts(this.user.id).subscribe({
      next: (posts: Post[]) => { this.postsList = posts; },
      error: (err: ErrorFromGoRestApi) => { console.log(err); }
    })
  }

  openCreatePost(refreshPosts: boolean): void{
    this.createPost = !this.createPost;
    console.log(refreshPosts);
    if(refreshPosts){this.getUserPosts();}
  }

  deleteUser(){
    console.log("delete user: ", this.user);
    this.goRestApi.deleteUserById(this.user.id).subscribe({
      next: (data: any) => { this.router.navigate(['/lists/users']);},
      error: (err: any) => { console.log(err); }
    });
  }
}
