import { Component } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-page404',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatCardModule,
  ],
  templateUrl: './page404.component.html',
  styleUrl: './page404.component.css'
})
export class Page404Component {
}
