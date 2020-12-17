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
  providers: [ BuscaCepService , ConsultaClientesService  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
