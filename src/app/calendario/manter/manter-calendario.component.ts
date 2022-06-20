import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { Dia, Mes } from 'src/app/cadastro/shared/cadastro.model';
import { LoginService } from 'src/app/estrutura/login/login.service';
import { Usuario, UsuarioFilter } from 'src/app/usuario/shared/usuario.model';
import { ConfiguracaoCalendario, VinculoDiaData, VinculoMesData } from '../shared/calendario.model';
import { CalendarioService } from '../shared/calendario.service';

@Component({
  selector: 'app-manter-calendario',
  templateUrl: './manter-calendario.component.html',
  styleUrls: ['./manter-calendario.component.scss'],
  providers: [MessageService]
})
export class ManterCalendarioComponent implements OnInit {

  formSalvar: FormGroup;
  listaDiaData: VinculoDiaData[] = [];
  listaMesData: VinculoMesData[] = [];

  indexTab: number = 0;

  listaDias: SelectItem[] = [];
  listaMeses: SelectItem[] = [];

  listaDiasTabela: Dia[] = [];
  listaMesesTabela: Mes[] = [];

  colDias: any[] = [];
  colMeses: any[] = [];

  listaAnos: SelectItem[] = [];
  listaPosicaoDia: SelectItem[] = [];
  listaPosicaoMes: SelectItem[] = [];

  step2: boolean = true;

  diaSelecionado: any;
  mesSelecionado: any;
  mesDataSelecionado: any;
  diaDataSelecionado: any;
  idUser: number = 0;

  constructor(private service: CalendarioService, private messageService: MessageService, private rota: Router, private loginService: LoginService) {
    this.formSalvar = new FormGroup({
      configuracao: new FormControl(null),
      //Criar Vinculo DiaData
      dia: new FormControl(null),
      posicaoDia: new FormControl(null),
      diaInicialCalendario: new FormControl(false),
      //Criar Vinculo MesData
      mes: new FormControl(null),
      posicaoMes: new FormControl(null),
      numDias: new FormControl(0),
      mesBissexto: new FormControl(false),
      //Configuracao
      anoInicial: new FormControl(1800),
      anoFinal: new FormControl(1800),
      bissexto: new FormControl(false),
      idUsuario: new FormControl()
    });
  }

  ngOnInit(): void {
    this.criarListas();
    this.criarColunas();
  }

  private criarColunas() {
    this.criarColunasDias();
    this.criarColunasMeses();
  }

  private criarColunasDias() {
    this.colDias = [
      { nome: 'Nome', value: 'nome' },
      { nome: 'Sigla', value: 'sigla' },
      { value: 'actions', size: '5%' }
    ];
  }

  private criarColunasMeses() {
    this.colMeses = [
      { nome: 'Nome', value: 'nome' },
      { nome: 'Sigla', value: 'sigla' },
      { value: 'actions', size: '5%' }
    ];
  }

  private criarListas() {
    let user: UsuarioFilter = new UsuarioFilter();
    user.userName = localStorage.getItem('usuario') as string;
    this.loginService.consultarPorUserName(user).subscribe(
      data => {
        this.idUser = data.id;
        this.criarListaDias(data);
        this.criarListaMeses(data);
      }
    );

    this.criarListaAnos();
  }

  private criarListaDias(user: Usuario) {
    this.service.listarTodosDia(user).subscribe(data => {
      data.forEach(dia => {
        this.listaDias.push(
          {
            label: dia.nome,
            value: dia
          }
        );
      });
    });
  }

  private criarListaMeses(user: Usuario) {
    this.service.listarTodosMes(user).subscribe(data => {
      data.forEach(mes => {
        this.listaMeses.push(
          {
            label: mes.nome,
            value: mes
          }
        );
      });
    });
  }

  private criarListaAnos() {
    for (let i: number = 1800; i <= 2022; i++) {
      this.listaAnos.push(
        {
          label: i.toString(),
          value: i

        }
      );
    }
  }

  private criarListaPosicaoDia() {
    for (let i = 1; i <= this.listaDiasTabela.length; i++) {
      this.listaPosicaoDia.push(
        {
          label: i.toString(),
          value: i
        }
      );
    }
  }

  private criarListaPosicaoMes() {
    for (let i = 1; i <= this.listaMesesTabela.length; i++) {
      this.listaPosicaoMes.push(
        {
          label: i.toString(),
          value: i
        }
      );
    }
  }

  adicionarDiaTabela() {
    if (this.formSalvar.controls['dia'].value != null) {
      if (this.listaDiasTabela.filter(d => d == this.formSalvar.controls['dia'].value).length == 0) {
        this.listaDiasTabela = this.listaDiasTabela.concat(this.formSalvar.controls['dia'].value);
        this.formSalvar.controls['dia'].reset();
      } else {
        this.adicionarMensagem('error', 'Erro', 'Dia já adicionado');
      }
    } else {
      this.adicionarMensagem('error', 'Erro', 'Nenhum dia foi selecionado');
    }
  }

  adicionarMesTabela() {
    if (this.formSalvar.controls['mes'].value != null) {
      if (this.listaMesesTabela.filter(m => m == this.formSalvar.controls['mes'].value).length == 0) {
        this.listaMesesTabela = this.listaMesesTabela.concat(this.formSalvar.controls['mes'].value);
        this.formSalvar.controls['mes'].reset();
      } else {
        this.adicionarMensagem('error', 'Erro', 'Mes já adicionado');
      }
    } else {
      this.adicionarMensagem('error', 'Erro', 'Nenhum mes foi selecionado');
    }
  }

