
import { Component, Input,  OnInit, Output , EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ConsultaClientesService } from 'src/app/consulta-clientes.service';
import { Cliente } from 'src/app/_model/cliente';

@Component({
  selector: 'app-deletar-cliente',
  templateUrl: './deletar-cliente.component.html',
  styleUrls: ['./deletar-cliente.component.css']
})
export class DeletarClienteComponent implements OnInit{

  @Input() clienteId: number;
  cliente = new Cliente(0, '', '', '', '', '', '', '', '', []);
  

  constructor(
    private consultaCliente: ConsultaClientesService,
    private router: Router

    ) { }

  ngOnInit(): void {
    this.consultaCliente.getIdCliente(this.clienteId).subscribe(
      (resposta: any) => this.cliente = resposta
    );
  }

  excluirCliente(): void{
    this.consultaCliente.deleteCliente(this.clienteId);
    this.router.navigate(['home' , 'clientes']);

  }
}
