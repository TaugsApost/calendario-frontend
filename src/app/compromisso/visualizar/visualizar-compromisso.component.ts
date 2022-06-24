import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CalendarioService } from 'src/app/calendario/shared/calendario.service';
import { Compromisso } from '../shared/compromisso.model';
import { CompromissoService } from '../shared/compromisso.service';

@Component({
  selector: 'app-visualizar-compromisso',
  templateUrl: './visualizar-compromisso.component.html',
  styleUrls: ['./visualizar-compromisso.component.scss']
})
export class VisualizarCompromissoComponent implements OnInit {

  viewForm: FormGroup;
  constructor(private router: Router, private service: CompromissoService, private calendarioService: CalendarioService,
    private messageService: MessageService, private _activatedRoute: ActivatedRoute) {
    this.viewForm = new FormGroup({
      titulo: new FormControl(null),
      descricao: new FormControl(null),
      txtHorario: new FormControl(null),
      txtData: new FormControl(null)
    });
  }

  ngOnInit(): void {
    this.carregarRegistro();
  }
  carregarRegistro() {
    const isIdPresent = this._activatedRoute.snapshot.paramMap.has('id');
    if (isIdPresent) {
      const id = this._activatedRoute.snapshot.paramMap.get('id') as any;
      this.service.detalharCompromisso(id).subscribe(
        data => {
          this.viewForm.patchValue(data);
          this.afterLoadRegistro(data);
        }
      );
    }
  }

  afterLoadRegistro(compromisso: Compromisso) {
    this.afterLoadRegistroData(compromisso);
    this.afterLoadRegistroHorario(compromisso);
  }

  private afterLoadRegistroData(compromisso: Compromisso) {
    let txtData: string = this.retornarNumeroComNDigitos(2, compromisso.data.posicaoMes)
      + '/' + this.retornarNumeroComNDigitos(2, compromisso.data.mes.posicao)
      + '/' + this.retornarNumeroComNDigitos(2, compromisso.data.ano.nome);
    this.viewForm.controls['txtData'].setValue(txtData);
  }

  private afterLoadRegistroHorario(compromisso: Compromisso) {
    let txtHorario: string = this.retornarNumeroComNDigitos(2, compromisso.horario.hora)
      + ' : ' + this.retornarNumeroComNDigitos(2, compromisso.horario.minutos)
    this.viewForm.controls['txtHorario'].setValue(txtHorario);
  }

  private retornarNumeroComNDigitos(n: number, numero: number): string {
    return numero.toLocaleString('pt-BR', { minimumIntegerDigits: n, useGrouping: false });
  }

}
