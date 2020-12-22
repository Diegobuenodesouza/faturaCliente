"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var app_routing_module_1 = require("./app-routing.module");
var http_1 = require("@angular/common/http");
var common_1 = require("@angular/common");
var app_component_1 = require("./app.component");
var topo_component_1 = require("./home/topo/topo.component");
var footer_component_1 = require("./home/footer/footer.component");
var home_component_1 = require("./home/home.component");
var cadastro_component_1 = require("./home/cadastro/cadastro.component");
var login_component_1 = require("./pagina-login/login/login.component");
var banner_component_1 = require("./pagina-login/banner/banner.component");
var pagina_login_component_1 = require("./pagina-login/pagina-login.component");
var clientes_component_1 = require("./home/clientes/clientes.component");
var forms_1 = require("@angular/forms");
var animations_1 = require("@angular/platform-browser/animations");
var ngx_toastr_1 = require("ngx-toastr");
var busca_cep_service_1 = require("./busca-cep.service");
var consulta_clientes_service_1 = require("./consulta-clientes.service");
var ngx_mask_1 = require("ngx-mask");
var editar_cliente_component_1 = require("./home/clientes/editar-cliente/editar-cliente.component");
var deletar_cliente_component_1 = require("./home/clientes/deletar-cliente/deletar-cliente.component");
var cpfcnpj_pipe_pipe_1 = require("./pipe/cpfcnpj-pipe.pipe");
var servicos_cliente_component_1 = require("./home/clientes/servicos-cliente/servicos-cliente.component");
var ngx_pagination_1 = require("ngx-pagination");
var autenticacao_service_1 = require("./_model/autenticacao.service");
var autenticacao_guard_service_1 = require("./_model/autenticacao-guard.service");
var core_2 = require("@angular/core");
var common_2 = require("@angular/common");
var pt_1 = require("@angular/common/locales/pt");
common_2.registerLocaleData(pt_1["default"]);
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                topo_component_1.TopoComponent,
                footer_component_1.FooterComponent,
                home_component_1.HomeComponent,
                cadastro_component_1.CadastroComponent,
                login_component_1.LoginComponent,
                banner_component_1.BannerComponent,
                pagina_login_component_1.PaginaLoginComponent,
                clientes_component_1.ClientesComponent,
                editar_cliente_component_1.EditarClienteComponent,
                deletar_cliente_component_1.DeletarClienteComponent,
                cpfcnpj_pipe_pipe_1.CpfcnpjPipePipe,
                servicos_cliente_component_1.ServicosClienteComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                ngx_pagination_1.NgxPaginationModule,
                app_routing_module_1.AppRoutingModule,
                forms_1.ReactiveFormsModule,
                http_1.HttpClientModule,
                ngx_mask_1.NgxMaskModule.forRoot(),
                common_1.CommonModule,
                animations_1.BrowserAnimationsModule,
                ngx_toastr_1.ToastrModule.forRoot(),
            ],
            providers: [{ provide: core_2.LOCALE_ID, useValue: 'pt-BR' }, autenticacao_service_1.AutenticacaoService, autenticacao_guard_service_1.AutenticacaoGuardService, busca_cep_service_1.BuscaCepService, consulta_clientes_service_1.ConsultaClientesService],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
