"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AdicionarServicosComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var AdicionarServicosComponent = /** @class */ (function () {
    function AdicionarServicosComponent(consutalCliente, toastr, router) {
        this.consutalCliente = consutalCliente;
        this.toastr = toastr;
        this.router = router;
        this.listaCliente = new forms_1.FormArray([]);
        this.listadeServicos = new forms_1.FormArray([]);
    }
    AdicionarServicosComponent.prototype.ngOnInit = function () {
    };
    AdicionarServicosComponent.prototype.adicionarServico = function () {
        var formServico = new forms_1.FormGroup({
            descricao: new forms_1.FormControl('', [forms_1.Validators.required]),
            vencimento: new forms_1.FormControl('', [forms_1.Validators.required]),
            valor: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.min(1)])
        });
        this.listadeServicos.push(formServico);
    };
    AdicionarServicosComponent.prototype.removeServico = function (index) {
        this.listadeServicos.removeAt(index);
    };
    AdicionarServicosComponent.prototype.setServicos = function () {
        var _this = this;
        this.listaCliente.controls.forEach(function (cliente) {
            _this.consutalCliente.getIdCliente(cliente.value.cnpj).subscribe(function (resposta) {
                var chave = Object.keys(resposta)[0];
                var cliente = Object.values(resposta)[0];
                _this.listadeServicos.controls.forEach(function (formGroup) {
                    var servico = formGroup.value;
                    if (cliente.listaServico === undefined) {
                        cliente.listaServico = [];
                        cliente.listaServico.push(servico);
                    }
                    else {
                        cliente.listaServico.push(servico);
                    }
                });
                _this.consutalCliente.putCliente(chave, cliente).subscribe(function () { return _this.router.navigate(['/home']); });
            });
        });
        this.toastr.success('Serviços adicionados  com sucesso');
    };
    __decorate([
        core_1.Input()
    ], AdicionarServicosComponent.prototype, "listaCliente");
    AdicionarServicosComponent = __decorate([
        core_1.Component({
            selector: 'app-adicionar-servicos',
            templateUrl: './adicionar-servicos.component.html',
            styleUrls: ['./adicionar-servicos.component.css']
        })
    ], AdicionarServicosComponent);
    return AdicionarServicosComponent;
}());
exports.AdicionarServicosComponent = AdicionarServicosComponent;
