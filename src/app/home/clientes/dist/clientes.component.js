"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ClientesComponent = void 0;
var core_1 = require("@angular/core");
var firebase = require("firebase");
var ClientesComponent = /** @class */ (function () {
    function ClientesComponent(consultaCliente, bdService) {
        this.consultaCliente = consultaCliente;
        this.bdService = bdService;
        this.clientes = [];
        this.pag = 1;
        this.contador = 8;
        this.listaFirebase = [];
    }
    ClientesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.cnpjcliente = undefined;
        firebase.auth().onAuthStateChanged(function (user) {
            _this.email = user.email;
        });
        this.consultarTodosCliente();
    };
    // buscarCliente(nome: string): void {
    //   if( nome.length === 0) {
    //     this.listarClientes()
    //   }    
    //   else{      
    //     this.filtrarCliente(nome)
    //   }
    // }
    ClientesComponent.prototype.filtrarCliente = function (nome) {
        var _this = this;
        this.consultaCliente.getClienteNomeempresarial(nome).subscribe(function (resposta) { _this.clientes = resposta.sort(function (a, b) { return (a.nomeEmpresarial - b.nomeEmpresaril) ? 1 : -1; }); });
    };
    ClientesComponent.prototype.somarServicos = function (cliente) {
        var total = 0;
        cliente.listaServico.forEach(function (servico) {
            total += servico.valor;
        });
        return total;
    };
    ClientesComponent.prototype.passarId = function (cnpjcliente) {
        this.cnpjcliente = cnpjcliente;
    };
    ClientesComponent.prototype.buscar = function (evento) {
        console.log('teste');
    };
    ClientesComponent.prototype.consultarTodosCliente = function () {
        this.listaFirebase = this.bdService.getAllClientes();
    };
    ClientesComponent = __decorate([
        core_1.Component({
            selector: 'app-clientes',
            templateUrl: './clientes.component.html',
            styleUrls: ['./clientes.component.css']
        })
    ], ClientesComponent);
    return ClientesComponent;
}());
exports.ClientesComponent = ClientesComponent;
