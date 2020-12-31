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

  clienteId: string;
  pag = 1;
  contador = 8;
  listaClientes: Cliente[] = [];

  constructor(
    private consultaCliente: ConsultaClientesService,

    ) { }

  ngOnInit(): void {
    this.clienteId = undefined;
    this.todosClientes();
  }

  todosClientes(): void{
    this.consultaCliente.getClientes().subscribe(
      (resposta: any) => {
        for(let key of Object.keys(resposta)){
          let cliente = resposta[key]
          this.listaClientes.push(cliente)
        }        
      }
    );
  }

  somarServicos(cliente: Cliente): number {
    let total = 0;
    if (cliente.listaServico === undefined ) {
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
}
