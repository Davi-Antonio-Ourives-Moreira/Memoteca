import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { RouterModule } from '@angular/router';
import { PensamentoService } from '../pensamento.service';

@Component({
  selector: 'app-pensamento',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pensamento.component.html',
  styleUrl: './pensamento.component.css'
})
export class PensamentoComponent implements OnInit {
  @Input() pensamento: Pensamento = {
    id: 0,
    conteudo: '',
    autoria: '',
    modelo: '',
    favoritos: false

  }

  @Input() listasFavoritos: Pensamento[] = []

  constructor (private service: PensamentoService) {}

  ngOnInit(): void {

  }

  larguraCardPensamento(): string {
    if (this.pensamento.conteudo.length >= 256 || this.pensamento.autoria.length >= 256){
      return 'pensamento-g';
    }

    return 'pensamento-p';
  }

  verificarIconeFavorito(): string{
    if (this.pensamento.favoritos == false){
      return 'inativo'
    }

    return 'ativo'
  }

  atualizarFavoritos(){
    this.service.mudarFavorito(this.pensamento).subscribe(() => {
      this.listasFavoritos.splice(this.listasFavoritos.indexOf(this.pensamento), 1)
    })
  }
}
