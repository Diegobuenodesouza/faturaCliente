import { Component, OnInit, Input, OnChanges, Output, EventEmitter  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BuscaCepService } from 'src/app/busca-cep.service';
import { ConsultaClientesService } from 'src/app/consulta-clientes.service';
import { BdService } from 'src/app/_model/bd.service';
import { Cliente } from 'src/app/_model/cliente';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit, OnChanges {

  @Input() cnpjcliente: string;
  @Output() listanovamente = new EventEmitter();
  erroCep =  false;
  cliente: Cliente;
  
  formularioEditar = new FormGroup({
    cnpj: new FormControl('', [Validators.required ]),
    nomeEmpresarial: new FormControl('' , [Validators.required]),
    cep: new FormControl('' , [Validators.required]),
    logradouro: new FormControl('' , [Validators.required]),
    numero: new FormControl(''),
    bairro: new FormControl('' , [Validators.required]),
    localidade: new FormControl('' , [Validators.required]),
    uf: new FormControl('' , [Validators.required, Validators.maxLength(2), Validators.minLength(2)])
  });

  constructor(    
    private buscaCep: BuscaCepService,
    private bdService : BdService,
    private toastr : ToastrService
    ) { }

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.bdService.getClienteCNPJ(this.cnpjcliente).then((snapshot: any) =>{
        snapshot.forEach((childSnapshot: any) =>{
          this.cliente = childSnapshot.val(),
          this.atualizarInput()     
        })
      }
    )
    
  }

  atualizarInput(): any{
    this.formularioEditar.controls.cnpj.setValue(this.cliente.cnpj);
    this.formularioEditar.controls.nomeEmpresarial.setValue(this.cliente.nomeEmpresarial);
    this.formularioEditar.controls.cep.setValue(this.cliente.cep);
    this.formularioEditar.controls.logradouro.setValue(this.cliente.logradouro);
    this.formularioEditar.controls.numero.setValue(this.cliente.numero);
    this.formularioEditar.controls.bairro.setValue(this.cliente.bairro);
    this.formularioEditar.controls.localidade.setValue(this.cliente.localidade);
    this.formularioEditar.controls.uf.setValue(this.cliente.UF);
  }

  alterarCliente(): void {
    this.cliente.nomeEmpresarial = this.formularioEditar.value.nomeEmpresarial;
    this.cliente.cep = this.formularioEditar.value.cep;
    this.cliente.logradouro = this.formularioEditar.value.logradouro;
    this.cliente.numero = this.formularioEditar.value.numero;
    this.cliente.bairro = this.formularioEditar.value.bairro;
    this.cliente.localidade = this.formularioEditar.value.localidade;
    this.cliente.UF = this.formularioEditar.value.uf;

    this.bdService.putCliente(this.cliente.cnpj, this.cliente)
    .then(
      () => {this.toastr.info('Cliente atualizado com sucesso'), this.listanovamente.emit() }
    );
  }
  
  buscarCep(cep: string): any {

    this.buscaCep.buscarCEP(cep).subscribe(
      (resposta: any): void => {

        if (resposta.erro === true){
          this.erroCep = true ;
        }
        else{
          this.formularioEditar.controls.cep.setValue(resposta.cep),
          this.formularioEditar.controls.logradouro.setValue(resposta.logradouro),
          this.formularioEditar.controls.bairro.setValue(resposta.bairro),
          this.formularioEditar.controls.localidade.setValue(resposta.localidade),
          this.formularioEditar.controls.uf.setValue(resposta.uf);
          this.erroCep = false;
        }
      },
      (): any => { this.erroCep = true; }
      );
  }

}
