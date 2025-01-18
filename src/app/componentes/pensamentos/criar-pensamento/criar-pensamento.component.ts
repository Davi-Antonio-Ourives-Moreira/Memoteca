import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';

@Component({
  selector: 'app-criar-pensamento',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './criar-pensamento.component.html',
  styleUrl: './criar-pensamento.component.css'
})
export class CriarPensamentoComponent implements OnInit {
  gerarID = parseInt(Math.random().toString().substr(2, 9), 10);
  pensamentos: Pensamento = {
    id: this.gerarID,
    conteudo: '',
    autoria: '',
    modelo: ''
  }


  constructor(
    private service: PensamentoService,
    private router: Router
  ){}

  ngOnInit(): void {

  }

  criarPensamento(){
    this.service.criar(this.pensamentos).subscribe(() => {
      this.router.navigate(['/ListasPensamentos'])
    })
  }

  cancelarPensamento(){
    this.router.navigate(['/ListasPensamentos'])
  }
}
