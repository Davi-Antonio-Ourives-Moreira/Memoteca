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
  imports: [RouterModule, PensamentoComponent, CommonModule, BotaoCarregarMaisComponent],
  templateUrl: './listar-pensamentos.component.html',
  styleUrl: './listar-pensamentos.component.css'
})
export class ListarPensamentosComponent implements OnInit {
  listaPensamentos:Pensamento[] = []

  paginaAtual = 1

  haMaisPensamentos:boolean = true;

  constructor (private service: PensamentoService) {}

  ngOnInit(): void {
    this.service.listar(this.paginaAtual).subscribe((listaPensamentos) => {
      this.listaPensamentos = listaPensamentos

      if (this.listaPensamentos.length < 6){
        this.haMaisPensamentos = false
      }
    });
  }

  carregarMais(){
    this.service.listar(++this.paginaAtual).subscribe(listaPensamentos => {
      this.listaPensamentos.push(...listaPensamentos)

      if (!this.listaPensamentos.length){
        this.haMaisPensamentos = false;
      }

    })
  }

}
