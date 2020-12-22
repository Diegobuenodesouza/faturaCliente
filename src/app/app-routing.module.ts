import {  NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroComponent } from './home/cadastro/cadastro.component';
import { ClientesComponent } from './home/clientes/clientes.component';

import { HomeComponent } from './home/home.component';
import { PaginaLoginComponent } from './pagina-login/pagina-login.component';
import { AutenticacaoGuardService} from './_model/autenticacao-guard.service'


const routes: Routes = [
  { path: '' , component: PaginaLoginComponent},
  { path: 'home' , component: HomeComponent ,  canActivate: [ AutenticacaoGuardService ],  children : [
    { path: '' , component: ClientesComponent},
    { path: 'clientes' , component: ClientesComponent},
    { path: 'cadastro' , component: CadastroComponent}

  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
