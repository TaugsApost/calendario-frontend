import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Usuario, UsuarioFilter } from "src/app/usuario/shared/usuario.model";
import { map, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private urlCadastro: string = 'http://localhost:8080/calendario/rest/usuario/';

  constructor(private http: HttpClient) { }

  consultarPorUserName(userFilter: UsuarioFilter): Observable<Usuario> {
    let url: string = this.urlCadastro + 'buscarPorUserName';
    return this.http.post<Usuario>(url, userFilter).pipe(
      map(reponse => reponse)
    );
  }

  logar(user: Usuario, senha: string): boolean {
    if (user == null) {
      return false;
    }
    if (user.senha === senha) {
      window.localStorage.setItem('usuario', user.userName);
      window.localStorage.setItem('id_usuario', user.id.toString());
      return true;
    } else {
      return false;
    }
  }

  logado(): boolean {
    let token = localStorage.getItem('usuario');
    if (token) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    localStorage.removeItem('usuario');
    localStorage.removeItem('id_usuario');
  }

}