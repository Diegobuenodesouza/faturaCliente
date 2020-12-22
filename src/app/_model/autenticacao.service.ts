import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';



@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  token_id: string

  constructor(private router: Router){}
  
  public autenticar(email: string, senha: string): void{
    firebase.auth().signInWithEmailAndPassword(email, senha)
    .then(() => {
      firebase.auth().currentUser.getIdToken()
      .then((idToken: string) => { 
        this.token_id = idToken,
        localStorage.setItem('idToken', idToken),
        this.router.navigate(['/home'])
       })
    })
    .catch((error: Error) => console.log(error))
  }

  public autenticado(): boolean{
    if(this.token_id === undefined && localStorage.getItem('idToken') != null){
      this.token_id = localStorage.getItem('idToken')
    }

    if(this.token_id === undefined){
      this.router.navigate(['/'])
    }

    return this.token_id !== undefined
  }

  public logout(): void{
    firebase.auth().signOut()
    .then(()=> {
      this.token_id = undefined
      localStorage.removeItem('idToken')
      this.router.navigate(['/'])
    })    
  }  
}
