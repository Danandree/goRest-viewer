import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { UserCardDetailsComponent } from './components/user-card-details/user-card-details.component';
import { ListsComponent } from './components/lists/lists.component';
import { Page404Component } from './components/page404/page404.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { CreatePostComponent } from './components/create-post/create-post.component';

export const routes: Routes = [
    { path: 'lists/:type', component: ListsComponent, pathMatch: 'full', canActivate: [authGuard] }, // <--
    { path: 'users/:id', component: UserCardDetailsComponent, pathMatch: 'full', canActivate: [authGuard] },
    { path: 'createPost', component: CreatePostComponent, pathMatch: 'full', canActivate: [authGuard] },
    { path: 'createUser', component: CreateUserComponent, pathMatch: 'full', canActivate: [authGuard] },
    // { path: 'posts', component: PostsListComponent, pathMatch: 'full', canActivate: [authGuard] },
    // { path: 'users', component: UsersListComponent, pathMatch: 'full', canActivate: [authGuard] },
    // { path: 'users/:id', component: UserCardDetailsComponent, pathMatch: 'full', canActivate: [authGuard] },
    { path: 'login', component: LoginComponent, pathMatch: 'full'},
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '404', component: Page404Component, canActivate: [authGuard] },// Cambiare pagina
    { path: '**', redirectTo: '/404', pathMatch: 'full' },
];
