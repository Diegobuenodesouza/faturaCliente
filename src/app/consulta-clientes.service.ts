import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from './_model/cliente';

@Injectable({
  providedIn: 'root'
})
export class ConsultaClientesService {

  private URL = 'http://localhost:3000/clientes';

  constructor(private http: HttpClient) { }

  getClientes(): Observable<any>{
    return this.http.get(this.URL);
  }

  
}
