import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { ClientsComponent } from './home/clients/clients.component';
import { RegisterComponent } from './auth/register/register.component';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { ClientViewComponent } from './home/clients/client-view/client-view.component';
import { AddClientComponent } from './home/clients/add-client/add-client.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'welcome' }, // Default route
      { path: 'welcome', component: WelcomeComponent },
      { path: 'clients', component: ClientsComponent, children: [
        { path: 'add-client', component: AddClientComponent, canActivate: [AdminGuard] },
        { path: ':cid', component: ClientViewComponent },
      ] },
    ],
  },
  { path: '**', redirectTo: 'auth', },
];
