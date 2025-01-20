import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';

@Component({
  selector: 'app-criar-pensamento',
  standalone: true,
  imports: [FormsModule, RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './criar-pensamento.component.html',
  styleUrl: './criar-pensamento.component.css'
})
export class CriarPensamentoComponent implements OnInit {
  gerarID = parseInt(Math.random().toString().substr(2, 9), 10);

  formulario!: FormGroup

  constructor(
    private service: PensamentoService,
    private router: Router,
    private formBuilder: FormBuilder
  ){}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      id: this.gerarID,
      conteudo: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/(.|\s)*\S(.|\s)*/),
        Validators.minLength(4)
      ])],
      autoria: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/(.|\s)*\S(.|\s)*/),
        Validators.minLength(4)

      ])],
      modelo: ['modelo1'],
      favoritos: [false]
    })
  }

  criarPensamento(){
    if (this.formulario.valid){
      this.service.criar(this.formulario.value).subscribe(() => {
        this.router.navigate(['/ListasPensamentos'])
      })
    }
  }

  cancelarPensamento(){
    this.router.navigate(['/ListasPensamentos'])
  }

  escolhaClasseBotao(){
    if (this.formulario.valid){
      return 'botao'
    }

    return 'botao__desabilitado'
  }
}
