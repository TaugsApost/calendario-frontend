import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { Compromisso } from 'src/app/compromisso/shared/compromisso.model';
import { CompromissoService } from 'src/app/compromisso/shared/compromisso.service';
import { Data } from '../../shared/calendario.model';

@Component({
  selector: 'view-detalhe-data',
  templateUrl: './view-detalhe-data.component.html',
  styleUrls: ['./view-detalhe-data.component.scss']
})
export class ViewDetalheDataComponent implements OnInit {

  @Input() display: boolean = false;
  @Input() data: Data = new Data;
  @Output() fechar: EventEmitter<any> = new EventEmitter;

  viewForm: FormGroup;
  listaCompromisso: SelectItem[] = [];

  constructor(private compromissoService: CompromissoService) {
    this.viewForm = new FormGroup({
      posicaoMes: new FormControl(),
      posicaoAno: new FormControl(),
      textoPosicaoAno: new FormControl(),
      textoPosicaoMes: new FormControl(),
      textoData: new FormControl(),
      dia: new FormGroup({
        dia: new FormGroup({
          nome: new FormControl(),
          sigla: new FormControl(),
        }),
        posicao: new FormControl(),
      }),
      mes: new FormGroup({
        mes: new FormGroup({
          nome: new FormControl(),
          sigla: new FormControl(),
        }),
      }),
      ano: new FormGroup({
        nome: new FormControl()
      }),
    });
  }

  ngOnInit(): void {

  }

  voltar() {
    this.display = false;
    this.listaCompromisso = [];
    this.fechar.emit();
  }

  carregarData() {
    this.viewForm.patchValue(this.data);
    this.viewForm.controls['textoPosicaoMes'].setValue(this.data.posicaoMes + 'º dia do mês');
    this.viewForm.controls['textoPosicaoAno'].setValue(this.data.posicaoAno + 'º dia do ano');
    this.viewForm.controls['textoData'].setValue(this.labelData(this.data));
    this.criarListaCompromissos();
  }

  private criarListaCompromissos() {
    this.compromissoService.listarTodosCompromissos().subscribe(data => {
      if (data != null) {
        if (data.length > 0) {
          data.forEach(c => {
            if (c.data.id == this.data.id) {
              this.listaCompromisso.push(
                {
                  label: c.titulo,
                  value: c.descricao
                }
              );
            }
          });
        }
      }
    });
  }

  labelData(data: Data): string {
    let texto: string = data.posicaoMes.toLocaleString('pt-BR', { minimumIntegerDigits: 2, useGrouping: false })
      + '/' + data.mes.posicao.toLocaleString('pt-BR', { minimumIntegerDigits: 2, useGrouping: false })
      + '/' + data.ano.nome;
    return texto;
  }

}
