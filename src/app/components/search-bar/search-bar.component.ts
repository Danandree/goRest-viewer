import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

import { GoRestAPIService } from '../../services/go-rest-api.service';

import { ActivatedRoute, Router } from '@angular/router';

import { UserCardMinimalComponent } from '../user-card-minimal/user-card-minimal.component';
import { PostCardComponent } from '../post-card/post-card.component';

import { User, Post } from '../../interfaces/go-rest-apidata-structure'


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
    MatCardModule,
    PostCardComponent,
    UserCardMinimalComponent,
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  typeofObjToSearch = '';

  optFields: string[] = [];
  fieldSelected: string = '';
  controlField: FormGroup = new FormGroup({
    search: new FormControl(''),
    field: new FormControl('', [Validators.required]),
  });

  translatedFields = {
    name: 'Nome',
    email: 'Email',
    title: 'Titolo',
    body: 'Corpo',
    users: 'Utente',
    posts: 'Post',
  };

  resultList: any[] = [];
  page = 1;
  objPerPage = 10;
  queryToSearch: string = '';

  constructor(private goRestApi: GoRestAPIService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.get('type') === 'users') { this.typeofObjToSearch = 'users'; }
      else if (params.get('type') === 'posts') { this.typeofObjToSearch = 'posts'; }
      else { this.router.navigate(['/404']); }
      if (this.typeofObjToSearch === 'users') { this.optFields = ['name', 'email']; }
      if (this.typeofObjToSearch === 'posts') { this.optFields = ['title', 'body']; }
    });
    this.controlField.get('search')?.disable();
  }

  translationOfObj(field: string): string {
    if (field == 'name' || field == 'email' || field == 'title' || field == 'body' || field == 'users' || field == 'posts') { return this.translatedFields[field]; }
    return '';
  }

  searchQuery(event: any) {
    if (this.controlField.valid) {
      if (this.queryToSearch !== event.value) {
        this.page = 1;
        this.resultList = [];
        this.queryToSearch = event.value;
      }
      this.searchObject();
    }
  }

  searchObject() {
    this.goRestApi.searchObjPage(this.queryToSearch, this.fieldSelected, this.typeofObjToSearch, this.page, this.objPerPage).subscribe({ // <--
      next: (data: any) => { this.resultList = this.resultList.concat(data); },
      error: (err: any) => { console.log(err); }
    });
  }

  resetResult() {
    this.controlField.get('search')?.enable();
    this.controlField.get('search')?.setValue('');
  }

  deleteUser(user: User): void {
    this.resultList = this.resultList.filter(u => u.id != user.id);
  }

  loadMore() {
    this.page++;
    this.searchObject();
  }

}