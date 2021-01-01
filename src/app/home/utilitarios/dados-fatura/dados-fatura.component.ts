import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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

  constructor(
    private consultaDados : ConsultaClientesService,
    private router: Router,
    private toastr: ToastrService
    ) { }
  
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

  alterarDados() : void{
    this.dados.competencia = this.formulario.value.competencia;
    this.dados.dataDeEmissao = this.formulario.value.dataDeEmissao;
    this.dados.dataVencimentoRecibo = this.formulario.value.dataVencimentoRecibo;
    this.consultaDados.putDadosFatura(this.dados).subscribe(
      () => { 
        this.toastr.success('Dados alterados com sucesso'),
        this.router.navigate(['/home'])
        },
      (error: Error) => alert(error)
    )
  }

}
