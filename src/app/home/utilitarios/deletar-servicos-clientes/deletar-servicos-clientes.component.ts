
import { Component, OnChanges, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ConsultaClientesService } from 'src/app/consulta-clientes.service';
import { Cliente } from 'src/app/_model/cliente';
import { Servico } from 'src/app/_model/servico';

@Component({
  selector: 'app-deletar-servicos-clientes',
  templateUrl: './deletar-servicos-clientes.component.html',
  styleUrls: ['./deletar-servicos-clientes.component.css']
})
export class DeletarServicosClientesComponent implements OnInit {

  listaClientes: Array<Cliente> = []
  clienteFormulario = new FormArray([])
  checkFormulario = false


  constructor(
    private http: ConsultaClientesService,
    private fb: FormBuilder
    ) { }

  ngOnInit(): any {    
    this.http.getClientes().subscribe(
      (resposta) => {this.listaClientes = Object.values(resposta), this.CriacaoFormulario() }
    );
  }

  quantidadeServicos(cliente: Cliente): number {
    return cliente.listaServico !== undefined ? cliente.listaServico.length : 0
  }
  somaServicos(cliente: Cliente): number {
    let total = 0
    if (cliente.listaServico === undefined) {
      return total
    }
    cliente.listaServico.map((servico: Servico) =>{
      total += servico.valor;
    })
    return total
  }
  CriacaoFormulario(): void{
  this.listaClientes.forEach((cliente: Cliente) =>{
    const form = this.fb.group({
      check : [false],
      cnpj : [cliente.cnpj],
      nome : [cliente.nomeEmpresarial],
      valorAtual: [this.somaServicos(cliente)],
      quantidadeServico : [this.quantidadeServicos(cliente)]
    })
    this.clienteFormulario.push(form)
    })
  }

  marcaEDesmascar(): void{
    this.checkFormulario = !this.checkFormulario
    this.clienteFormulario.controls.forEach((cliente: FormGroup) =>{      
      cliente.controls.check.setValue(this.checkFormulario);      
    })
  }
}
