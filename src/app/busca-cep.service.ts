import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuscaCepService {

  private BUSCA_CEP = 'https://viacep.com.br/ws';
  constructor(private http: HttpClient) { }

  buscarCEP(cep: string): Observable<any> {
    return this.http.get(`${this.BUSCA_CEP}/${cep}/json`);
  }

}

