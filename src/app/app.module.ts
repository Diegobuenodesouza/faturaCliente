import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule  } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { TopoComponent } from './home/topo/topo.component';
import { FooterComponent } from './home/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { CadastroComponent } from './home/cadastro/cadastro.component';
import { LoginComponent } from './pagina-login/login/login.component';
import { BannerComponent } from './pagina-login/banner/banner.component';
import { PaginaLoginComponent } from './pagina-login/pagina-login.component';
import { ClientesComponent } from './home/clientes/clientes.component';
import {  ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { BuscaCepService} from './busca-cep.service';
import { ConsultaClientesService } from './consulta-clientes.service';

import { NgxMaskModule } from 'ngx-mask';
import { EditarClienteComponent } from './home/clientes/editar-cliente/editar-cliente.component';
import { DeletarClienteComponent } from './home/clientes/deletar-cliente/deletar-cliente.component';
import { CpfcnpjPipePipe } from './pipe/cpfcnpj-pipe.pipe';
import { ServicosClienteComponent } from './home/clientes/servicos-cliente/servicos-cliente.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AutenticacaoService} from './_model/autenticacao.service';
import { AutenticacaoGuardService } from './_model/autenticacao-guard.service';



import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePtBr from '@angular/common/locales/pt';
import { DadosFaturaComponent } from './home/utilitarios/dados-fatura/dados-fatura.component';
import { DeletarServicosClientesComponent } from './home/utilitarios/deletar-servicos-clientes/deletar-servicos-clientes.component';
import { ConfirmarDelServicoComponent } from './home/utilitarios/deletar-servicos-clientes/confirmar-del-servico/confirmar-del-servico.component';
import { AddServicosDiversosClientesComponent } from './home/utilitarios/add-servicos-diversos-clientes/add-servicos-diversos-clientes.component';
import { AdicionarServicosComponent } from './home/utilitarios/add-servicos-diversos-clientes/adicionar-servicos/adicionar-servicos.component';

registerLocaleData(localePtBr);

@NgModule({
  declarations: [
    AppComponent,
    TopoComponent,
    FooterComponent,
    HomeComponent,
    CadastroComponent,
    LoginComponent,
    BannerComponent,
    PaginaLoginComponent,
    ClientesComponent,
    EditarClienteComponent,
    DeletarClienteComponent,
    CpfcnpjPipePipe,
    ServicosClienteComponent,
    DadosFaturaComponent,
    DeletarServicosClientesComponent,
    ConfirmarDelServicoComponent,
    AddServicosDiversosClientesComponent,
    AdicionarServicosComponent,
    
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [ { provide: LOCALE_ID, useValue : 'pt-BR' }  ,  AutenticacaoService, AutenticacaoGuardService, BuscaCepService , ConsultaClientesService  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
