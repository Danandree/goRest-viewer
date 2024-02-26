import { Component, Inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import { ErrorFromGoRestApi } from '../../interfaces/go-rest-apidata-structure';

@Component({
  selector: 'app-message-dialog',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatDialogClose,
  ],
  templateUrl: './message-dialog.component.html',
  styleUrl: './message-dialog.component.css'
})
export class MessageDialogComponent {
  errorToMessage = {
    401: "Token non valido",
  }
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: {response: ErrorFromGoRestApi, message: string}){}
}
