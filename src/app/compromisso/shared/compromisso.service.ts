import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from 'src/app/calendario/shared/calendario.model';
import { map, Observable } from 'rxjs';
import { Usuario } from 'src/app/usuario/shared/usuario.model';
import { Compromisso, CompromissoFilter, DataFilter } from './compromisso.model';

@Injectable({
  providedIn: 'root'
})
export class CompromissoService {

  private url: string = 'http://localhost:8080/calendario/rest/compromisso/';
  private urlData: string = 'http://localhost:8080/calendario/rest/data/';

  constructor(private http: HttpClient) { }

  salvarCompromisso(compromisso: Compromisso): Observable<Compromisso> {
    var urlSalvar: string = this.url + 'salvar';
    return this.http.post<Compromisso>(urlSalvar, compromisso).pipe(
      map(response => response)
    );
  }

  listarCompromissos(user: Usuario): Observable<Compromisso[]> {
    var urlListar: string = this.url + 'listarTodos';
    return this.http.post<Compromisso[]>(urlListar, user).pipe(
      map(response => response)
    )
  }

  consultarCompromisso(compromisso: CompromissoFilter): Observable<Compromisso[]> {
    var urlListar: string = this.url + 'consultar';
    return this.http.post<Compromisso[]>(urlListar, compromisso).pipe(
      map(reponse => reponse)
    );
  }

  buscasDatas(dataFilter: DataFilter): Observable<Data[]> {
    var urlConsultarData: string = this.urlData + 'consultar';
    return this.http.post<Data[]>(urlConsultarData, dataFilter).pipe(
      map(reponse => reponse)
    );
  }

  detalharCompromisso(id: number): Observable<Compromisso> {
    var urlDetalhar: string = this.url + 'detalhar';
    return this.http.get<Compromisso>(`${urlDetalhar}/${id}`).pipe(
      map(reponse => reponse)
    );
  }

  excluirCompromisso(id: number): Observable<any> {
    var urlExcluir: string = this.url + 'excluir';
    return this.http.delete(`${urlExcluir}/${id}`, { responseType: 'text' });
  }
}
