import { Component, OnInit } from '@angular/core';
import { PensamentoService } from '../pensamento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-pensamento',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './editar-pensamento.component.html',
  styleUrl: './editar-pensamento.component.css'
})
export class EditarPensamentoComponent implements OnInit {

  formulario!: FormGroup;

  constructor(
    private router: Router,
    private service: PensamentoService,
    private route: ActivatedRoute,
    private formbuilder: FormBuilder
  ){}

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id')
    this.service.buscarPorId(parseInt(id!)).subscribe((pensamento) => {
      this.formulario = this.formbuilder.group({
        id: [pensamento.id],

        conteudo: [pensamento.conteudo, Validators.compose([
          Validators.required,
          Validators.pattern(/(.|\s)*\S(.|\s)*/),
          Validators.minLength(4)
        ])],

        autoria: [pensamento.autoria, Validators.compose([
          Validators.required,
          Validators.pattern(/(.|\s)*\S(.|\s)*/),
          Validators.minLength(4)
        ])],

        modelo: [pensamento.modelo],

        favoritos: [pensamento.favoritos]
      })
    })
  }

  editarPensamento(){
    this.service.editar(this.formulario.value).subscribe(() => {
      this.router.navigate(['/ListasPensamentos'])
    })
  }

  cancelar(){
    this.router.navigate(['/ListasPensamentos'])
  }

  escolhaClasseBotao(){
    if (this.formulario.valid){
      return 'botao'
    }

    return 'botao__desabilitado'
  }
}
