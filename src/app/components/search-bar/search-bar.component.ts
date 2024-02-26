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
  // @Output() reportSearchList = new EventEmitter();
  // @Output() closeBar = new EventEmitter();

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
  page = 1;
  objPerPage = 10;
  queryToSearch: string = '';

  constructor(private goRestApi: GoRestAPIService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.get('type') === 'users') { this.typeofObjToSearch = 'users'; }
      else if (params.get('type') === 'posts') { this.typeofObjToSearch = 'posts'; }
      else { this.router.navigate(['/404']); }
      // console.log(params.get('type'), "PARAMS");
      if (this.typeofObjToSearch === 'users') { this.optFields = ['name', 'email']; }
      if (this.typeofObjToSearch === 'posts') { this.optFields = ['title', 'body']; }
    });
    // if (this.router.url.includes('users')) { this.typeofObjToSearch = 'users'; }
    // if (this.router.url.includes('posts')) { this.typeofObjToSearch = 'posts'; }
    // console.log(this.controlField.get('field')?.value, "VALUE")
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
      next: (data: any) => {
        console.log(data);
        this.resultList = this.resultList.concat(data);
      },
      error: (err: any) => { console.log(err); }
    });
  }

  resetResult() {
    this.controlField.get('search')?.enable();
    this.controlField.get('search')?.setValue('');
  }

  loadMore() {
    this.page++;
    this.searchObject();
  }
  deleteUser(user: User): void {
    // console.log(user);
    this.resultList = this.resultList.filter(u => u.id != user.id);
  }
}