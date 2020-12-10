import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConsultaClientesService } from 'src/app/consulta-clientes.service';
import { Cliente } from 'src/app/_model/cliente';
import { Servico } from 'src/app/_model/servico';

@Component({
  selector: 'app-servicos-cliente',
  templateUrl: './servicos-cliente.component.html',
  styleUrls: ['./servicos-cliente.component.css']
})
export class ServicosClienteComponent implements OnInit, OnChanges {

  @Input() clienteId: number;
  cliente = new Cliente(0, '', '', '', '', '', '', '', '', []);
  formulario: FormGroup;

  constructor(
    private consultaCliente: ConsultaClientesService,
    private formBuilder: FormBuilder,
    ) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.consultaCliente.getIdCliente(this.clienteId).subscribe(
      (resposta) => {
        this.cliente = resposta, 
        this.formulario = new FormGroup({
          cnpj: new FormControl(this.cliente.cnpj),
          nomeEmpresarial: new FormControl(this.cliente.nomeEmpresarial),
          listaServico: new FormArray([])      
        }),
        this.setListaServico();
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

}
