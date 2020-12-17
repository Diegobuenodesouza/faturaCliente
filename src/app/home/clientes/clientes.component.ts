import { Component, OnInit} from '@angular/core';
import { ConsultaClientesService } from 'src/app/consulta-clientes.service';
import { Cliente } from 'src/app/_model/cliente';
import { Servico } from 'src/app/_model/servico';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] = [];
  clienteId: number;
  pag: number = 1;
  contador = 8;

  constructor(private consultaCliente: ConsultaClientesService) { }

  ngOnInit(): void {

    this.consultaCliente.getClientes().subscribe(
      (resposta: Cliente[]) => this.clientes = resposta.sort((a, b) => (a.nomeEmpresarial > b.nomeEmpresarial) ? 1 : -1)
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

}
