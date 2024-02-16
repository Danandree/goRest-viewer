import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UserCardDetailsComponent } from './components/user-card-details/user-card-details.component';

export const routes: Routes = [
    { path: 'users/:id', component: UserCardDetailsComponent, pathMatch: 'full', canActivate: [authGuard] },
    { path: 'users', component: UsersListComponent, pathMatch: 'full', canActivate: [authGuard] },
    { path: 'login', component: LoginComponent, pathMatch: 'full', canActivate: [authGuard] },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '404', component: LoginComponent, canActivate: [authGuard]  },
    { path: '**', redirectTo: '/404', pathMatch: 'full'},
];
