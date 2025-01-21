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

  parametroTotal = ''

  constructor (
    private service: PensamentoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.service.listar(this.paginaAtual, this.filtro, this.favorito).subscribe((listaPensamentos) => {
      this.listaPensamentos = listaPensamentos
    });

    this.service.totalPensamento(this.parametroTotal, this.filtro).subscribe(total =>{

      if (total <= 6){
        this.haMaisPensamentos = false
      }
    })
  }

  carregarMais(){
    this.service.listar(++this.paginaAtual, this.filtro, this.favorito).subscribe(listaPensamentos => {
      this.listaPensamentos.push(...listaPensamentos)

      this.service.totalPensamento(this.parametroTotal, this.filtro).subscribe(total =>{
        if (this.listaPensamentos.length == total){
          this.haMaisPensamentos = false
        }
      })
    })
  }

  pesquisarPensamento(){
    this.paginaAtual = 1
    this.haMaisPensamentos = true;
    this.parametroTotal = 'q'

    this.service.listar(this.paginaAtual, this.filtro, this.favorito).subscribe(listaPensamentos => {
      this.listaPensamentos = listaPensamentos

      this.service.totalPensamento(this.parametroTotal, this.filtro).subscribe(total =>{

        if (this.listaPensamentos.length == total || total <= 6){
          this.haMaisPensamentos = false
        }
      })
    })
  }

  listasPensamentosFavoritos(){
    this.titulo = 'Meus Favoritos'
    this.paginaAtual = 1
    this.haMaisPensamentos = true;
    this.favorito = true
    this.parametroTotal = 'favoritos'

    this.service.listar(this.paginaAtual, this.filtro, this.favorito).subscribe(listaPensamentosFavoritos => {
      this.listaPensamentos = listaPensamentosFavoritos

      this.listasFavoritos = listaPensamentosFavoritos

      this.service.totalPensamento(this.parametroTotal, this.filtro).subscribe(total =>{

        if (this.listaPensamentos.length == total || total <= 6){
          this.haMaisPensamentos = false
        }
      })
    })
  }

  recarregarComponente(){
    this.paginaAtual = 1

    this.filtro = ''

    this.favorito = false

    this.parametroTotal = ''

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([this.router.url]);
  }
}
