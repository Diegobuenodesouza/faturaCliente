import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BuscaCepService } from 'src/app/busca-cep.service';
import { Cliente} from './../../_model/cliente';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  cliente: Cliente;

  formulario = new FormGroup({
    cnpj: new FormControl(null),
    nomeEmpresarial: new FormControl(null),
    logradouro: new FormControl(null),
    numero: new FormControl(null),
    cep: new FormControl(null),
    bairro: new FormControl(null),
    estado: new FormControl(null),
    UF: new FormControl(null)
  });

  constructor(private buscaCep: BuscaCepService) { }

  ngOnInit(): void {
  }

  buscarCep(cep: string): any{
    this.buscaCep.buscarCEP(cep).subscribe(
      (resposta) => { 
        this.formulario.value.bairro = resposta.bairro;
        console.log(resposta.bairro);
      }
    );
  }
}
