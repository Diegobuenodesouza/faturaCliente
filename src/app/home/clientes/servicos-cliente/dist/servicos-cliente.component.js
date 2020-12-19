"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ServicosClienteComponent = void 0;
var forms_1 = require("@angular/forms");
var cliente_1 = require("src/app/_model/cliente");
var servico_1 = require("src/app/_model/servico");
var core_1 = require("@angular/core");
var jspdf_1 = require("jspdf");
var ServicosClienteComponent = /** @class */ (function () {
    function ServicosClienteComponent(consultaCliente, formBuilder, toastr) {
        this.consultaCliente = consultaCliente;
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.listaNovamente = new core_1.EventEmitter();
        this.cliente = new cliente_1.Cliente(0, '', '', '', '', '', '', '', '', []);
    }
    ServicosClienteComponent.prototype.ngOnInit = function () {
    };
    ServicosClienteComponent.prototype.ngOnChanges = function () {
        var _this = this;
        this.consultaCliente.getIdCliente(this.clienteId).subscribe(function (resposta) {
            _this.cliente = resposta,
                _this.formulario = new forms_1.FormGroup({
                    cnpj: new forms_1.FormControl(_this.cliente.cnpj),
                    nomeEmpresarial: new forms_1.FormControl(_this.cliente.nomeEmpresarial),
                    competencia: new forms_1.FormControl('', [forms_1.Validators.required]),
                    dataVencimentoRecibo: new forms_1.FormControl('', [forms_1.Validators.required]),
                    dataDeEmissao: new forms_1.FormControl('', [forms_1.Validators.required]),
                    listaServico: new forms_1.FormArray([])
                }),
                _this.setListaServico();
            _this.somaFatura();
        });
    };
    Object.defineProperty(ServicosClienteComponent.prototype, "listaServico", {
        get: function () {
            return this.formulario.get('listaServico');
        },
        enumerable: false,
        configurable: true
    });
    ServicosClienteComponent.prototype.setListaServico = function () {
        var _this = this;
        this.cliente.listaServico.forEach(function (servico) {
            var serv = _this.formBuilder.group(new servico_1.Servico());
            serv.setValue(servico);
            _this.listaServico.push(serv);
        });
    };
    ServicosClienteComponent.prototype.removeServico = function (index) {
        this.listaServico.removeAt(index);
        this.atualizarLista();
        this.somaFatura();
    };
    ServicosClienteComponent.prototype.addServico = function () {
        var serv = this.formBuilder.group(new servico_1.Servico);
        this.listaServico.push(serv);
    };
    ServicosClienteComponent.prototype.somaFatura = function () {
        var total = 0;
        this.cliente.listaServico.forEach(function (servico) {
            total += servico.valor;
        });
        return total;
    };
    ServicosClienteComponent.prototype.atualizarLista = function () {
        var _this = this;
        this.cliente.listaServico = [];
        var listaServicoFormulario = this.formulario.controls.listaServico.value;
        listaServicoFormulario.forEach(function (servico) {
            _this.cliente.listaServico.push(new servico_1.Servico(servico.descricao, servico.valor, servico.vencimento));
        });
        this.somaFatura();
    };
    ServicosClienteComponent.prototype.atualizaCliente = function () {
        var _this = this;
        this.consultaCliente.putCliente(this.clienteId, this.cliente).subscribe(function () { _this.toastr.success('Servicos atualizado com sucessos'), _this.listaNovamente.emit(), _this.atualizarLista(); });
    };
    ServicosClienteComponent.prototype.corrigirData = function (data) {
        var dataCerta = '';
        dataCerta += data.substring(5, 7) + '-';
        dataCerta += data.substring(0, 4);
        return dataCerta;
    };
    ServicosClienteComponent.prototype.retornaMesCompetencia = function (data) {
        var ano = data.substring(0, 4);
        switch (data.substring(5, 7)) {
            case '01':
                return 'JANEIRO/' + ano;
                break;
            case '02':
                return 'FEVEREIRO/' + ano;
                break;
            case '03':
                return 'MARÇO/' + ano;
                break;
            case '04':
                return 'ABRIL/' + ano;
                break;
            case '05':
                return 'MAIO/' + ano;
                break;
            case '06':
                return 'JUNHO/' + ano;
                break;
            case '07':
                return 'JULHO/' + ano;
                break;
            case '08':
                return 'AGOSTO/' + ano;
                break;
            case '09':
                return 'SETEMBRO/' + ano;
                break;
            case '10':
                return 'OUTUBRO/' + ano;
                break;
            case '11':
                return 'NOVEMBRO/' + ano;
                break;
            case '12':
                return 'DEZEMBRO/' + ano;
                break;
        }
    };
    ServicosClienteComponent.prototype.dataEmissao = function (data) {
        var dataDeEmissao = '';
        dataDeEmissao += data.substring(8, 10) + ' de ' + this.retornaMesCompetencia(data).toLowerCase().split('/')[0] + ' de ' + data.substring(0, 4);
        return dataDeEmissao;
    };
    ServicosClienteComponent.prototype.editarCpfCnpj = function (dado) {
        if (dado.length === 11) {
            return dado.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '\$1.\$2.\$3\-\$4');
        }
        if (dado.length === 14) {
            return dado.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, '\$1.\$2.\$3\/\$4\-\$5');
        }
    };
    ServicosClienteComponent.prototype.gerarPDF = function () {
        var _this = this;
        this.atualizaCliente();
        var doc = new jspdf_1.jsPDF();
        doc.rect(10, 20, 190, 230);
        doc.setFont('Courier New');
        doc.setFont('bold');
        doc.line(47, 31, 126, 31);
        doc.text('Controller Assessoria Contábil Ltd', 47, 30);
        doc.setFontSize(10);
        doc.text('CNPJ: 62.031.950/0001-30', 70, 40);
        doc.text('AVENIDA MUTINGA, 2717 - PIRITUBA - SÃO PAULO/SP CEP 05110-000', 29, 48);
        doc.text('FONE: (11) 2364-2206 (11) 2364-2207 e-mail: ctrlgda@uol.com.br', 42, 56);
        doc.setFont('normal');
        doc.line(160, 20, 160, 60);
        doc.line(10, 60, 200, 60);
        // Parte do Recibo
        doc.setFont('bold');
        doc.setFontSize(23);
        var dataCompentecia = this.formulario.controls.competencia.value;
        doc.text('RECIBO ' + this.corrigirData(dataCompentecia), 12, 70);
        doc.setFontSize(16);
        doc.text(' R$', 150, 70);
        doc.text(this.somaFatura().toFixed(2).replace('.', ','), 164, 70);
        doc.rect(161, 63, 37, 9);
        doc.setFontSize(10);
        doc.setFont('normal');
        doc.text(this.cliente.nomeEmpresarial, 12, 80);
        doc.text(this.cliente.logradouro + ', '
            + this.cliente.numero
            + ' - ' + this.cliente.bairro + ' - '
            + this.cliente.localidade + '/'
            + this.cliente.UF + ' - CEP '
            + this.cliente.cep, 12, 88);
        var dataVencimentoRecibo = new Date(this.formulario.controls.dataVencimentoRecibo.value);
        dataVencimentoRecibo.setDate(dataVencimentoRecibo.getDate() + 1);
        doc.text('CPF/CNPJ: ' + this.editarCpfCnpj(this.cliente.cnpj) + ' COMPETÊNCIA ' + this.retornaMesCompetencia(dataCompentecia) + ' - VENCIMENTO: ' + dataVencimentoRecibo.toLocaleDateString(), 12, 96);
        doc.setFontSize(10);
        // Fim Parte do Recibo
        doc.rect(12, 104, 25, 8);
        doc.text('Código', 14, 109);
        doc.rect(41, 104, 117, 8);
        doc.text('Descrição', 43, 109);
        doc.rect(162, 104, 36, 8);
        doc.text('Valor R$', 164, 109);
        // Inicio do Servicos
        var indice = 1;
        var altura = 120;
        doc.setFontSize(8);
        this.cliente.listaServico.forEach(function (servico) {
            var data = new Date(servico.vencimento);
            data.setDate(data.getDate() + 1);
            doc.text('0' + indice, 14, altura);
            doc.text(servico.descricao.toUpperCase() + ' COMPETÊNCIA ' + _this.retornaMesCompetencia(dataCompentecia) + ' VENCIMENTO: ' + data.toLocaleDateString(), 42, altura);
            doc.text(servico.valor.toFixed(2).replace('.', ','), 163, altura);
            altura += 7;
            indice++;
        });
        // Fim do Servicos
        doc.setFontSize(10);
        doc.line(10, 102, 200, 102);
        doc.line(10, 114, 200, 114);
        doc.line(39, 102, 39, 200); // linha meio tabela
        doc.line(160, 102, 160, 215); // linha meio tabela
        doc.setLineWidth(2.0);
        doc.rect(165, 25, 30, 30);
        doc.setLineWidth(0);
        doc.line(10, 200, 200, 200);
        doc.line(10, 215, 200, 215);
        doc.setFont('bold');
        doc.text('TOTAL R$', 162, 205);
        doc.text(this.somaFatura().toFixed(2).replace('.', ','), 163, 210);
        doc.setFont('normal');
        doc.text('SÃO PAULO, ' + this.dataEmissao(this.formulario.controls.dataDeEmissao.value), 12, 222);
        doc.setFont('bold');
        doc.line(90, 232, 180, 232);
        doc.text('CONTROLE ASSESSORIA CONTÁBIL LTDA', 100, 238);
        doc.text('CNPJ: 62.031.950/001-30', 117, 244);
        doc.output('dataurlnewwindow');
    };
    __decorate([
        core_1.Input()
    ], ServicosClienteComponent.prototype, "clienteId");
    __decorate([
        core_1.Output()
    ], ServicosClienteComponent.prototype, "listaNovamente");
    ServicosClienteComponent = __decorate([
        core_1.Component({
            selector: 'app-servicos-cliente',
            templateUrl: './servicos-cliente.component.html',
            styleUrls: ['./servicos-cliente.component.css']
        })
    ], ServicosClienteComponent);
    return ServicosClienteComponent;
}());
exports.ServicosClienteComponent = ServicosClienteComponent;
