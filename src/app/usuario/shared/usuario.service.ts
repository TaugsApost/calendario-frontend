import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from "rxjs";
import { Usuario } from './usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url: string = 'http://localhost:8080/calendario/rest/usuario/';

  constructor(private http: HttpClient) { }

  salvar(user: Usuario): Observable<Usuario> {
    let urlSalvar: string = this.url + 'salvar';
    return this.http.post<Usuario>(urlSalvar, user).pipe(
      map(response => response)
    );
  }

  deletar() {

  }

  buscar(): Observable<Usuario> {
    let urlDetalhar: string = this.url + 'detalhar';
    let id: number = (localStorage.getItem('id_usuario') as unknown) as number;
    return this.http.get<Usuario>(`${urlDetalhar}/${id}`).pipe(
      map(reponse => reponse)
    );
  }

  listarUsuarios(): Observable<Usuario[]> {
    var urlListar: string = this.url + 'listar';
    return this.http.get<Usuario[]>(urlListar).pipe(
      map(response => response)
    )
  }

  excluirUsuario(id: number): Observable<any> {
    var urlExcluir: string = this.url + 'excluir';
    return this.http.delete(`${urlExcluir}/${id}`, { responseType: 'text' });
  }

}
