import { Component,  OnInit} from '@angular/core';
import { ConsultaClientesService } from 'src/app/consulta-clientes.service';
import { Cliente } from 'src/app/_model/cliente';
import { Servico } from 'src/app/_model/servico';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit{

  clientes: Cliente[] = [];
  clienteId: string;
  pag = 1;
  contador = 8;
  email: string;
  listaClientes: Cliente[] = [];

  constructor(
    private consultaCliente: ConsultaClientesService,

    ) { }

  ngOnInit(): void {
    this.clienteId = undefined;
    this.TodosClientes();
  }

  TodosClientes(): void{
    this.consultaCliente.getClientes().subscribe(
      (resposta) => this.listaClientes = resposta
    );
  }

  // buscarCliente(nome: string): void {
  //   if( nome.length === 0) {
  //     this.listarClientes()
  //   }    
  //   else{      
  //     this.filtrarCliente(nome)
  //   }
  // }
 

  filtrarCliente(nome: string): void{
    this.consultaCliente.getClienteNomeempresarial(nome).subscribe(
      (resposta) => { this.clientes = resposta.sort((a, b) => (a.nomeEmpresarial - b.nomeEmpresaril) ? 1 : -1)}
    );
  }

  somarServicos(cliente: Cliente): number {
    let total = 0;
    if(cliente.listaServico === null) {
      return total;
    }
    cliente.listaServico.forEach((servico: Servico) => {
      total += servico.valor;
    });
    return total;
  }

  passarId(cnpjcliente: any): void {
    this.clienteId = cnpjcliente;
  }

  buscar(evento: any): void{
    console.log('teste');
  }
}
