import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Mes } from 'src/app/cadastro/shared/cadastro.model';
import { Ano, Calendario, Data, VinculoDiaData, VinculoMesData } from '../shared/calendario.model';
import { CalendarioService } from '../shared/calendario.service';

@Component({
  selector: 'app-visualizar-calendario',
  templateUrl: './visualizar-calendario.component.html',
  styleUrls: ['./visualizar-calendario.component.scss']
})
export class VisualizarCalendarioComponent implements OnInit {

  viewForm: FormGroup;
  colunas: number = 0;
  linhas: number = 0;

  private numMeses: number = 0;
  private numAnos: number = 0;
  private posicaoAno: number = 1;
  private posicaoMes: number = 1;

  ano: Ano = new Ano();
  mes: VinculoMesData = new VinculoMesData();

  dias: VinculoDiaData[] = [];

  private listaDatas: Data[] = [];

  arrayDatas: Array<Data[]> = new Array;

  constructor(private service: CalendarioService, private rota: Router, private _activatedRoute: ActivatedRoute) {
    this.viewForm = new FormGroup({
      id: new FormControl(),
      datas: new FormControl(),
      configuracao: new FormControl()
    });
  }

  ngOnInit(): void {
    const isIdPresent = this._activatedRoute.snapshot.paramMap.has('id');
    if (isIdPresent) {
      const id = this._activatedRoute.snapshot.paramMap.get('id') as any;
      this.service.detalharCalendario(id).subscribe(
        data => {
          this.viewForm.patchValue(data),
            this.afterLoadRecord(data)
        }
      )
    }
  }

  afterLoadRecord(record: Calendario) {
    this.ano = record.datas[0].ano;
    this.mes = record.datas[0].mes;
    this.colunas = record.configuracao.dias.length;
    this.numMeses = record.configuracao.meses.length;
    this.numAnos = record.configuracao.anoFinal - record.configuracao.anoInicial + 1;
    this.dias = record.configuracao.dias;
    this.criarListaDatas();
  }

  criarListaDatas() {
    ((this.viewForm.controls['datas'].value) as Data[]).forEach(d => {
      if (d.ano.posicao === this.posicaoAno && d.mes.posicao == this.posicaoMes) {
        this.listaDatas.push(d);
      }
    });
    this.criarDatasEnfeite();
    this.criarArrayListDias();
  }

  private criarDatasEnfeite() {
    let nDias: number = this.viewForm.controls['configuracao'].value.dias.length;
    let num: number = nDias - this.listaDatas[this.listaDatas.length - 1].dia.posicao;
    let num2: number = this.listaDatas[0].dia.posicao - 1;
    for (let i = 0; i < num; i++) {
      this.listaDatas.push(new Data());
    }
    for (let i = 0; i < num2; i++) {
      this.listaDatas.unshift(new Data());
    }
    this.linhas = Math.trunc(this.listaDatas.length / nDias) + (this.listaDatas.length % nDias == 0 ? 0 : 1);
  }

  private criarArrayListDias() {
    for (let l = 0; l < this.linhas; l++) {
      let lista: Data[] = [];
      for (let c = 0; c < this.colunas; c++) {
        lista.push(this.listaDatas[(l * this.colunas) + c]);
      }
      this.arrayDatas.push(lista);
    }
  }

  private limparLista() {
    this.arrayDatas = new Array;
    this.listaDatas = [];
  }

  avancarAno() {
    this.limparLista();
    this.posicaoAno++;
    this.posicaoMes = 1;
    if (this.posicaoAno > this.numAnos) {
      this.posicaoAno = 1;
    }
    this.mes = this.viewForm.controls['configuracao'].value.meses[this.posicaoMes - 1];
    this.criarListaDatas();
    this.ano = this.buscarAno();
  }

  avancarMes() {
    this.limparLista();
    this.posicaoMes = this.posicaoMes + 1;
    if (this.posicaoMes > this.numMeses) {
      this.posicaoMes = 1;
    }
    this.mes = this.viewForm.controls['configuracao'].value.meses[this.posicaoMes - 1];
    this.criarListaDatas();
  }

  voltarMes() {
    this.limparLista();
    this.posicaoMes = this.posicaoMes - 1;
    if (this.posicaoMes == 0) {
      this.posicaoMes = 1;
    }
    this.mes = this.viewForm.controls['configuracao'].value.meses[this.posicaoMes - 1];
    this.criarListaDatas();
  }

  voltarAno() {
    this.limparLista();
    this.posicaoAno--;
    this.posicaoMes = 1;
    if (this.posicaoAno == 0) {
      this.posicaoAno = 1;

    }
    this.mes = this.viewForm.controls['configuracao'].value.meses[this.posicaoMes - 1];
    this.criarListaDatas();
    this.ano = this.buscarAno();
  }

  private buscarAno(): Ano {
    let ano = new Ano;
    ((this.viewForm.controls['datas'].value) as Data[]).forEach(d => {
      if (d.ano.posicao == this.posicaoAno) {
        ano = d.ano;
      }
    });
    return ano;
  }
}
