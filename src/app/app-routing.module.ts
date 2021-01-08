import {  NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroComponent } from './home/cadastro/cadastro.component';
import { ClientesComponent } from './home/clientes/clientes.component';

import { HomeComponent } from './home/home.component';
import { AddServicosDiversosClientesComponent } from './home/utilitarios/add-servicos-diversos-clientes/add-servicos-diversos-clientes.component';
import { DadosFaturaComponent } from './home/utilitarios/dados-fatura/dados-fatura.component';
import { DeletarServicosClientesComponent } from './home/utilitarios/deletar-servicos-clientes/deletar-servicos-clientes.component';
import { PaginaLoginComponent } from './pagina-login/pagina-login.component';
import { AutenticacaoGuardService} from './_model/autenticacao-guard.service'


const routes: Routes = [
  { path: '' , component: PaginaLoginComponent},
  { path: 'home' , component: HomeComponent ,  canActivate: [ AutenticacaoGuardService ],  children : [
    { path: '' , component: ClientesComponent},
    { path: 'clientes' , component: ClientesComponent},
    { path: 'cadastro' , component: CadastroComponent},
    { path: 'dadosFatura', component: DadosFaturaComponent},
    { path: 'deletarServicosClientes', component : DeletarServicosClientesComponent },
    { path: 'addServClientes' , component: AddServicosDiversosClientesComponent}   
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
