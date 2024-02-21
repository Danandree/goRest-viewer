import { Component, Input } from '@angular/core';

import { Post, Comment, User } from '../../interfaces/go-rest-apidata-structure';

import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { GoRestAPIService } from '../../services/go-rest-api.service';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css'
})
export class PostCardComponent {
  @Input() post!: Post;
  user!: User;
  commentsList: Comment[] = [];

  constructor(private goRestApi: GoRestAPIService) { }
  ngOnInit() {
    this.getComments();
    this.getUserById(this.post.user_id);
  }
  getComments() {
    this.goRestApi.getCommentFromPostId(this.post.id).subscribe({
      next: (data: any) => {this.commentsList = data;},
      error: (err) => { console.log(err); }
    });
  }

  getUserById(id: number) {
    this.goRestApi.getUserById(id).subscribe({
      next: (data: any) => { this.user = data; },
      error: (err) => { return; }
    })
  }
}
