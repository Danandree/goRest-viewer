import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgClass } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog } from '@angular/material/dialog';

import { PostCardComponent } from '../post-card/post-card.component';
import { CreatePostComponent } from '../create-post/create-post.component';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';

import { User, Post, ErrorFromGoRestApi } from '../../interfaces/go-rest-apidata-structure';

import { GoRestAPIService } from '../../services/go-rest-api.service';


@Component({
  selector: 'app-user-page',
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
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})
export class UserPageComponent {

  user!: User;
  postsList!: Post[];

  createPost = false;

  constructor(private route: ActivatedRoute, private goRestApi: GoRestAPIService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.params.subscribe(userId => {
      this.goRestApi.getUserById(userId['id']).subscribe({
        next: (user: User) => { this.user = user; this.getUserPosts(); }, //Subscriptio nested Cosa fare?
        error: (err: ErrorFromGoRestApi) => { console.log(err); this.router.navigate(['/404']); }
      })
    });
  }

  getUserPosts(): void {
    this.goRestApi.getUserPosts(this.user.id).subscribe({
      next: (posts: Post[]) => { this.postsList = posts; },
      error: (err: ErrorFromGoRestApi) => { console.log(err); }
    })
  }

  openCreatePost(refreshPosts: boolean): void {
    this.createPost = !this.createPost;
    console.log(refreshPosts);
    if (refreshPosts) { this.getUserPosts(); }
  }

  deleteUser() {
    this.dialog.open(DeleteConfirmationDialogComponent, { data: { user: this.user } }).afterClosed().subscribe({
      next: (data: boolean) => {
        if (data) {
          this.goRestApi.deleteUserById(this.user.id).subscribe({
            next: (data: any) => { 
              this.dialog.open(MessageDialogComponent, { data: { response: data, message: `L'utente "${this.user.name}" è stato eliminato con successo!` } });
              this.router.navigate(['/lists/users']);
             },
            error: (err: any) => { this.dialog.open(MessageDialogComponent, { data: { response: err, message: 'Utente non eliminato' } }); }
          });
        }
      },
    });
  }
}
