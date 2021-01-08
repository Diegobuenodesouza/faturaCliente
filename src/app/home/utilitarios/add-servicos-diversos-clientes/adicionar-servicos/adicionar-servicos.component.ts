import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-adicionar-servicos',
  templateUrl: './adicionar-servicos.component.html',
  styleUrls: ['./adicionar-servicos.component.css']
})
export class AdicionarServicosComponent implements OnInit {

  @Input() listaCliente = new FormArray([])

  listadeServicos = new FormArray([])
  
  constructor() { }

  ngOnInit(): void { 
  }

  adicionarServico(): void{
    this.listadeServicos.push(new FormGroup({
      descricao : new FormControl('', [Validators.required]),
      vencimento: new FormControl('', [Validators.required]),
      valor: new FormControl('', [Validators.required, Validators.min(-1)])
    }))
  }

}
