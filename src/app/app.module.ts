import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { TopoComponent } from './home/topo/topo.component';
import { FooterComponent } from './home/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { CadastroComponent } from './home/cadastro/cadastro.component';
import { LoginComponent } from './pagina-login/login/login.component';
import { BannerComponent } from './pagina-login/banner/banner.component';
import { PaginaLoginComponent } from './pagina-login/pagina-login.component';
import { ClientesComponent } from './home/clientes/clientes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import {HttpClientModule  } from '@angular/common/http';
import { BuscaCepService} from './busca-cep.service';

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
    ClientesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [ BuscaCepService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
