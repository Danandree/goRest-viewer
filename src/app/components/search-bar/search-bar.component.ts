import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

import { User } from '../../interfaces/go-rest-apidata-structure'

import { UserCardMinimalComponent } from '../user-card-minimal/user-card-minimal.component';
import { PostCardComponent } from '../post-card/post-card.component';

import { GoRestAPIService } from '../../services/go-rest-api.service';
import { debounceTime, distinctUntilChanged, switchMap, Observable } from 'rxjs';

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
  objPerPage = 20;
  resultCall$!: Observable<any>;

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

    this.controlField.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(searchTerm => this.checkQuery(searchTerm)))
      .subscribe(data => { this.resultList = data; });
  }

  checkQuery(searchTerm: any): Observable<any> {
    if (searchTerm.search != '') {
      // this.page = 1;
      this.resultCall$ = this.goRestApi.searchObject(searchTerm.search, searchTerm.field, this.typeofObjToSearch, this.page, this.objPerPage);
      return this.resultCall$;
    }
    else { return new Observable<any>(observer => observer.next([])); }
  }

  resetResult(): void {
    this.controlField.get('search')?.enable();
    this.controlField.get('search')?.setValue('');
  }

  deleteUser(user: User): void {
    this.resultList = this.resultList.filter(u => u.id != user.id);
  }

  loadMore(): void {
    this.page++;
    this.resultCall$.subscribe({
      next: (data) => { this.resultList = this.resultList.concat(data); },
      error: (err) => { console.log(err); }
    });
  }

  translationOfObj(field: string): string {
    if (field == 'name' || field == 'email' || field == 'title' || field == 'body' || field == 'users' || field == 'posts') { return this.translatedFields[field]; }
    return '';
  }
}