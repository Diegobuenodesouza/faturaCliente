"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ServicosClienteComponent = void 0;
var forms_1 = require("@angular/forms");
var cliente_1 = require("src/app/_model/cliente");
var servico_1 = require("src/app/_model/servico");
var core_1 = require("@angular/core");
var ServicosClienteComponent = /** @class */ (function () {
    function ServicosClienteComponent(consultaCliente, formBuilder, toastr) {
        this.consultaCliente = consultaCliente;
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.listaNovamente = new core_1.EventEmitter();
        this.cliente = new cliente_1.Cliente(0, '', '', '', '', '', '', '', '', []);
    }
    ServicosClienteComponent.prototype.ngOnInit = function () {
    };
    ServicosClienteComponent.prototype.ngOnChanges = function () {
        var _this = this;
        this.consultaCliente.getIdCliente(this.clienteId).subscribe(function (resposta) {
            _this.cliente = resposta,
                _this.formulario = new forms_1.FormGroup({
                    cnpj: new forms_1.FormControl(_this.cliente.cnpj),
                    nomeEmpresarial: new forms_1.FormControl(_this.cliente.nomeEmpresarial),
                    listaServico: new forms_1.FormArray([])
                }),
                _this.setListaServico();
            _this.somaFatura();
        });
    };
    Object.defineProperty(ServicosClienteComponent.prototype, "listaServico", {
        get: function () {
            return this.formulario.get('listaServico');
        },
        enumerable: false,
        configurable: true
    });
    ServicosClienteComponent.prototype.setListaServico = function () {
        var _this = this;
        this.cliente.listaServico.forEach(function (servico) {
            var serv = _this.formBuilder.group(new servico_1.Servico());
            serv.setValue(servico);
            _this.listaServico.push(serv);
        });
    };
    ServicosClienteComponent.prototype.removeServico = function (index) {
        this.listaServico.removeAt(index);
        this.atualizarLista();
        this.somaFatura();
    };
    ServicosClienteComponent.prototype.addServico = function () {
        var serv = this.formBuilder.group(new servico_1.Servico);
        this.listaServico.push(serv);
    };
    ServicosClienteComponent.prototype.somaFatura = function () {
        var total = 0;
        this.cliente.listaServico.forEach(function (servico) {
            total += servico.valor;
        });
        return total;
    };
    ServicosClienteComponent.prototype.atualizarLista = function () {
        var _this = this;
        this.cliente.listaServico = [];
        var listaServicoFormulario = this.formulario.controls.listaServico.value;
        listaServicoFormulario.forEach(function (servico) {
            _this.cliente.listaServico.push(new servico_1.Servico(servico.descricao, servico.valor, servico.vencimento));
        });
        this.somaFatura();
    };
    ServicosClienteComponent.prototype.atualizaCliente = function () {
        var _this = this;
        this.consultaCliente.putCliente(this.clienteId, this.cliente).subscribe(function () { _this.toastr.success('Servico atualizado com sucesso'), _this.listaNovamente.emit(); });
    };
    __decorate([
        core_1.Input()
    ], ServicosClienteComponent.prototype, "clienteId");
    __decorate([
        core_1.Output()
    ], ServicosClienteComponent.prototype, "listaNovamente");
    ServicosClienteComponent = __decorate([
        core_1.Component({
            selector: 'app-servicos-cliente',
            templateUrl: './servicos-cliente.component.html',
            styleUrls: ['./servicos-cliente.component.css']
        })
    ], ServicosClienteComponent);
    return ServicosClienteComponent;
}());
exports.ServicosClienteComponent = ServicosClienteComponent;
