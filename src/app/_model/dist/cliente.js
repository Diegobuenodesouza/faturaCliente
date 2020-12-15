"use strict";
exports.__esModule = true;
exports.Cliente = void 0;
var Cliente = /** @class */ (function () {
    function Cliente(id, cnpj, nomeEmpresarial, cep, logradouro, numero, bairro, localidade, UF, listaServico) {
        this.id = id;
        this.cnpj = cnpj;
        this.nomeEmpresarial = nomeEmpresarial;
        this.cep = cep;
        this.logradouro = logradouro;
        this.numero = numero;
        this.bairro = bairro;
        this.localidade = localidade;
        this.UF = UF;
        this.listaServico = listaServico;
    }
    return Cliente;
}());
exports.Cliente = Cliente;
