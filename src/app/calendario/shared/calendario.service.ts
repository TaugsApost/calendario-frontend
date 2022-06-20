import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Dia, Mes } from "src/app/cadastro/shared/cadastro.model";
import { Usuario } from "src/app/usuario/shared/usuario.model";
import { Calendario } from "./calendario.model";

@Injectable({
    providedIn: 'root'
})
export class CalendarioService {

    private url = 'http://localhost:8080/calendario/rest/calendario/';
    private urlDia: string = 'http://localhost:8080/calendario/rest/dia/';
    private urlMes: string = 'http://localhost:8080/calendario/rest/mes/';

    constructor(private http: HttpClient) { }

    listarCalendario(): Observable<Calendario[]> {
        var urlListar: string = this.url + 'listar';
        return this.http.get<Calendario[]>(urlListar).pipe(
            map(response => response)
        )
    }

    listarCalendarios(user: Usuario): Observable<Calendario[]> {
        var urlListar: string = this.url + 'listarTodos';
        return this.http.post<Calendario[]>(urlListar, user).pipe(
            map(response => response)
        )
    }

    salvarCalendario(calendario: Calendario): Observable<Calendario> {
        var urlSalvar: string = this.url + 'salvar';
        return this.http.post<Calendario>(urlSalvar, calendario).pipe(
            map(response => response)
        );
    }

    listarDias(): Observable<Dia[]> {
        var urlListar: string = this.urlDia + 'listar';
        return this.http.get<Dia[]>(urlListar).pipe(
            map(response => response)
        )
    }

    listarMeses(): Observable<Mes[]> {
        var urlListar: string = this.urlMes + 'listar';
        return this.http.get<Mes[]>(urlListar).pipe(
            map(response => response)
        )
    }

    detalharCalendario(id: number): Observable<Calendario> {
        var urlDetalhar: string = this.url + 'detalhar';
        return this.http.get<Calendario>(`${urlDetalhar}/${id}`).pipe(
            map(reponse => reponse)
        );
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

}