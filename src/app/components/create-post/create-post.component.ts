import { Component, Input, Output, EventEmitter } from '@angular/core';

import { FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Post } from '../../interfaces/go-rest-apidata-structure';
import { GoRestAPIService } from '../../services/go-rest-api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
  ],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent {
  controlGroup = new FormGroup({
    user_id: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
    title: new FormControl('', [Validators.required]),
    body: new FormControl('', [Validators.required])
  })
  post = new Post;
  @Input() userId?: number;
  @Output() closeCreatePostComponent = new EventEmitter();

  constructor(private goRestApi: GoRestAPIService, private router: Router) { }

  ngOnInit(): void {
    if (this.userId) {
      this.controlGroup.get('user_id')?.setValue(this.userId.toString());
    }
  }
  getErrorMessage(form: string) {
    if (this.controlGroup.get(form)?.hasError('required')) {
      switch (form) {
        case "user_id":
          return "Inserire l'id utente";
        case "title":
          return "Inserire il titolo";
        case "body":
          return "Inserire il body";
      }
    }
    return "L'id utente deve essere un numero";
  }

  createPost() {
    if (this.controlGroup.valid) {
      console.log(this.controlGroup.value);
      this.post.body = this.controlGroup.value.body!;
      this.post.title = this.controlGroup.value.title!;
      this.post.user_id = +this.controlGroup.value.user_id!;
      this.goRestApi.createPost(this.post).subscribe({
        next: (data: any) => {
          console.log(data);
          this.router.navigate(['/users', this.post.user_id]);
          if (this.userId) {
            this.closeCreatePostComponent.emit(true);
          }
        },
        error: (err: any) => { console.log(err); },
      });
    } else { console.log("invalid form"); }
  }

  clearPost() {
    this.controlGroup.reset();
    if (this.userId) { this.closeCreatePostComponent.emit(true); }
  }

}
