import { Component, OnInit } from '@angular/core';
import { AutenticacaoService } from 'src/app/_model/autenticacao.service';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css']
})
export class TopoComponent implements OnInit {

  constructor(private autenticacao: AutenticacaoService) { }

  ngOnInit(): void {
  }

  logout(): void{
    this.autenticacao.logout();
  }

}
