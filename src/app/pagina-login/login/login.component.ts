import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AutenticacaoService } from 'src/app/_model/autenticacao.service';
import { Usuario} from './../../_model/usuario'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formulario: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required]),
    senha: new FormControl(null, [Validators.required]),
  })

  constructor(private autenticacao: AutenticacaoService) { }

  ngOnInit(): void {
  }

  autenticar(): void{
    let usuario: Usuario = new Usuario(
      this.formulario.value.email, 
      this.formulario.value.senha
    )
    this.autenticacao.autenticar(usuario.email,  usuario.senha)
  }
}
