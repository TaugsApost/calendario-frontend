import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Dia, DiaFilter, Mes } from "./cadastro.model";

@Injectable({
    providedIn: 'root'
})
export class CadastroService {
    private urlDia: string = 'http://localhost:8080/calendario/rest/dia/';
    private urlMes: string = 'http://localhost:8080/calendario/rest/mes/';

    constructor(private http: HttpClient) { }

    listarDias(): Observable<Dia[]> {
        var urlListar: string = this.urlDia + 'listar';
        return this.http.get<Dia[]>(urlListar).pipe(
            map(response => response)
        )
    }

    consultarDias(dia: DiaFilter): Observable<Dia[]> {
        var urlListar: string = this.urlDia + 'consultar';
        return this.http.post<Dia[]>(urlListar, dia);
    }

    listarMeses(): Observable<Mes[]> {
        var urlListar: string = this.urlMes + 'listar';
        return this.http.get<Mes[]>(urlListar).pipe(
            map(response => response)
        )
    }
}