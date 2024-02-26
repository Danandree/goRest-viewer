import { Component, Inject } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import { User } from '../../interfaces/go-rest-apidata-structure';

@Component({
  selector: 'app-delete-confirmation-dialog',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatDialogClose,
  ],
  templateUrl: './delete-confirmation-dialog.component.html',
  styleUrl: './delete-confirmation-dialog.component.css'
})
export class DeleteConfirmationDialogComponent {
 
  constructor(@Inject(MAT_DIALOG_DATA) public data: {user: User}){}
}
