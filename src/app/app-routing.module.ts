import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroComponent } from './home/cadastro/cadastro.component';

import { HomeComponent } from './home/home.component';
import { PaginaLoginComponent } from './pagina-login/pagina-login.component';

const routes: Routes = [
  { path: '' , component: PaginaLoginComponent},
  { path: 'home' , component: HomeComponent , children : [
    { path: '' , component: CadastroComponent}

  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
