import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { GoRestAPIService } from '../../services/go-rest-api.service';


@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  @Input() typeofObjToSearch!: string;
  @Output() reportSearchList = new EventEmitter();
  optFields: string[] = [];
  fieldSelected: string = '';
  controlField: FormGroup = new FormGroup({
    search: new FormControl(''),
    field: new FormControl('', [Validators.required]),
  })
  translatedFields = {
    name: 'Nome',
    email: 'Email',
    title: 'Titolo',
    body: 'Corpo',
    users: 'Utente',
    posts: 'Post',
  }

  resultList: any[] = [];

  constructor(private goRestApi: GoRestAPIService) { }

  ngOnInit(): void {
    if (this.typeofObjToSearch === 'users') { this.optFields = ['name', 'email']; }
    if (this.typeofObjToSearch === 'posts') { this.optFields = ['title', 'body']; }
    console.log(this.controlField.get('field')?.value, "VALUE")
    this.controlField.get('search')?.disable();
  }

  translationOfObj(field: string): string {
    // console.log(field,"FIELD")
    if (field == 'name' || field == 'email' || field == 'title' || field == 'body' || field == 'users' || field == 'posts') { return this.translatedFields[field]; }
    return '';
  }

  searchQuery(event: any) {
    console.log(event.value);
    if (this.controlField.valid) {
      this.goRestApi.searchObj(event.value, this.fieldSelected, this.typeofObjToSearch).subscribe({
        next: (data: any) => { console.log(data); this.reportSearchList.emit({ data: data, obj: this.typeofObjToSearch }); },
        error: (err: any) => { console.log(err); }
      });
    }
  }
  resetResult() {
    this.controlField.get('search')?.enable();
    this.reportSearchList.emit({ data: [], obj: this.typeofObjToSearch });
    this.controlField.get('search')?.setValue('');
  }
}