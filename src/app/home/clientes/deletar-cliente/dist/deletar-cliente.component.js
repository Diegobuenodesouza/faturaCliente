"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DeletarClienteComponent = void 0;
var core_1 = require("@angular/core");
var cliente_1 = require("src/app/_model/cliente");
var DeletarClienteComponent = /** @class */ (function () {
    function DeletarClienteComponent(consultaCliente, toastr, router) {
        this.consultaCliente = consultaCliente;
        this.toastr = toastr;
        this.router = router;
        this.cliente = new cliente_1.Cliente(0, '', '', '', '', '', '', '', '', []);
        this.listanovamente = new core_1.EventEmitter();
    }
    DeletarClienteComponent.prototype.ngOnInit = function () {
    };
    DeletarClienteComponent.prototype.ngOnChanges = function () {
        var _this = this;
        this.consultaCliente.getIdCliente(this.clienteId).subscribe(function (resposta) { _this.cliente = resposta; });
    };
    DeletarClienteComponent.prototype.excluirCliente = function () {
        var _this = this;
        this.consultaCliente.deleteCliente(this.clienteId).subscribe(function () {
            _this.router.navigate(['/home']),
                _this.toastr.info('Cliente excluido com sucesso'),
                _this.listanovamente.emit();
        });
    };
    __decorate([
        core_1.Input()
    ], DeletarClienteComponent.prototype, "clienteId");
    __decorate([
        core_1.Output()
    ], DeletarClienteComponent.prototype, "listanovamente");
    DeletarClienteComponent = __decorate([
        core_1.Component({
            selector: 'app-deletar-cliente',
            templateUrl: './deletar-cliente.component.html',
            styleUrls: ['./deletar-cliente.component.css']
        })
    ], DeletarClienteComponent);
    return DeletarClienteComponent;
}());
exports.DeletarClienteComponent = DeletarClienteComponent;
