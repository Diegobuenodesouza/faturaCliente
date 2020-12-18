import { FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ConsultaClientesService } from 'src/app/consulta-clientes.service';
import { Cliente } from 'src/app/_model/cliente';
import { Servico } from 'src/app/_model/servico';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { jsPDF } from "jspdf";


@Component({
  selector: 'app-servicos-cliente',
  templateUrl: './servicos-cliente.component.html',
  styleUrls: ['./servicos-cliente.component.css']
})
export class ServicosClienteComponent implements OnInit, OnChanges {

  @Input() clienteId: number;
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
    this.consultaCliente.getIdCliente(this.clienteId).subscribe(
      (resposta) => {
        this.cliente = resposta, 
        this.formulario = new FormGroup({
          cnpj: new FormControl(this.cliente.cnpj),
          nomeEmpresarial: new FormControl(this.cliente.nomeEmpresarial ),
          listaServico: new FormArray([])      
        }),
        this.setListaServico();
        this.somaFatura(); 

       }
    );           
    
  }

  get listaServico() : FormArray {
    return this.formulario.get('listaServico') as FormArray;
  }

  setListaServico() : void {
    this.cliente.listaServico.forEach((servico: Servico) =>{
      let serv = this.formBuilder.group(new Servico());
      serv.setValue(servico);
      this.listaServico.push(serv)      
    })
  }

  removeServico(index: number) {
    this.listaServico.removeAt(index);
    this.atualizarLista();
    this.somaFatura();
  }

  addServico() {
    let serv = this.formBuilder.group(new Servico)
    this.listaServico.push(serv)
    
  }

  somaFatura() : number{
    let total: number = 0
    this.cliente.listaServico.forEach((servico: Servico) =>{
      total += servico.valor
    })
    return total
    
  }

  atualizarLista(): void{
   this.cliente.listaServico = []
   let listaServicoFormulario = this.formulario.controls.listaServico.value   
   listaServicoFormulario.forEach((servico: Servico) => {
     this.cliente.listaServico.push(new Servico(
       servico.descricao, servico.valor, servico.vencimento
     ))
   })
   this.somaFatura()  }

  

  atualizaCliente() : void {
    this.consultaCliente.putCliente(this.clienteId, this.cliente).subscribe(
      () => { this.toastr.success('Servicos atualizado com sucessos'),  this.listaNovamente.emit() }
    );
  }

  gerarPDF() {
    let doc = new jsPDF()
    doc.rect(10,20,190,230)
    doc.setFont('Courier New')

    
    doc.setFont('bold')
    doc.line(47,31,132,31)
    doc.text('Controller Assessoria Contábil Ltd', 47,30)
    doc.setFontSize(10)
    doc.setFont('normal')
    doc.text('CNPJ: 62.031.950/0001-30', 70,40)
    doc.text('AVENIDA MUTINGA, 2717 - PIRITUBA - SÃO PAULO/SP CEP 05110-000' ,29,48 )
    doc.text('FONE: (11) 2364-2206 (11) 2364-2207 e-mail: ctrlgda@uol.com.br' ,42,56)
    doc.line(160,20,160,60)
    doc.line(10,60,200,60)

    // Parte do Recibo
    doc.setFont('bold')
    doc.setFontSize(25)
    doc.text('RECIBO 06-2020', 12, 70)
    doc.setFontSize(16)
    doc.text( ' R$', 150,70)
    doc.rect(161,63,37,9)
    doc.text( ' aqui valor', 162,70,)
    doc.setFont('normal')
    doc.setFontSize(10)

    // Fim Parte do Recibo

    doc.rect(12,104,25,8)
    doc.text('Código' ,14,109 )

    doc.rect(41,104,117,8)
    doc.text('Descrição', 43,109 )

    doc.rect(162,104,36,8)
    doc.text( 'Valor R$',164,109)

    doc.line(10,102,200,102) 
    doc.line(10,114,200,114)

    doc.line(39,102,39,200) // linha meio tabela
    doc.line(160,102,160,215)// linha meio tabela

    doc.line(10,200,200,200)
    doc.line(10,215,200,215)

    doc.setFont('bold')
    doc.text('TOTAL R$' ,162,205 )
    doc.setFont('normal')

    doc.text('SÃO PAULO, 30 de Junho de 2020', 12,222 )
    doc.setFont('bold')
    doc.line(90,232,180,232)
    doc.text('CONTROLE ASSESSORIA CONTÁBIL LTDA' , 100,238)
    doc.text('CNPJ: 62.031.950/001-30', 117,244)
    
    doc.save('dataurlnewwindow')
  }
}

