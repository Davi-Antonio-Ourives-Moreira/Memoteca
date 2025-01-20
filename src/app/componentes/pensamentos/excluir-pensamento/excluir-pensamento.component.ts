import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PensamentoService } from '../pensamento.service';
import { Pensamento } from '../pensamento';

@Component({
  selector: 'app-excluir-pensamento',
  standalone: true,
  imports: [],
  templateUrl: './excluir-pensamento.component.html',
  styleUrl: './excluir-pensamento.component.css'
})
export class ExcluirPensamentoComponent implements OnInit {
  pensamento: Pensamento = {
    id: 0,
    conteudo: '',
    autoria: '',
    modelo: '',
    favoritos: false
  }
  constructor(
    private router: Router,
    private service: PensamentoService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.service.buscarPorId(parseInt(id!)).subscribe((pensamento) => {
        this.pensamento = pensamento
    })
  }

  excluirPensamento(){
    this.service.excluir(this.pensamento.id!).subscribe(() =>{
      this.router.navigate(['/ListasPensamentos'])
    })
  }

  cancelar(){
    this.router.navigate(['/ListasPensamentos'])
  }
}
