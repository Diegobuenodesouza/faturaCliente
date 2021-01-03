"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ConfirmarDelServicoComponent = void 0;
var core_1 = require("@angular/core");
var ConfirmarDelServicoComponent = /** @class */ (function () {
    function ConfirmarDelServicoComponent(consultaCliente, router, toastr) {
        this.consultaCliente = consultaCliente;
        this.router = router;
        this.toastr = toastr;
    }
    ConfirmarDelServicoComponent.prototype.ngOnInit = function () {
    };
    ConfirmarDelServicoComponent.prototype.deletarTodosServicos = function () {
        var _this = this;
        this.listasClienteRemoverServicos.controls.forEach(function (formGroup) {
            _this.consultaCliente.getIdCliente(formGroup.value.cnpj).subscribe(function (resposta) {
                var cliente = Object.values(resposta)[0];
                var key = Object.keys(resposta)[0];
                cliente['listaServico'] = [];
                _this.consultaCliente.putCliente(key, cliente).subscribe(function () { _this.router.navigate(['home']), _this.toastr.success('Servicos deletados com sucessos', 'Exclusão Serviços'); });
            });
        });
    };
    __decorate([
        core_1.Input()
    ], ConfirmarDelServicoComponent.prototype, "listasClienteRemoverServicos");
    ConfirmarDelServicoComponent = __decorate([
        core_1.Component({
            selector: 'app-confirmar-del-servico',
            templateUrl: './confirmar-del-servico.component.html',
            styleUrls: ['./confirmar-del-servico.component.css']
        })
    ], ConfirmarDelServicoComponent);
    return ConfirmarDelServicoComponent;
}());
exports.ConfirmarDelServicoComponent = ConfirmarDelServicoComponent;
