import { Component, Inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import { ErrorFromGoRestApi } from '../../interfaces/go-rest-apidata-structure';
import { MatExpansionModule } from '@angular/material/expansion';
@Component({
  selector: 'app-message-dialog',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatDialogClose,
    MatExpansionModule,
  ],
  templateUrl: './message-dialog.component.html',
  styleUrl: './message-dialog.component.css'
})
export class MessageDialogComponent {
  messageToDisplay = {
    deleteUserOk: "Utente eliminato con successo",
    deleteUserKO: "Impossibile eliminare l'utente",
  };
  constructor(@Inject(MAT_DIALOG_DATA) public data: {response: ErrorFromGoRestApi, message: string}){}

  ngOnInit(): void {
    console.log(this.data.response,"DATA RESPONSE");
  }
}
