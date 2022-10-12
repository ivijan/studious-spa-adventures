import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { RedirectComponent } from './components/redirect/redirect.component';
import { AuthGuard } from './guards/auth.guard';
import { Role } from './interfaces/role.enum';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: RedirectComponent,
  },
  {
    path: 'roles:role',
    canActivate: [AuthGuard],
    data: { roles: [Role.user, Role.admin] },
    component: RedirectComponent,
  },
  {
    path: 'user',
    component: HomeComponent,
    data: { view: 'details' },
    canActivate: [AuthGuard],
  },
  {
    path: 'users',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
