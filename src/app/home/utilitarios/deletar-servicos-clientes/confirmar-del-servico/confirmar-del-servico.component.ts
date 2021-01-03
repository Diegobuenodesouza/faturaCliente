import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { observable } from 'rxjs';
import { ConsultaClientesService } from 'src/app/consulta-clientes.service';
import { Cliente } from 'src/app/_model/cliente';

@Component({
  selector: 'app-confirmar-del-servico',
  templateUrl: './confirmar-del-servico.component.html',
  styleUrls: ['./confirmar-del-servico.component.css']
})
export class ConfirmarDelServicoComponent implements OnInit {

  @Input() listasClienteRemoverServicos: FormArray

  constructor(
    private consultaCliente: ConsultaClientesService,
    private router: Router,
    private toastr: ToastrService,
    ) { }

  ngOnInit(): void {
  }

  deletarTodosServicos(): void {
    this.listasClienteRemoverServicos.controls.forEach((formGroup: FormGroup) => {
      this.consultaCliente.getIdCliente(formGroup.value.cnpj).subscribe(
        (resposta : any) => 
        {
          let cliente = Object.values(resposta)[0];
          let key = Object.keys(resposta)[0];          
          cliente['listaServico'] = []
          this.consultaCliente.putCliente(key, cliente).subscribe(
            () => { this.router.navigate(['home']) , this.toastr.success('Servicos deletados com sucessos', 'Exclusão Serviços')}
          );
        }
      );
    })
  }

}
