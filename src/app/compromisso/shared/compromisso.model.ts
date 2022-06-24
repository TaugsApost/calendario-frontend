import { Data } from "src/app/calendario/shared/calendario.model";

export class Compromisso {
    id = null;
    titulo = '';
    descricao = '';
    data: Data = new Data;
    horario: Horario = new Horario;
    idUsuario = null;
}

export class CompromissoFilter {
    titulo = '';
    descricao = '';
    data: Data = new Data;
    hora = 0;
    minutos = 0;
    idUsuario = null;
}

export class Horario {
    id = null;
    hora = 0;
    minutos = 0;
}

export class DataFilter {
    mes = null;
    nomeAno = null;
    calendario = null;
}