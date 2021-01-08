import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConsultaClientesService } from 'src/app/consulta-clientes.service';
import { Cliente } from 'src/app/_model/cliente';

@Component({
  selector: 'app-add-servicos-diversos-clientes',
  templateUrl: './add-servicos-diversos-clientes.component.html',
  styleUrls: ['./add-servicos-diversos-clientes.component.css']
})
export class AddServicosDiversosClientesComponent implements OnInit {

  listaCliente : Cliente[] = []
  formulario = new FormArray([])
  checkFormulario = false
  clientesSelencionadosForm = new FormArray([])

  constructor(private consultaCliente: ConsultaClientesService) { }

  ngOnInit(): void {
    this.consultaCliente.getClientes().subscribe(
      (respost) => {this.listaCliente = Object.values(respost), this.gerarFormulario()}
      );
  }

  gerarFormulario(): void{  
   this.listaCliente.forEach((cliente: Cliente) => {
     this.formulario.push(new FormGroup({
       check: new FormControl(false),
       cnpj : new FormControl(cliente.cnpj),
       nome : new FormControl(cliente.nomeEmpresarial),
       localidade: new FormControl(cliente.localidade)
     }))
   })
   }

  disabledButton(): boolean {
    return this.formulario.controls.every((formGroup: FormGroup) => formGroup.value.check === false)
  }

  marcaEDesmascar(): void{
    this.checkFormulario = !this.checkFormulario
    this.formulario.controls.forEach((formGroup: FormGroup) => {      
      formGroup.controls.check.setValue(this.checkFormulario) ;      
    })
  }

  clientesSelecionados(): void{
    this.clientesSelencionadosForm = new FormArray([])
    this.formulario.controls.forEach((formGroup: FormGroup) => {
      if( formGroup.value.check === true){
        this.clientesSelencionadosForm.push(formGroup)
      }
    })
  }
}
