import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { ConfiguracaoCalendario } from '../../shared/calendario.model';
import { CalendarioService } from '../../shared/calendario.service';

@Component({
  selector: 'app-view-config',
  templateUrl: './view-config.component.html',
  styleUrls: ['./view-config.component.scss']
})
export class ViewConfigComponent implements OnInit {

  formView: FormGroup;
  readonly: boolean = true;
  editar: boolean = false;
  listaDias: SelectItem[] = [];
  listaMeses: SelectItem[] = [];

  constructor(private service: CalendarioService, private rota: Router, private _activatedRoute: ActivatedRoute, private messages: MessageService) {
    this.formView = new FormGroup({
      id: new FormControl(),
      privado: new FormControl(Validators.required),
      dias: new FormControl(),
      meses: new FormControl(),
      anoInicial: new FormControl(),
      anoFinal: new FormControl(),
      bissexto: new FormControl(),
      nome: new FormControl(Validators.required),
      textoAno: new FormControl({ value: '', disabled: true }),
      idCalendario: new FormControl()
    });
  }

  ngOnInit(): void {
    this.inicializarForm();
  }

  private inicializarForm() {
    const isIdPresent = this._activatedRoute.snapshot.paramMap.has('id');
    if (isIdPresent) {
      const id = this._activatedRoute.snapshot.paramMap.get('id') as any;
      this.service.detalharCalendario(id).subscribe(
        data => {
          this.criarListas(data.configuracao);
          this.formView.patchValue(data.configuracao),
            this.afterLoadRecord(data.configuracao)
        }
      )
    }
  }

  afterLoadRecord(configuracao: ConfiguracaoCalendario): void {
    this.formView.controls['textoAno'].setValue(configuracao.anoInicial + ' até ' + configuracao.anoFinal);
  }

  private criarListas(configuracao: ConfiguracaoCalendario) {
    this.criarListaMeses(configuracao);
    this.criarListaDias(configuracao);
  }

  private criarListaDias(configuracao: ConfiguracaoCalendario) {
    configuracao.dias.forEach(d => {
      this.listaDias.push(
        {
          label: d.dia.nome,
          value: ''
        }
      );
    })
  }

  private criarListaMeses(configuracao: ConfiguracaoCalendario) {
    configuracao.meses.forEach(m => {
      this.listaMeses.push(
        {
          label: m.mes.nome,
          value: ''
        }
      );
    })
  }

  habilitarEdicao() {
    this.editar = true;
  }

  cancelarEdicao() {
    this.formView.reset();
    this.editar = false;
    this.inicializarForm();
  }

  salvar() {
    if (this.formView.valid) {
      this.service.salvarConfiguracao(this.formView.getRawValue()).subscribe(
        data => {
          this.messages.add({ severity: 'success', summary: 'Concluído', detail: 'Calendario alterado com sucesso!', closable: true });
          this.cancelarEdicao();
        }
      );
    } else {
      this.messages.add({ severity: 'error', summary: 'Erro', detail: 'Campo obrigatório em branco', closable: true });
    }

  }





}
