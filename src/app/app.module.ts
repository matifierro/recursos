import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { AddCursoComponent } from './components/curso/add-curso/add-curso.component';
import { ViewCursoComponent } from './components/curso/view-curso/view-curso.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './shared/header/header.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { CursoService } from './services/curso.service';
import { AddUserComponent } from './components/user/add-user/add-user.component';
import { ViewUserComponent } from './components/user/view-user/view-user.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AuthInterceptorService } from './auth/auth-interceptor';
import { ListCursoComponent } from './components/curso/list-curso/list-curso.component';
import { QuienesSomosComponent } from './components/quienes-somos/quienes-somos.component';
import { PresentationCursoComponent } from './components/curso/presentation-curso/presentation-curso.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { CreditCardComponent } from './components/credit-card/credit-card.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    AddCursoComponent,
    ViewCursoComponent,
    HeaderComponent,
    AddUserComponent,
    ViewUserComponent,
    LoginComponent,
    LogoutComponent,
    ListCursoComponent,
    QuienesSomosComponent,
    PresentationCursoComponent,
    CreditCardComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    YouTubePlayerModule
   
  ],
  providers: [CursoService, 
              provideHttpClient(withInterceptorsFromDi()),
              {
                provide: HTTP_INTERCEPTORS,
                useClass: AuthInterceptorService,
                multi: true
              }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
