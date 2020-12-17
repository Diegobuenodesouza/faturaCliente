import { FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ConsultaClientesService } from 'src/app/consulta-clientes.service';
import { Cliente } from 'src/app/_model/cliente';
import { Servico } from 'src/app/_model/servico';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import { ToastrService } from 'ngx-toastr';


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
      () => { this.toastr.success('Servico atualizado com sucesso'),  this.listaNovamente.emit() }
    );
  }
}

