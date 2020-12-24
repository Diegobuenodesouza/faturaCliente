
import { Component, Input,  OnInit, Output , EventEmitter, OnChanges } from '@angular/core';
import {  ToastrService } from 'ngx-toastr';
import { ConsultaClientesService } from 'src/app/consulta-clientes.service';
import { BdService } from 'src/app/_model/bd.service';
import { Cliente } from 'src/app/_model/cliente';

@Component({
  selector: 'app-deletar-cliente',
  templateUrl: './deletar-cliente.component.html',
  styleUrls: ['./deletar-cliente.component.css']
})
export class DeletarClienteComponent implements OnInit, OnChanges{

  @Input() cnpjcliente: string;
  cliente = new Cliente(0, '', '', '', '', '', '', '', '', []);
  @Output() listanovamente = new EventEmitter();

  constructor(
    private consultaCliente: ConsultaClientesService,
    private toastr: ToastrService,
    private bdService : BdService
    
    ) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.bdService.getClienteCNPJ(this.cnpjcliente)
    .then((snapshot: any) => {
      snapshot.forEach((childSnapshot: any) =>{
        this.cliente = childSnapshot.val()
      })
    })   
  }

  removerCliente(): void{
    this.bdService.delCliente(this.cliente.cnpj).then(
      () => { this.listanovamente.emit(), this.toastr.info('Cliente excluido com sucesso');}
      );
      
    }
}
