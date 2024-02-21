import { Component } from '@angular/core';

import { AuthService } from '../../auth/auth.service';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  hide = true;
  private _tokenUrl: string = 'https://gorest.co.in/my-account/access-tokens'
  tokenControl: FormControl = new FormControl('', [Validators.required]);

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.tryAutoLogin()
  }

  goToTokenUrl(): void {
    window.location.href = this._tokenUrl;
  }

  checkToken(): void {
    console.log(this.tokenControl.value,"TOKEN CONTROL VALUE");
    this.authService.checkToken(this.tokenControl.value);
  }
}
