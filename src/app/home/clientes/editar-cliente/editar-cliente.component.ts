import { Component, OnInit, Input, OnChanges, Output, EventEmitter  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  @Input() clienteId: number;
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
    private consultaCliente: ConsultaClientesService,
    private toastr: ToastrService,
    private router: Router
    ) { }

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.consultaCliente.getIdCliente(this.clienteId).subscribe(
      (resposta) => {this.cliente = resposta, this.atualizarInput(); }
    );

  }

  atualizarInput(): any{
    this.formularioEditar.controls.cnpj.setValue(this.cliente.cnpj);
    this.formularioEditar.controls.nomeEmpresarial.setValue(this.cliente.nomeEmpresarial);
    this.formularioEditar.controls.cep.setValue(this.cliente.cep);
    this.formularioEditar.controls.logradouro.setValue(this.cliente.logradouro);
    this.formularioEditar.controls.numero.setValue(this.cliente.numero);
    this.formularioEditar.controls.bairro.setValue(this.cliente.bairro);
    this.formularioEditar.controls.localidade.setValue(this.cliente.localidade);
    this.formularioEditar.controls.uf.setValue(this.cliente.uf);
  }

  alterarCliente(): void {
    this.cliente.nomeEmpresarial = this.formularioEditar.value.nomeEmpresarial;
    this.cliente.cep = this.formularioEditar.value.cep;
    this.cliente.logradouro = this.formularioEditar.value.logradouro;
    this.cliente.numero = this.formularioEditar.value.numero;
    this.cliente.bairro = this.formularioEditar.value.bairro;
    this.cliente.localidade = this.formularioEditar.value.localidade;
    this.cliente.uf = this.formularioEditar.value.uf;

    this.consultaCliente.putCliente(this.clienteId, this.cliente).subscribe(
      () => {
        this.toastr.success('Cliente alterado com sucesso'),
        this.listanovamente.emit(),
        this.router.navigate(['/home']);
      }
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
