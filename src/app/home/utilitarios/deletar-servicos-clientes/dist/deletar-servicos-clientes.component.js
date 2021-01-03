"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DeletarServicosClientesComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var DeletarServicosClientesComponent = /** @class */ (function () {
    function DeletarServicosClientesComponent(http, fb) {
        this.http = http;
        this.fb = fb;
        this.listaClientes = [];
        this.clienteFormulario = new forms_1.FormArray([]);
        this.checkFormulario = false;
    }
    DeletarServicosClientesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.http.getClientes().subscribe(function (resposta) { _this.listaClientes = Object.values(resposta), _this.CriacaoFormulario(); });
    };
    DeletarServicosClientesComponent.prototype.quantidadeServicos = function (cliente) {
        return cliente.listaServico !== undefined ? cliente.listaServico.length : 0;
    };
    DeletarServicosClientesComponent.prototype.somaServicos = function (cliente) {
        var total = 0;
        if (cliente.listaServico === undefined) {
            return total;
        }
        cliente.listaServico.map(function (servico) {
            total += servico.valor;
        });
        return total;
    };
    DeletarServicosClientesComponent.prototype.CriacaoFormulario = function () {
        var _this = this;
        this.listaClientes.forEach(function (cliente) {
            var form = _this.fb.group({
                check: [false],
                cnpj: [cliente.cnpj],
                nome: [cliente.nomeEmpresarial],
                valorAtual: [_this.somaServicos(cliente)],
                quantidadeServico: [_this.quantidadeServicos(cliente)]
            });
            _this.clienteFormulario.push(form);
        });
    };
    DeletarServicosClientesComponent.prototype.marcaEDesmascar = function () {
        var _this = this;
        this.checkFormulario = !this.checkFormulario;
        this.clienteFormulario.controls.forEach(function (cliente) {
            cliente.controls.check.setValue(_this.checkFormulario);
        });
    };
    DeletarServicosClientesComponent = __decorate([
        core_1.Component({
            selector: 'app-deletar-servicos-clientes',
            templateUrl: './deletar-servicos-clientes.component.html',
            styleUrls: ['./deletar-servicos-clientes.component.css']
        })
    ], DeletarServicosClientesComponent);
    return DeletarServicosClientesComponent;
}());
exports.DeletarServicosClientesComponent = DeletarServicosClientesComponent;
