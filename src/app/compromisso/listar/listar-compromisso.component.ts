import { Component, OnInit } from '@angular/core';
import { CompromissoService } from '../shared/compromisso.service';
import { Compromisso } from '../shared/compromisso.model';
import { Usuario } from 'src/app/usuario/shared/usuario.model';
import { FormControl, FormGroup } from '@angular/forms';
import { Calendario, ConfiguracaoCalendario, Data, VinculoMesData } from 'src/app/calendario/shared/calendario.model';
import { CalendarioService } from 'src/app/calendario/shared/calendario.service';
import { ConfirmationService, ConfirmEventType, MessageService, SelectItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-compromisso',
  templateUrl: './listar-compromisso.component.html',
  styleUrls: ['./listar-compromisso.component.scss']
})
export class ListarCompromissoComponent implements OnInit {

  listaCompromissos: Compromisso[] = [];
  listaCalendarios: SelectItem[] = [];
  listaAnos: SelectItem[] = [];
  listaMeses: SelectItem[] = [];
  listaDatas: SelectItem[] = [];
  compromissoExcluir: Compromisso = new Compromisso;
  formPesquisa: FormGroup;
  dataSource: any;
  columns: any[] = [];

  constructor(private service: CompromissoService, private calendarioService: CalendarioService,
    private messageService: MessageService, private rota: Router, private confirmationService: ConfirmationService) {
    this.formPesquisa = new FormGroup({
      titulo: new FormControl(null),
      descricao: new FormControl(null),
      data: new FormControl(null),
      hora: new FormControl(null),
      minutos: new FormControl(null),
      idUsuario: new FormControl(null),
      //
      dataFilter: new FormGroup({
        calendario: new FormControl(null),
        nomeAno: new FormControl(null),
        mes: new FormControl(null),
      }),
    });
  }

  ngOnInit(): void {
    this.definirIdUser();
    this.criarColunas();
    this.criarListas();
  }

  definirIdUser() {
    let idUser: number = (localStorage.getItem('id_usuario') as unknown) as number;
    this.formPesquisa.controls['idUsuario'].setValue(idUser);
  }

  private criarListas() {
    this.criarListasCalendario();
  }

  private criarListasCalendario() {
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
          }
        }
      }
    );
  }

  limpar() {
    this.formPesquisa.reset();
    this.listaMeses = [];
    this.listaAnos = [];
    this.dataSource = [];
    this.definirIdUser();
  }

  private criarColunas() {
    this.columns = [
      { nome: 'Titulo', value: 'titulo', size: '25%' },
      { nome: 'Descrição', value: 'descricao', size: '40%' },
      { nome: 'Dia', value: 'textoData', size: '10%' },
      { nome: 'Horario', align: 'center', value: 'textoHorario', size: '10%' },
      { value: 'actions', align: 'center', size: '100%' }
    ];
  }

  pesquisar() {
    this.service.consultarCompromisso(this.formPesquisa.getRawValue()).subscribe(
      data => {
        this.dataSource = data;
      }
    );
  }

  gerarListaCaracteristicasData() {
    if ((this.formPesquisa.controls['dataFilter'] as FormGroup).controls['calendario'].value != null) {
      let config: ConfiguracaoCalendario = (this.formPesquisa.controls['dataFilter'] as FormGroup).controls['calendario'].value.configuracao;
      this.gerarListaAnos(config);
      this.gerarListaMeses(config);
    }
  }

  private gerarListaAnos(config: ConfiguracaoCalendario) {
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
    config.meses.forEach(m => {
      this.listaMeses.push(
        {
          label: m.mes.nome,
          value: m
        }
      );
    });
  }

  criarListaDatas() {
    this.listaDatas = [];
    this.service.buscasDatas((this.formPesquisa.controls['dataFilter'] as FormGroup).getRawValue()).subscribe(
      data => {
        data.forEach(d => {
          this.listaDatas.push(
            {
              label: this.labelData(d),
              value: d
            }
          );
        });
      }
    );
  }

  teste() {
    this.messageService.add({ severity: 'success', summary: 'Excluir', detail: 'Dia excluido com sucesso!' });
  }

  labelData(data: Data): string {
    let texto: string = data.posicaoMes.toLocaleString('pt-BR', { minimumIntegerDigits: 2, useGrouping: false })
      + '/' + data.mes.posicao.toLocaleString('pt-BR', { minimumIntegerDigits: 2, useGrouping: false })
      + '/' + data.ano.nome;
    return texto;
  }

  editar(compromisso: Compromisso) {
    this.rota.navigateByUrl('/compromisso/novo/' + compromisso.id);
  }

  visualizar(compromisso: Compromisso) {
    this.rota.navigateByUrl('/compromisso/visualizar/' + compromisso.id);
  }

  confirmarExcluir(compromisso: Compromisso) {
    this.confirmationService.confirm({
      message: 'Deseja prosseguir com a operação? Esta ação não poderá ser desfeita',
      header: 'Excluir ' + compromisso.titulo,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.excluir(compromisso);
      },
      key: 'excluir'
    });
  }
  excluir(compromisso: Compromisso) {
    this.service.excluirCompromisso((compromisso.id) as any).subscribe(
      data => {
        this.service.excluirCompromisso(compromisso.id as any).subscribe(
          data => {
            this.pesquisar();
            this.confirmationService.confirm({
              message: 'Registro excluido com sucesso',
              header: 'Excluido',
              icon: 'pi pi-exclamation-triangle',
              rejectVisible: false,
              key: 'excluir',
              acceptLabel: 'Ok'
            });
          }
        );
      }
    );
  }

}
