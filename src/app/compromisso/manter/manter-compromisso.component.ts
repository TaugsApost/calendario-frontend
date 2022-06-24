import { coerceCssPixelValue } from '@angular/cdk/coercion';
import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { Calendario, ConfiguracaoCalendario, Data } from 'src/app/calendario/shared/calendario.model';
import { CalendarioService } from 'src/app/calendario/shared/calendario.service';
import { Compromisso } from '../shared/compromisso.model';
import { CompromissoService } from '../shared/compromisso.service';

@Component({
  selector: 'app-manter-compromisso',
  templateUrl: './manter-compromisso.component.html',
  styleUrls: ['./manter-compromisso.component.scss']
})
export class ManterCompromissoComponent implements OnInit {

  formSalvar: FormGroup;
  listaCalendarios: SelectItem[] = [];
  listaAnos: SelectItem[] = [];
  listaMeses: SelectItem[] = [];
  listaDatas: SelectItem[] = [];
  listaHoras: SelectItem[] = [];
  listaMinutos: SelectItem[] = [];

  constructor(private router: Router, private service: CompromissoService, private calendarioService: CalendarioService,
    private messageService: MessageService, private _activatedRoute: ActivatedRoute) {
    this.formSalvar = new FormGroup({
      id: new FormControl(0),
      titulo: new FormControl('', Validators.required),
      descricao: new FormControl('', Validators.required),
      horario: new FormGroup({
        hora: new FormControl(1, Validators.required),
        minutos: new FormControl(1, Validators.required)
      }),
      data: new FormControl(null, Validators.required),
      idUsuario: new FormControl(this.definirIdUser(), Validators.required),
      //
      dataFilter: new FormGroup({
        calendario: new FormControl(null),
        nomeAno: new FormControl(null),
        mes: new FormControl(null),
      }),
    });
  }

  private definirIdUser(): number {
    let idUser: number = (localStorage.getItem('id_usuario') as unknown) as number;
    return idUser;
  }

  ngOnInit(): void {
    this.criarListas();
    this.carregarRegistro();
  }

  carregarRegistro() {
    const isIdPresent = this._activatedRoute.snapshot.paramMap.has('id');
    if (isIdPresent) {
      const id = this._activatedRoute.snapshot.paramMap.get('id') as any;
      this.service.detalharCompromisso(id).subscribe(
        data => {
          this.formSalvar.patchValue(data);
          this.afterLoadRegistro(data);
        }
      );
    }
  }

  afterLoadRegistro(compromisso: Compromisso) {
    this.calendarioService.detalharCalendario(compromisso.data.idCalendario).subscribe(
      data => {
        (this.formSalvar.controls['dataFilter'] as FormGroup).controls['calendario'].setValue(data);
        this.gerarListaCaracteristicasData();
        (this.formSalvar.controls['dataFilter'] as FormGroup).controls['mes'].setValue(compromisso.data.mes);
        (this.formSalvar.controls['dataFilter'] as FormGroup).controls['nomeAno'].setValue(compromisso.data.ano.nome);
        this.criarListaDatas(compromisso);
        this.criarListasCalendario(data);
      }
    );
  }

  private afterLoadRegistroData(compromisso: Compromisso) {

  }

  salvar() {
    if (this.formSalvar.valid) {
      this.service.salvarCompromisso(this.formSalvar.getRawValue()).subscribe(
        data => {
          this.formSalvar.patchValue(data);
          this.adicionarMensagem('success', 'Concluído!', 'Compromisso salvo com sucesso!');
          this.router.navigate(['/compromisso']);
        }
      );
    } else {
      this.adicionarMensagem('error', 'Erro', 'Campo obrigatório em branco');
    }
  }

  private criarListas() {
    this.criarListasCalendario();
    this.criarListaHoras();
    this.criarListaMinutos();
  }

  private criarListaHoras() {
    for (let i = 0; i < 24; i++) {
      this.listaHoras.push({
        label: this.retornarNumeroComNDigitos(2, i),
        value: i
      });
    }
  }

  private criarListaMinutos() {
    for (let i = 0; i < 60; i++) {
      this.listaMinutos.push({
        label: this.retornarNumeroComNDigitos(2, i),
        value: i
      });
    }
  }

  private criarListasCalendario(c: Calendario = new Calendario) {
    this.listaCalendarios = [];
    this.calendarioService.listarPorUsuario().subscribe(
      data => {
        if (data != null) {
          if (data.length > 0) {
            data.forEach(calendario => {
              this.listaCalendarios.push(
                {
                  label: calendario.configuracao.nome,
                  value: calendario
                }
              );
            });
            if (c.id != null) {
              (this.formSalvar.controls['dataFilter'] as FormGroup).controls['calendario'].setValue(c);
            }
          }
        }
      }
    );
  }

  gerarListaCaracteristicasData() {
    if ((this.formSalvar.controls['dataFilter'] as FormGroup).controls['calendario'].value != null) {
      let config: ConfiguracaoCalendario = (this.formSalvar.controls['dataFilter'] as FormGroup).controls['calendario'].value.configuracao;
      this.gerarListaAnos(config);
      this.gerarListaMeses(config);
    }
  }

  private gerarListaAnos(config: ConfiguracaoCalendario) {
    this.listaAnos = [];
    for (let i = config.anoInicial; i <= config.anoFinal; i++) {
      this.listaAnos.push(
        {
          label: i.toString(),
          value: i.toString()
        }
      );
    }
  }

  private gerarListaMeses(config: ConfiguracaoCalendario) {
    this.listaMeses = [];
    config.meses.forEach(m => {
      this.listaMeses.push(
        {
          label: m.mes.nome,
          value: m
        }
      );
    });
  }

  criarListaDatas(compromisso: Compromisso = new Compromisso) {
    this.listaDatas = [];
    this.service.buscasDatas((this.formSalvar.controls['dataFilter'] as FormGroup).getRawValue()).subscribe(
      data => {
        data.forEach(d => {
          this.listaDatas.push(
            {
              label: this.labelData(d),
              value: d
            }
          );
        });
        if (compromisso.id != null) {
          this.formSalvar.controls['data'].setValue(compromisso.data);
        }
      }
    );
  }

  labelData(data: Data): string {
    let texto: string = data.posicaoMes.toLocaleString('pt-BR', { minimumIntegerDigits: 2, useGrouping: false })
      + '/' + data.mes.posicao.toLocaleString('pt-BR', { minimumIntegerDigits: 2, useGrouping: false })
      + '/' + data.ano.nome;
    return texto;
  }

  private retornarNumeroComNDigitos(n: number, numero: number): string {
    return numero.toLocaleString('pt-BR', { minimumIntegerDigits: n, useGrouping: false });
  }

  private adicionarMensagem(icone: string, titulo: string, texto: string) {
    this.messageService.add({ severity: icone, summary: titulo, detail: texto, closable: true });
  }
}
