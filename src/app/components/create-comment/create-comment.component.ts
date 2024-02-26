import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { GoRestAPIService } from '../../services/go-rest-api.service';

import { Comment } from '../../interfaces/go-rest-apidata-structure';

@Component({
  selector: 'app-create-comment',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './create-comment.component.html',
  styleUrl: './create-comment.component.css'
})
export class CreateCommentComponent {
  @Input() postId!: number;
  @Output() closeCreateCommentComponent = new EventEmitter();
  comment = new Comment;
  controlGroup = new FormGroup({
    body: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  constructor(private goRestApi: GoRestAPIService) { }

  getErrorMessage(form: string) {
    if (this.controlGroup.get(form)?.hasError('required')) {
      switch (form) {
        case "name":
          return "Inserire il nome";
        case "email":
          return "Inserire la mail";
        case "body":
          return "Inserire il commento";
      }
    }
    return "La mail deve essere valida";
  
  }
  createComment(){
    if(this.controlGroup.valid){
      console.log(this.controlGroup.value);
      this.comment.body = this.controlGroup.value.body!;
      this.comment.name = this.controlGroup.value.name!;
      this.comment.email = this.controlGroup.value.email!;
      this.comment.post_id = this.postId;
      this.goRestApi.createComment(this.comment).subscribe({
        next: (data: any) => { console.log(data); this.closeCreateComment(true);},
        error: (err: any) => { console.log(err); },
      });
    }
  }

  closeCreateComment(refreshComments: boolean = false){
    this.closeCreateCommentComponent.emit(refreshComments);
  }
}
