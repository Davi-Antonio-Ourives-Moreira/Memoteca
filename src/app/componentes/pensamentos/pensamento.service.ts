import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pensamento } from './pensamento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PensamentoService {

  private readonly API = "http://localhost:3000/pensamentos";

  constructor(private http:HttpClient) {}

  listar(pagina: number, filtro: string, favoritos: boolean): Observable<Pensamento[]>{

    const itensPagina = 6

    let params = new HttpParams()
    .set('_page', pagina)
    .set('_limit', itensPagina)
    .set('q', filtro)

    if (favoritos){
      params = params.set('favoritos', true)
    }

    return this.http.get<Pensamento[]>(this.API, {params: params})
  }

  criar(pensamento: Pensamento): Observable<Pensamento>{
    return this.http.post<Pensamento>(this.API, pensamento)
  }

  excluir(id: number): Observable<Pensamento> {
    const url = `${this.API}/${id}`
    return this.http.delete<Pensamento>(url)
  }

  editar(pensamento: Pensamento): Observable<Pensamento>{
    const url = `${this.API}/${pensamento.id}`

    return this.http.put<Pensamento>(url, pensamento)
  }

  mudarFavorito(pensamento: Pensamento): Observable<Pensamento> {
    pensamento.favoritos = !pensamento.favoritos

    return this.editar(pensamento)
  }

  buscarPorId(id: number): Observable<Pensamento> {
    const url = `${this.API}/${id}`
    return this.http.get<Pensamento>(url)
  }
}
