import { Component, OnInit, Input, OnChanges, Output, EventEmitter  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConsultaClientesService } from 'src/app/consulta-clientes.service';
import { Cliente } from 'src/app/_model/cliente';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit, OnChanges {

  @Input() clienteId: number;
  @Output() atualizarLista = new EventEmitter();
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
    private consultaCliente: ConsultaClientesService,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.consultaCliente.getIdCliente(this.clienteId).subscribe(
      (resposta: Cliente) => { this.cliente = resposta,  this.atualizarInput(resposta); }
    );
  }


  atualizarInput(cliente: Cliente): any{
    this.formularioEditar.controls.cnpj.setValue(cliente.cnpj);
    this.formularioEditar.controls.nomeEmpresarial.setValue(cliente.nomeEmpresarial);
    this.formularioEditar.controls.cep.setValue(cliente.cep);
    this.formularioEditar.controls.logradouro.setValue(cliente.logradouro);
    this.formularioEditar.controls.numero.setValue(cliente.numero);
    this.formularioEditar.controls.bairro.setValue(cliente.bairro);
    this.formularioEditar.controls.localidade.setValue(cliente.localidade);
    this.formularioEditar.controls.uf.setValue(cliente.UF);
  }

  alterarCliente(): void {
    this.cliente.nomeEmpresarial = this.formularioEditar.value.nomeEmpresarial;
    this.cliente.cep = this.formularioEditar.value.cep;
    this.cliente.logradouro = this.formularioEditar.value.logradouro;
    this.cliente.numero = this.formularioEditar.value.numero;
    this.cliente.bairro = this.formularioEditar.value.bairro;
    this.cliente.localidade = this.formularioEditar.value.localidade;
    this.cliente.UF = this.formularioEditar.value.uf;

    this.consultaCliente.putCliente(this.clienteId, this.cliente).subscribe(
      () => { this.atualizarLista.emit();  this.toastr.success('Cliente alterado com sucesso') }
    );

  }

}
