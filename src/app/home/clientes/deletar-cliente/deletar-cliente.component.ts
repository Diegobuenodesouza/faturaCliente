
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

  @Input() clienteKey: string;
  cliente: any;
  key: string
  @Output() listanovamente = new EventEmitter();

  constructor(
    private consultaCliente: ConsultaClientesService,
    private toastr: ToastrService,
    private router: Router,

    ) { }

  ngOnInit(): void {    
  }

  ngOnChanges(): void {
    this.consultaCliente.getIdCliente(this.clienteKey).subscribe(
      (resposta: any) => { this.cliente = Object.values(resposta)[0], 
      this.key = Object.keys(resposta)[0]}
        
    );
  }

  excluirCliente(): void{
    this.consultaCliente.deleteCliente(this.key).subscribe(
      () => { this.router.navigate(['/home']),
      this.toastr.info('Cliente excluido com sucesso'),
      this.listanovamente.emit(); }
    );
  }
}
