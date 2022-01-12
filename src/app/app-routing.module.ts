import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { redirectUnauthorizedTo, redirectLoggedInTo, AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';

import { LoginComponent, RegisterComponent } from './authentication';

const redirectLoggedInToHomePage = () => redirectLoggedInTo(['']);
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo('/auth/login');

const routes: Routes = [
  // authentication
  {
    path: 'auth',
    children: [
      { path: '', pathMatch: 'full' , redirectTo: 'login' },
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToHomePage }
      },
      {
        path: 'register',
        component: RegisterComponent,
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectLoggedInToHomePage }
      },

    ]
  },

  // not existing paths
  { path: '**', redirectTo: 'auth' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
