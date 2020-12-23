import { Injectable } from '@angular/core';
import * as firebase from 'firebase'
import { Cliente } from './cliente';

@Injectable({
  providedIn: 'root'
})
export class BdService {

  constructor() { }

  publicar(cliente: Cliente): void{    
    console.log(cliente)
    firebase.database().ref(`clientes/${btoa(cliente.cnpj)}`)
    .push({     
      cnpj: cliente.cnpj,
      nomeEmpresarial: cliente.nomeEmpresarial,
      cep: cliente.cep,
      logradouro: cliente.logradouro,
      numero: cliente.numero,
      bairro: cliente.bairro,
      localidade: cliente.localidade,
      UF: cliente.UF      
    })     
  }

  consultarCliente(cnpj: string): void{
    firebase.database().ref(`clientes/${btoa(cnpj)}`)
    .once('value').then((snapshot: any ) => console.log(snapshot.val()))
  }

  consultarTodosCliente(): any{
    firebase.database().ref(`clientes/`)
    .once('value').then((snapshot: any) => {

      let clientes: any[] = []
      snapshot.forEach((childSnapshot: any) =>{

        let cliente = childSnapshot.val()
        clientes.push(cliente)
      })

      console.log(clientes)
    })

    
  }


}
