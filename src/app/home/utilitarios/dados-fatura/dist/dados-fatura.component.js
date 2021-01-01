"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DadosFaturaComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var DadosFaturaComponent = /** @class */ (function () {
    function DadosFaturaComponent(consultaDados, router, toastr) {
        this.consultaDados = consultaDados;
        this.router = router;
        this.toastr = toastr;
        this.formulario = new forms_1.FormGroup({
            competencia: new forms_1.FormControl('', [forms_1.Validators.required]),
            dataDeEmissao: new forms_1.FormControl('', [forms_1.Validators.required]),
            dataVencimentoRecibo: new forms_1.FormControl('', [forms_1.Validators.required])
        });
    }
    DadosFaturaComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.consultaDados.getDadosFatura().subscribe(function (resposta) {
            _this.dados = resposta;
            _this.formulario = new forms_1.FormGroup({
                competencia: new forms_1.FormControl(_this.dados.competencia, [forms_1.Validators.required]),
                dataDeEmissao: new forms_1.FormControl(_this.dados.dataDeEmissao, [forms_1.Validators.required]),
                dataVencimentoRecibo: new forms_1.FormControl(_this.dados.dataVencimentoRecibo, [forms_1.Validators.required])
            });
        });
    };
    DadosFaturaComponent.prototype.alterarDados = function () {
        var _this = this;
        this.dados.competencia = this.formulario.value.competencia;
        this.dados.dataDeEmissao = this.formulario.value.dataDeEmissao;
        this.dados.dataVencimentoRecibo = this.formulario.value.dataVencimentoRecibo;
        this.consultaDados.putDadosFatura(this.dados).subscribe(function () {
            _this.toastr.success('Dados alterados com sucesso'),
                _this.router.navigate(['/home']);
        }, function (error) { return alert(error); });
    };
    DadosFaturaComponent = __decorate([
        core_1.Component({
            selector: 'app-dados-fatura',
            templateUrl: './dados-fatura.component.html',
            styleUrls: ['./dados-fatura.component.css']
        })
    ], DadosFaturaComponent);
    return DadosFaturaComponent;
}());
exports.DadosFaturaComponent = DadosFaturaComponent;
