import { Component } from '@angular/core';

import { GoRestAPIService } from '../../services/go-rest-api.service';

import { User, ErrorFromGoRestApi } from '../../interfaces/go-rest-apidata-structure';
import { UserCardMinimalComponent } from '../user-card-minimal/user-card-minimal.component';
@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    UserCardMinimalComponent
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent {
  userList: User[] = [];
  constructor(private goRestApi: GoRestAPIService){}

  ngOnInit(): void {
    this.goRestApi.getUsersList().subscribe({
      next: (users: User[]) => { this.userList = users; },
      error: (err: ErrorFromGoRestApi) => { console.log(err); }
    });
  }
}
