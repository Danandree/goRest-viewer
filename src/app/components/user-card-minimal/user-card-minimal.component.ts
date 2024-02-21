import { Component, Input, Output, EventEmitter } from '@angular/core';

import { User } from '../../interfaces/go-rest-apidata-structure';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

import { GoRestAPIService } from '../../services/go-rest-api.service';



@Component({
  selector: 'app-user-card-minimal',
  standalone: true,
  imports: [
    MatCardModule,
    RouterLink,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './user-card-minimal.component.html',
  styleUrl: './user-card-minimal.component.css'
})
export class UserCardMinimalComponent {
  @Input() user!: User;
  @Output() deleteUserEvent = new EventEmitter<User>();

  constructor(private goRestApi: GoRestAPIService){}

  deleteUser(event: Event): void {
    event.stopPropagation();
    console.log("delete user: ", this.user);
    this.goRestApi.deleteUserById(this.user.id).subscribe({
      next: (data: any) => { console.log(data,"EMIT EVENT");console.log(this.user);this.deleteUserEvent.emit(this.user); },
      error: (err: any) => { console.log(err); }
    });
   }
}
