import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SystemModule } from './system/system.module';
import { CoreModule } from './core/core.module';
import { UserModule } from './user/user.module';
import { HttpClientModule } from '@angular/common/http';
import { ErrorComponent } from './error/error.component';
import { AppInterceptorProvider } from './app.interceptor';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule } from '@angular/forms';
import { NotFoundComponent } from './not-found/not-found.component';

import { DatePipe, registerLocaleData } from '@angular/common';
import localeBg from '@angular/common/locales/bg';

registerLocaleData(localeBg, 'bg');

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    AuthenticateComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SystemModule,
    CoreModule,
    UserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [AppInterceptorProvider, CookieService, DatePipe, { provide: LOCALE_ID, useValue: 'bg' }],
  bootstrap: [AppComponent]  
})
export class AppModule { }
