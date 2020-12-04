import { Component, OnInit, OnChanges } from '@angular/core';
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

  constructor(private consultaCliente: ConsultaClientesService) { }

  ngOnInit(): void {
    this.buscarCliente();
  }

 

  buscarCliente(): void{
  this.consultaCliente.getClientes()
  .then((resposta: any) => this.clientes = resposta);
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

  deletarClinete(id: number): void {
    this.consultaCliente.deleteCliente(id).subscribe(
      () => { this.buscarCliente(), console.log('deletado com sucesso'); }
    );
  }
}
