import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BuscaCepService } from 'src/app/busca-cep.service';



@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {


  textinput: FormControl;

  formulario = new FormGroup({
    cnpj: new FormControl('', [Validators.required , Validators.maxLength(8)]),
    nomeEmpresarial: new FormControl('' , [Validators.required]),
    cep: new FormControl('' , [Validators.required]),
    logradouro: new FormControl('' , [Validators.required]),
    numero: new FormControl(''),
    bairro: new FormControl('' , [Validators.required]),
    localidade: new FormControl('' , [Validators.required]),
    uf: new FormControl('' , [Validators.required])
  });

  constructor(private buscaCep: BuscaCepService) { }

  ngOnInit(): void {
  }

  buscarCep(cep: string): any {

    this.buscaCep.buscarCEP(cep).subscribe(
      (resposta: any) => {

        this.formulario.controls.cep.setValue(resposta.cep),
        this.formulario.controls.logradouro.setValue(resposta.logradouro),
        this.formulario.controls.bairro.setValue(resposta.bairro),
        this.formulario.controls.localidade.setValue(resposta.localidade),
        this.formulario.controls.uf.setValue(resposta.uf);

      } );

  }
}

