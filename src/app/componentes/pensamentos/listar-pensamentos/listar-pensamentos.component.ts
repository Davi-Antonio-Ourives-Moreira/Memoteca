import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PensamentoComponent } from '../pensamento/pensamento.component';
import { CommonModule } from '@angular/common';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';
import { BotaoCarregarMaisComponent } from "./botao-carregar-mais/botao-carregar-mais.component";
@Component({
  selector: 'app-listar-pensamentos',
  standalone: true,
  imports: [RouterModule, PensamentoComponent, CommonModule, BotaoCarregarMaisComponent, FormsModule],
  templateUrl: './listar-pensamentos.component.html',
  styleUrl: './listar-pensamentos.component.css'
})
export class ListarPensamentosComponent implements OnInit {
  listaPensamentos:Pensamento[] = []

  paginaAtual = 1

  haMaisPensamentos:boolean = true;

  filtro: string = ''

  favorito = false

  listasFavoritos: Pensamento[] = []

  titulo: string = 'Meu Mural'

  constructor (
    private service: PensamentoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.service.listar(this.paginaAtual, this.filtro, this.favorito).subscribe((listaPensamentos) => {
      this.listaPensamentos = listaPensamentos
    });
  }

  carregarMais(){
    this.service.listar(++this.paginaAtual, this.filtro, this.favorito).subscribe(listaPensamentos => {
      this.listaPensamentos.push(...listaPensamentos)
    })
  }

  pesquisarPensamento(){
    this.paginaAtual = 1
    this.haMaisPensamentos = true;

    this.service.listar(this.paginaAtual, this.filtro, this.favorito).subscribe(listaPensamentos => {
      this.listaPensamentos = listaPensamentos
    })
  }

  listasPensamentosFavoritos(){
    this.titulo = 'Meus Favoritos'
    this.paginaAtual = 1
    this.haMaisPensamentos = true;
    this.favorito = true

    this.service.listar(this.paginaAtual, this.filtro, this.favorito).subscribe(listaPensamentosFavoritos => {
      this.listaPensamentos = listaPensamentosFavoritos

      this.listasFavoritos = listaPensamentosFavoritos
    })
  }

  recarregarComponente(){
    this.paginaAtual = 1

    this.filtro = ''

    this.favorito = false

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([this.router.url]);
  }
}
