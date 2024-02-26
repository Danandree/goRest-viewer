import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';

import { User } from '../../interfaces/go-rest-apidata-structure';

import { MessageDialogComponent } from '../message-dialog/message-dialog.component';

import { GoRestAPIService } from '../../services/go-rest-api.service';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {
  controlGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required])
  })
  user = new User;

  constructor(private goRestApi: GoRestAPIService, private router: Router, private dialog: MatDialog) { }
  getErrorMessage(form: string) {
    if (this.controlGroup.get(form)?.hasError('required')) {
      switch (form) {
        case "email":
          return "Inserire la mail";
        case "name":
          return "Inserire il nome";
        case "gender":
          return "Inserire il sesso";
        case "status":
          return "Inserire lo stato";
      }
    }
    if (this.controlGroup.get(form)?.hasError('email')) { return "Email non vailda"; }
    return "ERRORE";
  }

  createUser() {
    if (this.controlGroup.valid) {
      this.user = this.controlGroup.value as User;
      this.goRestApi.createUser(this.user).subscribe({
        next: (data: User) => { console.log(data, "CREAZIONE OK"); this.router.navigate(['/users', data.id]); },
        error: (err: any) => {
          this.dialog.open(MessageDialogComponent, {
            data: { response: err, message: 'Utente non creato' }
          })
        }
      });
    }
  }

  clearForm() {
    this.controlGroup.reset();
  }
}
