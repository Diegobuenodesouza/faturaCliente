"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var cadastro_component_1 = require("./home/cadastro/cadastro.component");
var clientes_component_1 = require("./home/clientes/clientes.component");
var home_component_1 = require("./home/home.component");
var dados_fatura_component_1 = require("./home/utilitarios/dados-fatura/dados-fatura.component");
var pagina_login_component_1 = require("./pagina-login/pagina-login.component");
var autenticacao_guard_service_1 = require("./_model/autenticacao-guard.service");
var routes = [
    { path: '', component: pagina_login_component_1.PaginaLoginComponent },
    { path: 'home', component: home_component_1.HomeComponent, canActivate: [autenticacao_guard_service_1.AutenticacaoGuardService], children: [
            { path: '', component: clientes_component_1.ClientesComponent },
            { path: 'clientes', component: clientes_component_1.ClientesComponent },
            { path: 'cadastro', component: cadastro_component_1.CadastroComponent },
            { path: 'dadosFatura', component: dados_fatura_component_1.DadosFaturaComponent }
        ] }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
