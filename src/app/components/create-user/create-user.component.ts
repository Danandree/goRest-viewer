import { Component } from '@angular/core';
import { FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

import { GoRestAPIService } from '../../services/go-rest-api.service';

import { User } from '../../interfaces/go-rest-apidata-structure';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatRadioModule,
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
  gender: string = '';
  user = new User;

  constructor(private goRestApi: GoRestAPIService, private router: Router) { }
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

  createUser(){
    // console.log(this.controlGroup.valid,"CREATE USER VALID");
    if(this.controlGroup.valid){
      // console.log("CREATE USER");
      // console.log(this.controlGroup.value as User);
      this.user = this.controlGroup.value as User;
      console.log(this.user, "THIS USER")
      this.goRestApi.createUser(this.user).subscribe({
        next: (data: User) => { console.log(data,"CREAZIONE OK");this.router.navigate(['/users',data.id]); },
        error: (err: any) => { console.log(err,"ERRORE CREAZIONE"); }
       });
    }else{console.log("NON VALIDO");}
  }
  clearForm(){
    this.controlGroup.reset();
  }
}
