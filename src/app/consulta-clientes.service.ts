import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from './_model/cliente';
import { Servico } from './_model/servico';


@Injectable({
  providedIn: 'root'
})
export class ConsultaClientesService {

  private URL_FIREBASE = 'https://fatura-cliente-portfolio-default-rtdb.firebaseio.com/clientes'

  constructor(private http: HttpClient) { }

  getClientes(): Observable<any> {
    return this.http.get(`${this.URL_FIREBASE}.json`);
  }
  getIdCliente(key: string): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.URL_FIREBASE}/${key}.json`);
  }
  postCliente(cliente: Cliente): Observable<any> {
    return this.http.post<Cliente>(`${this.URL_FIREBASE}.json`, cliente);
  }
  deleteCliente(key: string): Observable<any> {
    return this.http.delete(`${this.URL_FIREBASE}/${key}.json`);
  }
  putCliente(key: string, cliente: any): Observable<any>{
    return this.http.put(`${this.URL_FIREBASE}/${key}.json` , cliente);
  }  
}
