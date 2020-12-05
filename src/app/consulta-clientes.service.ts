import { HttpClient } from '@angular/common/http';
import { core } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from './_model/cliente';

@Injectable({
  providedIn: 'root'
})
export class ConsultaClientesService {

  private URL = 'http://localhost:3000/clientes';

  constructor(private http: HttpClient) { }

  getClientes(): Promise<Cliente[]>{
    return this.http.get<Cliente[]>(this.URL)
    .toPromise()
    .then((resposta: any) => resposta);
  }

  getIdCliente(id: number): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.URL}/${id}`);
  }

  postCliente(cliente: Cliente): Observable<any> {
    return this.http.post(this.URL, cliente);
  }

  deleteCliente(id: number): Observable<any> {
    return this.http.delete(`${this.URL}/${id}`);
  }

  putCliente(id: number, cliente: Cliente): Observable<any>{
    return this.http.put(`${this.URL}/${id}` , cliente);
  }
}
