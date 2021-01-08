"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AddServicosDiversosClientesComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var AddServicosDiversosClientesComponent = /** @class */ (function () {
    function AddServicosDiversosClientesComponent(consultaCliente) {
        this.consultaCliente = consultaCliente;
        this.listaCliente = [];
        this.formulario = new forms_1.FormArray([]);
        this.checkFormulario = false;
        this.clientesSelencionadosForm = new forms_1.FormArray([]);
    }
    AddServicosDiversosClientesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.consultaCliente.getClientes().subscribe(function (respost) { _this.listaCliente = Object.values(respost), _this.gerarFormulario(); });
    };
    AddServicosDiversosClientesComponent.prototype.gerarFormulario = function () {
        var _this = this;
        this.listaCliente.forEach(function (cliente) {
            _this.formulario.push(new forms_1.FormGroup({
                check: new forms_1.FormControl(false),
                cnpj: new forms_1.FormControl(cliente.cnpj),
                nome: new forms_1.FormControl(cliente.nomeEmpresarial),
                localidade: new forms_1.FormControl(cliente.localidade)
            }));
        });
    };
    AddServicosDiversosClientesComponent.prototype.disabledButton = function () {
        return this.formulario.controls.every(function (formGroup) { return formGroup.value.check === false; });
    };
    AddServicosDiversosClientesComponent.prototype.marcaEDesmascar = function () {
        var _this = this;
        this.checkFormulario = !this.checkFormulario;
        this.formulario.controls.forEach(function (formGroup) {
            formGroup.controls.check.setValue(_this.checkFormulario);
        });
    };
    AddServicosDiversosClientesComponent.prototype.clientesSelecionados = function () {
        var _this = this;
        this.clientesSelencionadosForm = new forms_1.FormArray([]);
        this.formulario.controls.forEach(function (formGroup) {
            if (formGroup.value.check === true) {
                _this.clientesSelencionadosForm.push(formGroup);
            }
        });
    };
    AddServicosDiversosClientesComponent = __decorate([
        core_1.Component({
            selector: 'app-add-servicos-diversos-clientes',
            templateUrl: './add-servicos-diversos-clientes.component.html',
            styleUrls: ['./add-servicos-diversos-clientes.component.css']
        })
    ], AddServicosDiversosClientesComponent);
    return AddServicosDiversosClientesComponent;
}());
exports.AddServicosDiversosClientesComponent = AddServicosDiversosClientesComponent;
