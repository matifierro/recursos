import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCursoComponent } from './components/curso/add-curso/add-curso.component';
import { ViewCursoComponent } from './components/curso/view-curso/view-curso.component';
import { AddUserComponent } from './components/user/add-user/add-user.component';
import { ViewUserComponent } from './components/user/view-user/view-user.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AuthGuard } from './auth/auth.guard';
import { ListCursoComponent } from './components/curso/list-curso/list-curso.component';
import { QuienesSomosComponent } from './components/quienes-somos/quienes-somos.component';
import { PresentationCursoComponent } from './components/curso/presentation-curso/presentation-curso.component';
import { CreditCardComponent } from './components/credit-card/credit-card.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent, canActivate:[AuthGuard]},
  {path: 'add-user', component: AddUserComponent},
  {path: 'viewUser', component: ViewUserComponent, canActivate:[AuthGuard], data: { roles: ['ADMIN'] }},
  {path: 'addCurso', component: AddCursoComponent, canActivate:[AuthGuard], data: { roles: ['USER'] }},
  {path: 'viewCurso', component: ViewCursoComponent},
  {path: 'listCurso', component: ListCursoComponent, canActivate:[AuthGuard], data: { roles: ['USER'] }},
  {path: 'quienes-somos', component: QuienesSomosComponent},
  {path: 'creditCard/:cursoId', component:CreditCardComponent,canActivate:[AuthGuard], data: { roles: ['USER'] }},
  {path: 'curso/:cursoId', component: PresentationCursoComponent,canActivate:[AuthGuard], data: { roles: ['USER','ADMIN'] }},
  {path: '', redirectTo: 'viewCurso', pathMatch: 'full'},
  {path: '**', redirectTo: 'viewCurso'}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
