"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EditarClienteComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var EditarClienteComponent = /** @class */ (function () {
    function EditarClienteComponent(buscaCep, consultaCliente, toastr, router) {
        this.buscaCep = buscaCep;
        this.consultaCliente = consultaCliente;
        this.toastr = toastr;
        this.router = router;
        this.listanovamente = new core_1.EventEmitter();
        this.erroCep = false;
        this.formularioEditar = new forms_1.FormGroup({
            cnpj: new forms_1.FormControl('', [forms_1.Validators.required]),
            nomeEmpresarial: new forms_1.FormControl('', [forms_1.Validators.required]),
            cep: new forms_1.FormControl('', [forms_1.Validators.required]),
            logradouro: new forms_1.FormControl('', [forms_1.Validators.required]),
            numero: new forms_1.FormControl(''),
            bairro: new forms_1.FormControl('', [forms_1.Validators.required]),
            localidade: new forms_1.FormControl('', [forms_1.Validators.required]),
            uf: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.maxLength(2), forms_1.Validators.minLength(2)])
        });
    }
    EditarClienteComponent.prototype.ngOnInit = function () { };
    EditarClienteComponent.prototype.ngOnChanges = function () {
        var _this = this;
        this.consultaCliente.getIdCliente(this.clienteKey).subscribe(function (resposta) {
            _this.cliente = Object.values(resposta)[0],
                _this.key = Object.keys(resposta)[0], _this.atualizarInput();
        });
    };
    EditarClienteComponent.prototype.atualizarInput = function () {
        this.formularioEditar.controls.cnpj.setValue(this.cliente.cnpj);
        this.formularioEditar.controls.nomeEmpresarial.setValue(this.cliente.nomeEmpresarial);
        this.formularioEditar.controls.cep.setValue(this.cliente.cep);
        this.formularioEditar.controls.logradouro.setValue(this.cliente.logradouro);
        this.formularioEditar.controls.numero.setValue(this.cliente.numero);
        this.formularioEditar.controls.bairro.setValue(this.cliente.bairro);
        this.formularioEditar.controls.localidade.setValue(this.cliente.localidade);
        this.formularioEditar.controls.uf.setValue(this.cliente.uf);
    };
    EditarClienteComponent.prototype.alterarCliente = function () {
        var _this = this;
        this.cliente.nomeEmpresarial = this.formularioEditar.value.nomeEmpresarial;
        this.cliente.cep = this.formularioEditar.value.cep;
        this.cliente.logradouro = this.formularioEditar.value.logradouro;
        this.cliente.numero = this.formularioEditar.value.numero;
        this.cliente.bairro = this.formularioEditar.value.bairro;
        this.cliente.localidade = this.formularioEditar.value.localidade;
        this.cliente.uf = this.formularioEditar.value.uf;
        this.consultaCliente.putCliente(this.key, this.cliente).subscribe(function () {
            _this.toastr.success('Cliente alterado com sucesso'),
                _this.listanovamente.emit(),
                _this.router.navigate(['/home']);
        });
    };
    EditarClienteComponent.prototype.buscarCep = function (cep) {
        var _this = this;
        this.buscaCep.buscarCEP(cep).subscribe(function (resposta) {
            if (resposta.erro === true) {
                _this.erroCep = true;
            }
            else {
                _this.formularioEditar.controls.cep.setValue(resposta.cep),
                    _this.formularioEditar.controls.logradouro.setValue(resposta.logradouro),
                    _this.formularioEditar.controls.bairro.setValue(resposta.bairro),
                    _this.formularioEditar.controls.localidade.setValue(resposta.localidade),
                    _this.formularioEditar.controls.uf.setValue(resposta.uf);
                _this.erroCep = false;
            }
        }, function () { _this.erroCep = true; });
    };
    __decorate([
        core_1.Input()
    ], EditarClienteComponent.prototype, "clienteKey");
    __decorate([
        core_1.Output()
    ], EditarClienteComponent.prototype, "listanovamente");
    EditarClienteComponent = __decorate([
        core_1.Component({
            selector: 'app-editar-cliente',
            templateUrl: './editar-cliente.component.html',
            styleUrls: ['./editar-cliente.component.css']
        })
    ], EditarClienteComponent);
    return EditarClienteComponent;
}());
exports.EditarClienteComponent = EditarClienteComponent;
