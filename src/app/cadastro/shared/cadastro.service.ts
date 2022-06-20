import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { AppComponent } from "src/app/app.component";
import { LoginService } from "src/app/estrutura/login/login.service";
import { Usuario, UsuarioFilter } from "src/app/usuario/shared/usuario.model";
import { Dia, DiaFilter, Mes, MesFilter } from "./cadastro.model";

@Injectable({
    providedIn: 'root'
})
export class CadastroService {
    private urlDia: string = 'http://localhost:8080/calendario/rest/dia/';
    private urlMes: string = 'http://localhost:8080/calendario/rest/mes/';

    constructor(private http: HttpClient, private loginService: LoginService) { }

    listarDias(): Observable<Dia[]> {
        var urlListar: string = this.urlDia + 'listar';
        return this.http.get<Dia[]>(urlListar).pipe(
            map(response => response)
        )
    }

    consultarDias(dia: DiaFilter): Observable<Dia[]> {
        var urlListar: string = this.urlDia + 'consultar';
        return this.http.post<Dia[]>(urlListar, dia).pipe(
            map(reponse => reponse)
        );
    }

    listarMeses(): Observable<Mes[]> {
        var urlListar: string = this.urlMes + 'listar';
        return this.http.get<Mes[]>(urlListar).pipe(
            map(response => response)
        )
    }

    listarTodosDia(user: Usuario): Observable<Dia[]> {
        var urlListar: string = this.urlDia + 'listarTodos';
        return this.http.post<Dia[]>(urlListar, user).pipe(
            map(response => response)
        )
    }

    listarTodosMes(user: Usuario): Observable<Mes[]> {
        var urlListar: string = this.urlMes + 'listarTodos';
        return this.http.post<Mes[]>(urlListar, user).pipe(
            map(response => response)
        )
    }

    consultarMeses(mes: MesFilter): Observable<Dia[]> {
        var urlListar: string = this.urlMes + 'consultar';
        return this.http.post<Dia[]>(urlListar, mes);
    }

    detalharDia(id: number): Observable<Dia> {
        var urlDetalhar: string = this.urlDia + 'detalhar';
        return this.http.get<Dia>(`${urlDetalhar}/${id}`).pipe(
            map(reponse => reponse)
        );
    }
    detalharMes(id: number): Observable<Mes> {
        var urlDetalhar: string = this.urlMes + 'detalhar';
        return this.http.get<Mes>(`${urlDetalhar}/${id}`).pipe(
            map(reponse => reponse)
        );
    }

    salvarDia(dia: Dia): Observable<Dia> {
        var urlSalvar: string = this.urlDia + 'salvar';
        return this.http.post<Dia>(urlSalvar, dia).pipe(
            map(reponse => reponse)
        );
    }

    saveDia(dia: Dia, user: Usuario): Observable<Dia> {
        var urlSalvar: string = this.urlDia + 'save';
        return this.http.post<Dia>(urlSalvar, dia).pipe(
            map(reponse => reponse)
        );
    }

    excluirDia(id: number): Observable<any> {
        var urlExcluir: string = this.urlDia + 'excluir';
        return this.http.delete(`${urlExcluir}/${id}`, { responseType: 'text' });
    }

    salvarMes(mes: Mes): Observable<Mes> {
        var urlSalvar: string = this.urlMes + 'salvar';
        return this.http.post<Dia>(urlSalvar, mes).pipe(
            map(reponse => reponse)
        );
    }

    excluirMes(id: number): Observable<any> {
        var urlExcluir: string = this.urlMes + 'excluir';
        return this.http.delete(`${urlExcluir}/${id}`, { responseType: 'text' });
    }
}