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
        this.listakey = [];
        this.valorTotal = 0;
    }
    ClientesComponent.prototype.ngOnInit = function () {
        this.clienteKey = undefined;
        this.todosClientes();
    };
    ClientesComponent.prototype.todosClientes = function () {
        var _this = this;
        this.consultaCliente.getClientes().subscribe(function (resposta) {
            _this.listaClientes = Object.values(resposta), _this.faturamentoTotal();
        });
    };
    ClientesComponent.prototype.filtrar = function (busca) {
        var _this = this;
        if (busca.length === 0) {
            this.todosClientes();
        }
        else {
            this.consultaCliente.getClientes().subscribe(function (resposta) {
                var listaFiltrada = [];
                for (var _i = 0, _a = Object.values(resposta); _i < _a.length; _i++) {
                    var cliente = _a[_i];
                    if (cliente['nomeEmpresarial'].toLowerCase().includes(busca.toLowerCase())) {
                        listaFiltrada.push(cliente);
                    }
                }
                _this.listaClientes = listaFiltrada;
            });
        }
    };
    ClientesComponent.prototype.faturamentoTotal = function () {
        var _this = this;
        var total = 0;
        this.listaClientes.forEach(function (cliente) {
            total += _this.somarServicos(cliente);
        });
        this.valorTotal = total;
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
    ClientesComponent.prototype.passarId = function (key) {
        this.clienteKey = key;
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
