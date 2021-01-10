import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConsultaClientesService } from 'src/app/consulta-clientes.service';
import { Cliente } from 'src/app/_model/cliente';
import { Servico } from 'src/app/_model/servico';

@Component({
  selector: 'app-adicionar-servicos',
  templateUrl: './adicionar-servicos.component.html',
  styleUrls: ['./adicionar-servicos.component.css']
})
export class AdicionarServicosComponent implements OnInit {

  @Input() listaCliente = new FormArray([])
  listadeServicos = new FormArray([])
  
  constructor(
    private consutalCliente: ConsultaClientesService,
    private toastr : ToastrService,
    private router: Router
    ) { }

  ngOnInit(): void { 
  }

  adicionarServico(): void{
    let formServico = new FormGroup({
      descricao : new FormControl('', [Validators.required]),
      vencimento: new FormControl('', [Validators.required]),
      valor: new FormControl('', [Validators.required, Validators.min(1)])
    })
    this.listadeServicos.push(formServico)
  }

  removeServico(index: number) : void {
    this.listadeServicos.removeAt(index)
  }

  setServicos(): void {
    this.listaCliente.controls.forEach((cliente: FormGroup) => {
      this.consutalCliente.getIdCliente(cliente.value.cnpj).subscribe(
        (resposta) => {
          let chave = Object.keys(resposta)[0];
          let cliente: Cliente = Object.values(resposta)[0];
          this.listadeServicos.controls.forEach((formGroup: FormGroup) => {
            let servico : Servico = formGroup.value
            if ( cliente.listaServico === undefined) {              
              cliente.listaServico =  [];
              cliente.listaServico.push(servico)
            }
            else{              
              cliente.listaServico.push(servico)
            }            
          });
          this.consutalCliente.putCliente(chave, cliente).subscribe(
            () => this.router.navigate(['/home'])
          );         
        }
        );
      }    
      )     
      this.toastr.success('Serviços adicionados  com sucesso')
  }
}
