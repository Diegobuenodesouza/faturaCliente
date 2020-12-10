"use strict";
exports.__esModule = true;
exports.Servico = void 0;
var Servico = /** @class */ (function () {
    function Servico(descricao, valor, vencimento) {
        if (descricao === void 0) { descricao = ''; }
        if (valor === void 0) { valor = 0; }
        if (vencimento === void 0) { vencimento = new Date(2020, 1, 1); }
        this.descricao = descricao;
        this.valor = valor;
        this.vencimento = vencimento;
    }
    return Servico;
}());
exports.Servico = Servico;
