import { Component, OnInit, Input, OnChanges  } from '@angular/core';
import { ConsultaClientesService } from 'src/app/consulta-clientes.service';
import { Cliente } from 'src/app/_model/cliente';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit, OnChanges {

  @Input() clienteId: number;
  cliente: Cliente;

  constructor(private consultaCliente: ConsultaClientesService) { }

  ngOnInit(): void {

  }

  ngOnChanges(): void {
    this.consultaCliente.getIdCliente(this.clienteId).subscribe(
      (resposta: Cliente) => this.cliente = resposta
    );
  }
}
