import { Routes } from '@angular/router';
import { CriarPensamentoComponent } from './componentes/pensamentos/criar-pensamento/criar-pensamento.component';
import { ListarPensamentosComponent } from './componentes/pensamentos/listar-pensamentos/listar-pensamentos.component';
import { ExcluirPensamentoComponent } from './componentes/pensamentos/excluir-pensamento/excluir-pensamento.component';
import { EditarPensamentoComponent } from './componentes/pensamentos/editar-pensamento/editar-pensamento.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'ListasPensamentos',
    pathMatch: 'full'
  },

  {
    path: 'CriarPensamento',
    component: CriarPensamentoComponent
  },

  {
    path: 'ListasPensamentos',
    component: ListarPensamentosComponent
  },

  {
    path: 'pensamentos/excluirPensamento/:id',
    component: ExcluirPensamentoComponent
  },

  {
    path: 'pensamentos/editarPensamento/:id',
    component: EditarPensamentoComponent
  }
];
