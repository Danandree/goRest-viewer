import { Component, Input } from '@angular/core';

import { User } from '../../interfaces/go-rest-apidata-structure';

import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-user-card-minimal',
  standalone: true,
  imports: [
    MatCardModule,
    RouterLink,
  ],
  templateUrl: './user-card-minimal.component.html',
  styleUrl: './user-card-minimal.component.css'
})
export class UserCardMinimalComponent {
@Input() user!: User;
}
