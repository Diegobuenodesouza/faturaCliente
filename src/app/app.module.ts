import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule  } from '@angular/common/http';

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


import { BuscaCepService} from './busca-cep.service';
import { ConsultaClientesService } from './consulta-clientes.service';

import { NgxMaskModule } from 'ngx-mask';
import { EditarClienteComponent } from './home/clientes/editar-cliente/editar-cliente.component';

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
    EditarClienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot()
  ],
  providers: [ BuscaCepService , ConsultaClientesService  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
