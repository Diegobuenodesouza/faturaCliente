import { Component,  OnInit} from '@angular/core';
import * as firebase from 'firebase'
import { ConsultaClientesService } from 'src/app/consulta-clientes.service';
import { BdService } from 'src/app/_model/bd.service';
import { Cliente } from 'src/app/_model/cliente';
import { Servico } from 'src/app/_model/servico';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit{

  clientes: Cliente[] = [];
  clienteId: number;
  pag: number = 1;
  contador = 8;
  email: string
  listaFirebase:  Cliente[] = []
      
  constructor(
    private consultaCliente: ConsultaClientesService,
    private bdService: BdService    
    ) { }

  ngOnInit(): void {        
    this.clienteId = undefined   

    firebase.auth().onAuthStateChanged((user) =>{
      this.email = user.email
    })
     this.listarClientes()
     this.consultarTodosCliente()    
     
  } 

  listarClientes(): void {
    this.consultaCliente.getClientes().subscribe(
      (resposta: Cliente[]) => this.clientes = resposta.sort((a, b) => (a.nomeEmpresarial > b.nomeEmpresarial) ? 1 : -1)
      );   
  }

  buscarCliente(nome: string): void {
    if( nome.length === 0) {
      this.listarClientes()
    }
    
    else{      
      this.filtrarCliente(nome)
    }
  }
 

  filtrarCliente(nome: string) : void{
    this.consultaCliente.getClienteNomeempresarial(nome).subscribe(
      (resposta) => { this.clientes = resposta.sort((a,b) => (a.nomeEmpresarial - b.nomeEmpresaril)? 1 : -1)}
    );
  }

  somarServicos(cliente: Cliente): number {
    let total = 0;
    cliente.listaServico.forEach((servico: Servico) => {
      total += servico.valor;
    });
    return total;
  }

  passarId(idcliente: any): void {
    this.clienteId = idcliente;    
  }

  buscar(evento: any): void{
    console.log('teste')
  }

  cnpj = '47287461000150'

  consultaclientedb(cnpj: string): void{
    this.bdService.consultarCliente(cnpj)
  }


  consultarTodosCliente(): void{
    this.listaFirebase = this.bdService.consultarTodosCliente();  
    
  }

}
