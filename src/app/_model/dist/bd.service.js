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
var cliente_1 = require("./cliente");
var firebase = require("firebase");
var BdService = /** @class */ (function () {
    function BdService() {
    }
    BdService.prototype.publicar = function (cliente) {
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
    };
    BdService.prototype.consultarTodosCliente = function () {
        var lista = [];
        firebase.database().ref('/clientes').once('value')
            .then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var chave = Object.keys(childSnapshot.val())[0]; // retorna o valor da chave na posicao 0 do objeto childSnapshot
                var objetoCliente = childSnapshot.val()[chave]; //  retorna o objeto da chave na posicao 0
                var cliente = new cliente_1.Cliente(null, objetoCliente['cnpj'], objetoCliente['nomeEmpresarial'], objetoCliente['cep'], objetoCliente['logradouro'], objetoCliente['numero'], objetoCliente['bairro'], objetoCliente['localidade'], objetoCliente['UF'], []);
                lista.push(cliente);
            });
        });
        console.log(lista);
        return lista;
    };
    BdService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], BdService);
    return BdService;
}());
exports.BdService = BdService;
