
import { Component, Input,  OnInit, Output , EventEmitter, OnChanges } from '@angular/core';
import { ConsultaClientesService } from 'src/app/consulta-clientes.service';
import { Cliente } from 'src/app/_model/cliente';

@Component({
  selector: 'app-deletar-cliente',
  templateUrl: './deletar-cliente.component.html',
  styleUrls: ['./deletar-cliente.component.css']
})
export class DeletarClienteComponent implements OnInit, OnChanges{

  @Input() clienteId: number;
  cliente = new Cliente(0, '', '', '', '', '', '', '', '', []);
  @Output() listanovamente = new EventEmitter();

  constructor(
    private consultaCliente: ConsultaClientesService
    ) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.consultaCliente.getIdCliente(this.clienteId).subscribe(
      (resposta: any) => this.cliente = resposta
    );
  }

  excluirCliente(): void{
    this.consultaCliente.deleteCliente(this.clienteId).subscribe(
      () => { console.log('deletado com sucesso'), this.listanovamente.emit()}
    );
  }
}
