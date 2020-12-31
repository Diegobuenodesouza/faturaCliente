"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CadastroComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var cliente_1 = require("./../../_model/cliente");
var CadastroComponent = /** @class */ (function () {
    function CadastroComponent(consultaCliente, toastr, router, buscaCep) {
        this.consultaCliente = consultaCliente;
        this.toastr = toastr;
        this.router = router;
        this.buscaCep = buscaCep;
        this.erroCep = false;
        this.formulario = new forms_1.FormGroup({
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
    CadastroComponent.prototype.ngOnInit = function () {
    };
    CadastroComponent.prototype.buscarCep = function (cep) {
        var _this = this;
        this.buscaCep.buscarCEP(cep).subscribe(function (resposta) {
            if (resposta.erro === true) {
                _this.erroCep = true;
            }
            else {
                _this.formulario.controls.cep.setValue(resposta.cep),
                    _this.formulario.controls.logradouro.setValue(resposta.logradouro),
                    _this.formulario.controls.bairro.setValue(resposta.bairro),
                    _this.formulario.controls.localidade.setValue(resposta.localidade),
                    _this.formulario.controls.uf.setValue(resposta.uf);
                _this.erroCep = false;
            }
        }, function () { _this.erroCep = true; });
    };
    CadastroComponent.prototype.cadastrar = function () {
        var _this = this;
        this.cliente = new cliente_1.Cliente(this.formulario.value.id, this.formulario.value.cnpj, this.formulario.value.nomeEmpresarial, this.formulario.value.cep, this.formulario.value.logradouro, this.formulario.value.numero, this.formulario.value.bairro, this.formulario.value.localidade, this.formulario.value.uf, null);
        this.consultaCliente.postCliente(this.cliente).subscribe(function () { _this.router.navigate(['/home']), _this.toastr.success('Cliente cadastro com sucesso'); }, function (error) { return alert('deu erro ' + error); });
    };
    CadastroComponent = __decorate([
        core_1.Component({
            selector: 'app-cadastro',
            templateUrl: './cadastro.component.html',
            styleUrls: ['./cadastro.component.css']
        })
    ], CadastroComponent);
    return CadastroComponent;
}());
exports.CadastroComponent = CadastroComponent;
