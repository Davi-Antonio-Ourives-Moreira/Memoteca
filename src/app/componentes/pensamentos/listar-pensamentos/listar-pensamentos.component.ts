import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
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

  filtroExistente!: boolean;

  constructor (private service: PensamentoService) {}

  ngOnInit(): void {
    this.service.listar(this.paginaAtual, this.filtro).subscribe((listaPensamentos) => {
      this.listaPensamentos = listaPensamentos

      if (this.listaPensamentos.length < 6){
        this.haMaisPensamentos = false
      }
    });
  }

  carregarMais(){
    this.service.listar(++this.paginaAtual, this.filtro).subscribe(listaPensamentos => {
      this.listaPensamentos.push(...listaPensamentos)

      if (!this.listaPensamentos.length){
        this.haMaisPensamentos = false;
      }
    })
  }

  pesquisarPensamento(){
    this.paginaAtual = 1
    this.haMaisPensamentos = true;

    this.service.listar(this.paginaAtual, this.filtro).subscribe(listaPensamentos => {
      this.listaPensamentos = listaPensamentos

      this.filtroExistente = true

      if (listaPensamentos.length == 0){
        this.filtroExistente = false
      }
    })
  }
}
