import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import * as firebase from 'firebase'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class BdService {
  
  constructor( 
    private router: Router,
    private toastr: ToastrService,) { }
  
  publicar(cliente: Cliente): void{    
    firebase.database().ref(`clientes/${btoa(cliente.cnpj)}`)
    .push({     
      cnpj: cliente.cnpj,
      nomeEmpresarial: cliente.nomeEmpresarial,
      cep: cliente.cep,
      logradouro: cliente.logradouro,
      numero: cliente.numero,
      bairro: cliente.bairro,
      localidade: cliente.localidade,
      UF: cliente.UF,    
      listaServico:  {}  
    })
    .once('value')
    .then(() => { 
      this.toastr.success('Cliente cadastro com sucesso'),
      this.router.navigate(['/home'])
    })
  }  

  getClienteCNPJ(cnpj: string): Promise<Cliente>{
     return firebase.database().ref(`clientes/${btoa(cnpj)}`).once('value')   
  }

  getAllClientes(): Cliente[] {
    let lista : Array<Cliente> = []

    firebase.database().ref('/clientes').once('value')
    .then((snapshot : any) => {
      snapshot.forEach(( childSnapshot: any) => {
        let chave = Object.keys(childSnapshot.val())[0] // retorna o valor da chave na posicao 0 do objeto childSnapshot
        let objetoCliente = childSnapshot.val()[chave] //  retorna o objeto da chave na posicao 0
        let cliente = new Cliente(
          null,
          objetoCliente['cnpj'],
          objetoCliente['nomeEmpresarial'],
          objetoCliente['cep'],
          objetoCliente['logradouro'],
          objetoCliente['numero'],
          objetoCliente['bairro'],
          objetoCliente['localidade'],
          objetoCliente['UF'],
          [],          
        )
        lista.push(cliente)
      })      
    })    
    return lista
  }  

  delCliente(cnpj: string): Promise<Cliente>{
    return firebase.database().ref(`clientes/${btoa(cnpj)}`).remove()
  }

  putCliente(cnpj: string, cliente: Cliente) : Promise<any> {
    return firebase.database().ref(`clientes/${btoa(cnpj)}`).update(cliente)    
  }
}
