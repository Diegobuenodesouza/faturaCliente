import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from './_model/cliente';
import { Servico } from './_model/servico';


@Injectable({
  providedIn: 'root'
})
export class ConsultaClientesService { 

  private URL = 'http://localhost:3000/clientes';

  private URL_FIREBASE = 'https://fatura-cliente-portfolio-default-rtdb.firebaseio.com/clientes'

  constructor(private http: HttpClient) { }

  getClientes(): Observable<any> {
    return this.http.get(`${this.URL_FIREBASE}.json`);
  }
  getIdCliente(id: number): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.URL}/${id}`);
  }
  postCliente(cliente: Cliente): Observable<any> {
    return this.http.post<Cliente>(`${this.URL_FIREBASE}.json`, cliente);
  }
  deleteCliente(id: number): Observable<any> {
    return this.http.delete(`${this.URL}/${id}`);
  }
  putCliente(id: number, cliente: any): Observable<any>{
    return this.http.put(`${this.URL}/${id}` , cliente);
  }  
}
