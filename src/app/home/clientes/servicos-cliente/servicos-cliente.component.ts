import { FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ConsultaClientesService } from 'src/app/consulta-clientes.service';
import { Cliente } from 'src/app/_model/cliente';
import { Servico } from 'src/app/_model/servico';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { jsPDF } from 'jspdf';
import { IfStmt } from '@angular/compiler';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-servicos-cliente',
  templateUrl: './servicos-cliente.component.html',
  styleUrls: ['./servicos-cliente.component.css']
})
export class ServicosClienteComponent implements OnInit, OnChanges {

  @Input() clienteKey: string;
  @Output() listaNovamente = new EventEmitter();
  cliente = new Cliente(0, '', '', '', '', '', '', '', '', []);
  formulario: FormGroup;


  constructor(
    private consultaCliente: ConsultaClientesService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.consultaCliente.getIdCliente(this.clienteKey).subscribe(
      (resposta) => {
        this.cliente = resposta, 
        this.formulario = new FormGroup({
          cnpj: new FormControl(this.cliente.cnpj),
          nomeEmpresarial: new FormControl(this.cliente.nomeEmpresarial ),
          competencia: new FormControl('', [Validators.required]),
          dataVencimentoRecibo: new FormControl('', [Validators.required]),
          dataDeEmissao: new FormControl('', [Validators.required]),
          listaServico: new FormArray([])
        }),
        this.setListaServico();
        this.somaFatura();
       }
    );
  }

  get listaServico(): FormArray {
    return this.formulario.get('listaServico') as FormArray;
  }

  setListaServico(): void {
    if (this.cliente.listaServico === undefined) {
      return;
    }
    else{
      this.cliente.listaServico.forEach((servico: Servico) => {
      const serv = this.formBuilder.group(new Servico());
      serv.setValue(servico);
      this.listaServico.push(serv);
      });
    }
  }

  removeServico(index: number): void{
    this.listaServico.removeAt(index);
    this.atualizarLista();
    this.somaFatura();
  }

  addServico(): void {
    const serv = this.formBuilder.group({
      descricao : new FormControl('', [Validators.required]),
      vencimento: new FormControl('', [Validators.required]),
      valor: new FormControl('', [Validators.required, Validators.min(1)])
    });
    this.listaServico.push(serv);
  }

  somaFatura(): number{
    let total = 0;
    if (this.cliente.listaServico === undefined) {
      return total;
    }
    this.cliente.listaServico.forEach((servico: Servico) => {
      total += servico.valor;
    });
      return total;

  }

  atualizarLista(): void{
   this.cliente.listaServico = [];
   const listaServicoFormulario = this.formulario.controls.listaServico.value;
   listaServicoFormulario.forEach((servico: Servico) => {
     this.cliente.listaServico.push(servico);
   });
   this.somaFatura();
 

  }

  atualizaCliente(): void {
    this.consultaCliente.putCliente(this.clienteKey, this.cliente).subscribe(
      () => { this.toastr.success('Servicos atualizado com sucessos'),  this.listaNovamente.emit(), this.atualizarLista() }
    );
  }

  corrigirData(data: string): string {
    let dataCerta = ''
    dataCerta += data.substring(5,7) + '-'
    dataCerta += data.substring(0,4)
    return dataCerta
  }

  retornaMesCompetencia(data: string): string {
    let ano = data.substring(0,4);
    switch (data.substring(5,7)) {
      case '01':
          return 'JANEIRO/' + ano
          break;
      case '02':
          return 'FEVEREIRO/' + ano
          break;
      case '03':
          return 'MARÇO/' + ano
          break;
      case '04':
          return 'ABRIL/' + ano
          break;
      case '05':
            return 'MAIO/' + ano
            break;
      case '06':
            return 'JUNHO/' + ano
            break;
      case '07':
          return 'JULHO/' + ano
          break;
      case '08':
          return 'AGOSTO/' + ano
          break;
      case '09':
          return 'SETEMBRO/' + ano
          break;
      case '10':
          return 'OUTUBRO/' + ano
          break;
      case '11':
            return 'NOVEMBRO/' + ano
            break;
      case '12':
            return 'DEZEMBRO/' + ano
            break;    
      
  }
  
  }

  dataEmissao(data: string): string {
    let dataDeEmissao = ''
    dataDeEmissao += data.substring(8,10) + ' de ' +  this.retornaMesCompetencia(data).toLowerCase().split('/')[0] + ' de ' + data.substring(0,4)
    return dataDeEmissao
  }

