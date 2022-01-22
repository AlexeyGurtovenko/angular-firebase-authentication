import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/shared/shared.module';
import { OverlayModule } from '@angular/cdk/overlay';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { ToastrModule } from 'ngx-toastr';

import { environment } from '../environments/environment';

import * as Auth from './authentication';
import * as TopBar from './top-bar';

import { GlobalErrorHandlerService } from './services/error-handler/global-error-handler.service';

@NgModule({
  declarations: [
    AppComponent,

    // auth
    Auth.LoginComponent,
    Auth.RegisterComponent,
    
    // top bar
    TopBar.TopBarComponent,
    TopBar.UserInfoComponent,
    TopBar.NotificationBellComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    ToastrModule.forRoot(),
    OverlayModule
  ],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
