import { Component,  OnInit} from '@angular/core';
import { observable } from 'rxjs';
import { ConsultaClientesService } from 'src/app/consulta-clientes.service';
import { Cliente } from 'src/app/_model/cliente';
import { Servico } from 'src/app/_model/servico';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit{

  clienteKey: string;
  pag = 1;
  contador = 8;
  listaClientes: Cliente[] = [];
  listakey: string[] = []
  
  constructor(
    private consultaCliente: ConsultaClientesService,

    ) { }

  ngOnInit(): void {
    this.clienteKey = undefined;
    this.todosClientes();  
  }

  retornoIndex(): number {
    return this.pag > 1 ? this.contador * (this.pag -1) : 0   
  }

  todosClientes(): void{
    this.consultaCliente.getClientes().subscribe(
     (resposta: any) => { this.listaClientes = Object.values(resposta)
        
      }
    );
  }
  filtrar(busca?: string): void{
    if( busca.length === 0){
      this.todosClientes()
    }
    else{
      this.consultaCliente.getClientes().subscribe(
        
      (resposta: any) => {
        let listaFiltrada : Array<any> = []
        for (let cliente of Object.values(resposta)) {
          if (cliente['nomeEmpresarial'].toLowerCase().includes(busca.toLowerCase())){
            listaFiltrada.push(cliente)
          }
        }
        this.listaClientes = listaFiltrada
      }
      );    
    }
  }

  somarServicos(cliente: Cliente): number {
    let total = 0;
    if (cliente.listaServico === undefined ) {
      return total;
    }
    cliente.listaServico.forEach((servico: Servico) => {
      total += servico.valor;
    });
    return total;
  }

  passarId(key: any): void {
    this.clienteKey = key
  }
}
