import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { UserCardMinimalComponent } from './components/user-card-minimal/user-card-minimal.component';

export const routes: Routes = [
    { path: 'users', component: UserCardMinimalComponent, pathMatch: 'full', canActivate: [authGuard] },
    { path: 'login', component: LoginComponent, pathMatch: 'full', canActivate: [authGuard] },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '404', component: LoginComponent, canActivate: [authGuard]  },
    { path: '**', redirectTo: '/404', pathMatch: 'full'},
];
