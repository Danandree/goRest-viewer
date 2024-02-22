import { Component } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
// import {MatButtonToggleModule} from '@angular/material/button-toggle';

import { RouterLink } from '@angular/router';

// import { User, Post } from '../../interfaces/go-rest-apidata-structure';}
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    RouterLink,
    // MatButtonToggleModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private authService: AuthService) {}

  isUserLogged(): boolean{
    return this.authService.isLogged;
  }
  logout(): void {
    this.authService.logout();
  }
}