  proximoPasso() {
    if (this.listaDiasTabela.length > 0 && this.listaMesesTabela.length > 0) {
      this.step2 = false;
      this.indexTab = 1;
      this.criarListaPosicaoDia();
      this.criarListaPosicaoMes();
    } else {
      this.adicionarMensagem('error', 'Erro', 'Preencha os dias e meses corretamente');
    }

  }

  mudouDeAba(e: any) {
    this.indexTab = e.index;
    if (this.indexTab == 0) {
      this.step2 = true;
      this.listaDiaData.forEach(d => {
        this.listaDiasTabela = this.listaDiasTabela.concat(d.dia);
      });
      this.listaMesData.forEach(m => {
        this.listaMesesTabela = this.listaMesesTabela.concat(m.mes);
      });
      this.listaDiaData = [];
      this.listaMesData = [];
      this.listaPosicaoDia = [];
      this.listaPosicaoMes = [];
    }
  }

  adicionarDiaData() {
    if (this.diaSelecionado != null) {
      if (this.formSalvar.controls['posicaoDia'].value != null) {
        if (this.formSalvar.controls['diaInicialCalendario'].value == true
          && this.listaDiaData.filter(dt => dt.diaInicialCalendario == true).length > 0) {
          this.adicionarMensagem('error', 'Erro', 'Dia inicial ja foi escolhido');
        } else {
          let dia: Dia = this.diaSelecionado as Dia;
          let diaData: VinculoDiaData = new VinculoDiaData;
          diaData.dia = dia;
          diaData.posicao = this.formSalvar.controls['posicaoDia'].value;
          diaData.diaInicialCalendario = this.formSalvar.controls['diaInicialCalendario'].value;
          this.listaDiaData = this.listaDiaData.concat(diaData);
          this.listaDiasTabela = this.listaDiasTabela.filter(d => d != this.diaSelecionado);
          this.listaPosicaoDia = this.listaPosicaoDia.filter(l => l.value != diaData.posicao);
          this.diaSelecionado = null;
        }
      } else {
        this.adicionarMensagem('error', 'Erro', 'Selecione a posicao do dia');
      }
    } else {
      this.adicionarMensagem('error', 'Erro', 'Nenhum dia selecionado');
    }
  }

  adicionarMesData() {
    if (this.mesSelecionado != null) {
      if (this.formSalvar.controls['posicaoMes'].value != null) {
        if (this.formSalvar.controls['numDias'].value > 0) {
          if (this.formSalvar.controls['mesBissexto'].value == true
            && this.listaMesData.filter(mt => mt.bissexto == true).length > 0) {
            this.adicionarMensagem('error', 'Erro', 'Mes bissexto ja foi escolhido');
          }
          let mes: Mes = this.mesSelecionado as Mes;
          let mesData: VinculoMesData = new VinculoMesData;
          mesData.mes = mes;
          mesData.posicao = this.formSalvar.controls['posicaoMes'].value;
          mesData.numDias = this.formSalvar.controls['numDias'].value;
          mesData.bissexto = this.formSalvar.controls['mesBissexto'].value;
          this.listaMesData = this.listaMesData.concat(mesData);
          this.listaMesesTabela = this.listaMesesTabela.filter(m => m != this.mesSelecionado);
          this.listaPosicaoMes = this.listaPosicaoMes.filter(l => l.value != mesData.posicao);
          this.mesSelecionado = null;
          this.formSalvar.controls['numDias'].setValue(0);
        } else {
          this.adicionarMensagem('error', 'Erro', 'O numero de dias no mes precisa ser maior que 0');
        }
      } else {
        this.adicionarMensagem('error', 'Erro', 'Selecione a posicao do mes');
      }
    } else {
      this.adicionarMensagem('error', 'Erro', 'Nenhum mes selecionado');
    }
  }

  criarCalendario() {
    if (this.formSalvar.controls['anoInicial'].value != null && this.formSalvar.controls['anoFinal'].value != null
      && this.listaDiasTabela.length == 0 && this.listaMesesTabela.length == 0) {
      let config: ConfiguracaoCalendario = new ConfiguracaoCalendario;
      config.anoInicial = this.formSalvar.controls['anoInicial'].value;
      config.anoFinal = this.formSalvar.controls['anoFinal'].value;
      config.bissexto = this.formSalvar.controls['bissexto'].value;
      config.dias = this.listaDiaData;
      config.meses = this.listaMesData;
      this.formSalvar.controls['configuracao'].setValue(config);
      this.formSalvar.controls['idUsuario'].setValue(this.idUser);
      console.log(config);
      this.service.salvarCalendario(this.formSalvar.getRawValue()).subscribe(
        data => {
          this.rota.navigateByUrl('calendario/listar');
        }
      );
    } else {
      this.adicionarMensagem('error', 'Erro', 'Preencha os dados dos meses, dias e ano corretamento');
    }
  }

  private adicionarMensagem(icone: string, titulo: string, texto: string) {
    this.messageService.add({ severity: icone, summary: titulo, detail: texto });
  }

}