  editarCpfCnpj(dado: string): string {
    if (dado.length === 11) {
      return dado.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '\$1.\$2.\$3\-\$4');
    }
    if (dado.length === 14) {
      return dado.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, '\$1.\$2.\$3\/\$4\-\$5');
    }
  }

  gerarPDF(): void {
    this.atualizaCliente()
    let doc = new jsPDF()
    doc.rect(10,20,190,230)
    doc.setFont('Courier New')

    
    doc.setFont('bold')
    doc.line(47,31,126,31)
    doc.text('Controller Assessoria Contábil Ltd', 47,30)
    doc.setFontSize(10)
    
    doc.text('CNPJ: 62.031.950/0001-30', 70,40)
    doc.text('AVENIDA MUTINGA, 2717 - PIRITUBA - SÃO PAULO/SP CEP 05110-000' ,29,48 )
    doc.text('FONE: (11) 2364-2206 (11) 2364-2207 e-mail: ctrlgda@uol.com.br' ,42,56)
    doc.setFont('normal')
    doc.line(160,20,160,60)
    doc.line(10,60,200,60)

    // Parte do Recibo
    doc.setFont('bold')
    doc.setFontSize(23)

    let dataCompentecia = this.formulario.controls.competencia.value
    doc.text('RECIBO ' +  this.corrigirData(dataCompentecia), 12, 70)    
    

    doc.setFontSize(16)
    doc.text( ' R$', 150,70)
    doc.text( this.somaFatura().toFixed(2).replace('.', ',') , 164,70,)
    doc.rect(161,63,37,9)    

    doc.setFontSize(10)
    doc.setFont('normal')
    doc.text(this.cliente.nomeEmpresarial, 12 , 80)
    doc.text(this.cliente.logradouro + ', ' 
    + this.cliente.numero
    + ' - ' + this.cliente.bairro + ' - ' 
    + this.cliente.localidade + '/' 
    + this.cliente.uf + ' - CEP '
    + this.cliente.cep , 12 , 88)
    let dataVencimentoRecibo: Date = new Date(this.formulario.controls.dataVencimentoRecibo.value)
    dataVencimentoRecibo.setDate(dataVencimentoRecibo.getDate() + 1)

    doc.text('CPF/CNPJ: ' + this.editarCpfCnpj(this.cliente.cnpj) + ' COMPETÊNCIA ' + this.retornaMesCompetencia(dataCompentecia) + ' - VENCIMENTO: ' + dataVencimentoRecibo.toLocaleDateString() , 12, 96)

    
    
    doc.setFontSize(10)

    // Fim Parte do Recibo

    doc.rect(12,104,25,8)
    doc.text('Código' ,14,109 )

    doc.rect(41,104,117,8)
    doc.text('Descrição', 43,109 )

    doc.rect(162,104,36,8)
    doc.text( 'Valor R$',164,109)

    // Inicio do Servicos

    
    let indice: number = 1
    let altura = 120
    doc.setFontSize(8)
    this.cliente.listaServico.forEach((servico: Servico) =>{
      let data: Date = new Date(servico.vencimento)
      data.setDate(data.getDate() + 1)
      doc.text( '0'+ indice , 14 , altura )
      doc.text(servico.descricao.toUpperCase() + ' COMPETÊNCIA ' + this.retornaMesCompetencia(dataCompentecia) + ' VENCIMENTO: ' + data.toLocaleDateString(), 42, altura)
      doc.text(servico.valor.toFixed(2).replace('.', ','), 163, altura)
      altura += 7
      indice++
    })

    // Fim do Servicos
    doc.setFontSize(10)
    doc.line(10,102,200,102) 
    doc.line(10,114,200,114)

    doc.line(39,102,39,200) // linha meio tabela
    doc.line(160,102,160,215)// linha meio tabela

    doc.setLineWidth(2.0)
    doc.rect(165,25,30,30)
    doc.setLineWidth(0)


    doc.line(10,200,200,200)
    doc.line(10,215,200,215)

    doc.setFont('bold')
    doc.text('TOTAL R$' ,162,205 )
    doc.text(this.somaFatura().toFixed(2).replace('.', ','), 163, 210)
    doc.setFont('normal')

    
    doc.text('SÃO PAULO, ' + this.dataEmissao(this.formulario.controls.dataDeEmissao.value), 12,222 )    
    doc.setFont('bold')
    doc.line(90,232,180,232)
    doc.text('CONTROLE ASSESSORIA CONTÁBIL LTDA' , 100,238)
    doc.text('CNPJ: 62.031.950/001-30', 117,244)
    
    doc.save(`${this.cliente.nomeEmpresarial.toLowerCase()} - ${ this.retornaMesCompetencia(dataCompentecia).toLowerCase()}`)
  }
}

