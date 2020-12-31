
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConsultaClientesService } from 'src/app/consulta-clientes.service';
import { Cliente} from './../../_model/cliente';
import { BuscaCepService } from 'src/app/busca-cep.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  textovalidacao: string;
  cliente: Cliente;
  erroCep =  false;


  formulario = new FormGroup({
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
    private toastr: ToastrService,
    private router: Router,
    private buscaCep: BuscaCepService

    ) { }

  ngOnInit(): void {
  }

  buscarCep(cep: string): any {

    this.buscaCep.buscarCEP(cep).subscribe(
      (resposta: any): void => {

        if (resposta.erro === true){
          this.erroCep = true ;
        }
        else{
          this.formulario.controls.cep.setValue(resposta.cep),
          this.formulario.controls.logradouro.setValue(resposta.logradouro),
          this.formulario.controls.bairro.setValue(resposta.bairro),
          this.formulario.controls.localidade.setValue(resposta.localidade),
          this.formulario.controls.uf.setValue(resposta.uf);
          this.erroCep = false;
        }
      },
      (): any => { this.erroCep = true; }
      );
  }

  cadastrar(): void {

    this.cliente = new Cliente(
      this.formulario.value.id,
      this.formulario.value.cnpj,
      this.formulario.value.nomeEmpresarial,
      this.formulario.value.cep,
      this.formulario.value.logradouro,
      this.formulario.value.numero,
      this.formulario.value.bairro,
      this.formulario.value.localidade,
      this.formulario.value.uf,
      null);

    this.consultaCliente.postCliente(this.cliente).subscribe(
      () => { this.router.navigate(['/home']), this.toastr.success('Cliente cadastro com sucesso'); },
      (error: Error) => alert('deu erro ' + error)
    );
  }
}
