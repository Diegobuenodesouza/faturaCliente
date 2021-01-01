import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConsultaClientesService } from 'src/app/consulta-clientes.service';

@Component({
  selector: 'app-dados-fatura',
  templateUrl: './dados-fatura.component.html',
  styleUrls: ['./dados-fatura.component.css']
})
export class DadosFaturaComponent implements OnInit {

  dados: any
  formulario = new FormGroup({
    competencia : new FormControl('', [Validators.required]),
    dataDeEmissao : new FormControl('' ,[Validators.required]),
    dataVencimentoRecibo : new FormControl('', [Validators.required])
  })

  constructor(private consultaDados : ConsultaClientesService) { }
  
  ngOnInit(): void {
    this.consultaDados.getDadosFatura().subscribe(
      (resposta) => {
        this.dados = resposta;
        this.formulario = new FormGroup({
          competencia : new FormControl(this.dados.competencia, [Validators.required]),
          dataDeEmissao : new FormControl(this.dados.dataDeEmissao, [Validators.required]),
          dataVencimentoRecibo : new FormControl(this.dados.dataVencimentoRecibo, [Validators.required])
        })
      }
    );
  }

 
}
