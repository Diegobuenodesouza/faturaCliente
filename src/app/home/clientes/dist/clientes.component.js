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
var ClientesComponent = /** @class */ (function () {
    function ClientesComponent(consultaCliente) {
        this.consultaCliente = consultaCliente;
        this.pag = 1;
        this.contador = 8;
        this.listaClientes = [];
    }
    ClientesComponent.prototype.ngOnInit = function () {
        this.clienteId = undefined;
        this.todosClientes();
    };
    ClientesComponent.prototype.todosClientes = function () {
        var _this = this;
        this.consultaCliente.getClientes().subscribe(function (resposta) {
            for (var _i = 0, _a = Object.keys(resposta); _i < _a.length; _i++) {
                var key = _a[_i];
                var cliente = resposta[key];
                _this.listaClientes.push(cliente);
            }
        });
    };
    ClientesComponent.prototype.somarServicos = function (cliente) {
        var total = 0;
        if (cliente.listaServico === undefined) {
            return total;
        }
        cliente.listaServico.forEach(function (servico) {
            total += servico.valor;
        });
        return total;
    };
    ClientesComponent.prototype.passarId = function (cnpjcliente) {
        this.clienteId = cnpjcliente;
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
