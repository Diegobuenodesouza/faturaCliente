
import { Component, Input,  OnInit, Output , EventEmitter, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import {  ToastrService } from 'ngx-toastr';
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
    private consultaCliente: ConsultaClientesService,
    private toastr: ToastrService,
    private router: Router,

    ) { }

  ngOnInit(): void {
    
  }

  ngOnChanges(): void {
    this.consultaCliente.getIdCliente(this.clienteId).subscribe(
      (resposta: any) => {this.cliente = resposta; }
    );
  }

  excluirCliente(): void{
    this.consultaCliente.deleteCliente(this.clienteId).subscribe(
      () => { this.router.navigate(['/home']),
      this.toastr.info('Cliente excluido com sucesso'),
      this.listanovamente.emit(); }
    );
  }
}
