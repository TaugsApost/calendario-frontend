import { Dia, Mes } from "src/app/cadastro/shared/cadastro.model";

export class Calendario {
    id = null;
    configuracao: ConfiguracaoCalendario = new ConfiguracaoCalendario();
    datas: Data[] = [];
    idUsuario = 0;
    nomeUsuario = '';
}

export class ConfiguracaoCalendario {
    id = null;
    dias: VinculoDiaData[] = [];
    meses: VinculoMesData[] = [];
    anoInicial = 0;
    anoFinal = 0;
    bissexto = false;
    privado = false;
    nome = '';
}

export class VinculoMesData {
    id = null;
    mes: Mes = new Mes();
    posicao = 0;
    numDias = 0;
    bissexto = false;
}

export class Data {
    id = null;
    dia: VinculoDiaData = new VinculoDiaData();
    mes: VinculoMesData = new VinculoMesData();
    ano: any = null;
    posicaoMes = 0;
    posicaoAno = 0;
    idCalendario = 0;
}

export class VinculoDiaData {
    id = null
    dia: Dia = new Dia();
    posicao = 0;
    diaInicialCalendario = false;
}

export class Ano {
    id = null;
    posicao = 0;
    numMeses = 0;
    numDias = 0;
    bissexto = false;
    nome = null;
}