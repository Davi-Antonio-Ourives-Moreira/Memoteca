import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pensamento',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pensamento.component.html',
  styleUrl: './pensamento.component.css'
})
export class PensamentoComponent implements OnInit {
  @Input() pensamento: Pensamento = {

    conteudo: '',
    autoria: '',
    modelo: ''

  }

  constructor () {}

  ngOnInit(): void {

  }

  larguraCardPensamento(): string {
    if (this.pensamento.conteudo.length >= 256){
      return 'pensamento-g';
    }

    return 'pensamento-p';
  }
}
