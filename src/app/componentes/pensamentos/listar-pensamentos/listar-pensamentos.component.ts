import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PensamentoComponent } from '../pensamento/pensamento.component';
import { CommonModule } from '@angular/common';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';

@Component({
  selector: 'app-listar-pensamentos',
  standalone: true,
  imports: [RouterModule, PensamentoComponent, CommonModule],
  templateUrl: './listar-pensamentos.component.html',
  styleUrl: './listar-pensamentos.component.css'
})
export class ListarPensamentosComponent implements OnInit {
  listaPensamentos:Pensamento[] = []

  constructor (private service: PensamentoService) {}

  ngOnInit(): void {
    this.service.listar().subscribe((listaPensamentos) => {
      this.listaPensamentos = listaPensamentos
    });
  }

}
