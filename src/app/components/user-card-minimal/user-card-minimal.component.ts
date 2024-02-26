import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';

import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';

import { User } from '../../interfaces/go-rest-apidata-structure';

import { GoRestAPIService } from '../../services/go-rest-api.service';

@Component({
  selector: 'app-user-card-minimal',
  standalone: true,
  imports: [
    MatCardModule,
    RouterLink,
    MatIconModule,
    MatButtonModule,
    NgClass,
  ],
  templateUrl: './user-card-minimal.component.html',
  styleUrl: './user-card-minimal.component.css'
})
export class UserCardMinimalComponent {
  @Input() user!: User;
  @Output() deleteUserEvent = new EventEmitter<User>();

  constructor(private goRestApi: GoRestAPIService, public dialog: MatDialog) { }

  openDeleteUserDialog(event: Event): void {
    event.stopPropagation();
    this.dialog.open(DeleteConfirmationDialogComponent, { data: { user: this.user } }).afterClosed().subscribe({
      next: (data: boolean) => {
        if (data) {
          this.goRestApi.deleteUserById(this.user.id).subscribe({
            next: (data: any) => { 
              this.deleteUserEvent.emit(this.user); 
              this.dialog.open(MessageDialogComponent, { data: { response: data, message: `L'utente "${this.user.name}" è stato eliminato con successo!` } });
            },
            error: (err: any) => { console.log(err); }
          });
        }
      },
      error: (err: any) => { console.log(err); }
    });
  }
}
