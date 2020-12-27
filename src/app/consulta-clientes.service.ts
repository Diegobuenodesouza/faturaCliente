import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from './_model/cliente';


@Injectable({
  providedIn: 'root'
})
export class ConsultaClientesService { 

  private URL = 'https://faturaclientes.azurewebsites.net/api/Clientes';

  constructor(private http: HttpClient) { }

  getClientes(): Observable<any> {
    return this.http.get(`${this.URL}`);
  }

  getIdCliente(id: number): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.URL}/${id}`);
  }

  postCliente(cliente: Cliente): Observable<any> {
    return this.http.post<Cliente>(this.URL, cliente);
  }

  deleteCliente(id: number): Observable<any> {
    return this.http.delete(`${this.URL}/${id}`);
  }

  putCliente(id: number, cliente: any): Observable<any>{
    return this.http.put(`${this.URL}/${id}` , cliente);
  }

  getClienteNomeempresarial(busca: string) : Observable<any>{
    return this.http.get<Cliente[]>(`${this.URL}?nomeEmpresarial_like=${busca}`)
  }
}
