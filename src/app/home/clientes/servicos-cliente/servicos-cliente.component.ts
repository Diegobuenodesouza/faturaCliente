import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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

  constructor(private consultaCliente: ConsultaClientesService) { }


  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.consultaCliente.getIdCliente(this.clienteId).subscribe(
      (resposta) => {this.cliente = resposta; }
    );
  }

  somaValores(cliente: Cliente): number {
    let total = 0;
    this.cliente.listaServico.forEach((servicos: Servico) => {
      total = servicos.valor;
    });
    return total;
  }
}
