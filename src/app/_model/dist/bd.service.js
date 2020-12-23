"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BdService = void 0;
var core_1 = require("@angular/core");
var firebase = require("firebase");
var BdService = /** @class */ (function () {
    function BdService() {
    }
    BdService.prototype.publicar = function (cliente) {
        console.log(cliente);
        firebase.database().ref("clientes/" + btoa(cliente.cnpj))
            .push({
            cnpj: cliente.cnpj,
            nomeEmpresarial: cliente.nomeEmpresarial,
            cep: cliente.cep,
            logradouro: cliente.logradouro,
            numero: cliente.numero,
            bairro: cliente.bairro,
            localidade: cliente.localidade,
            UF: cliente.UF
        });
    };
    BdService.prototype.consultarCliente = function (cnpj) {
        firebase.database().ref("clientes/" + btoa(cnpj))
            .once('value').then(function (snapshot) { return console.log(snapshot.val()); });
    };
    BdService.prototype.consultarTodosCliente = function () {
        firebase.database().ref("clientes/")
            .once('value').then(function (snapshot) {
            var clientes = [];
            snapshot.forEach(function (childSnapshot) {
                var cliente = childSnapshot.val();
                clientes.push(cliente);
            });
            console.log(clientes);
        });
    };
    BdService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], BdService);
    return BdService;
}());
exports.BdService = BdService;
