"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ConsultaClientesService = void 0;
var core_1 = require("@angular/core");
var ConsultaClientesService = /** @class */ (function () {
    function ConsultaClientesService(http) {
        this.http = http;
        this.URL_FIREBASE = 'https://fatura-cliente-portfolio-default-rtdb.firebaseio.com/clientes';
    }
    ConsultaClientesService.prototype.getClientes = function () {
        return this.http.get(this.URL_FIREBASE + ".json");
    };
    ConsultaClientesService.prototype.getIdCliente = function (cnpj) {
        return this.http.get(this.URL_FIREBASE + ".json?orderBy=\"cnpj\"&equalTo=\"" + cnpj + "\"");
    };
    ConsultaClientesService.prototype.postCliente = function (cliente) {
        return this.http.post(this.URL_FIREBASE + ".json", cliente);
    };
    ConsultaClientesService.prototype.deleteCliente = function (key) {
        return this.http["delete"](this.URL_FIREBASE + "/" + key + ".json");
    };
    ConsultaClientesService.prototype.putCliente = function (key, cliente) {
        return this.http.put(this.URL_FIREBASE + "/" + key + ".json", cliente);
    };
    ConsultaClientesService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ConsultaClientesService);
    return ConsultaClientesService;
}());
exports.ConsultaClientesService = ConsultaClientesService;
