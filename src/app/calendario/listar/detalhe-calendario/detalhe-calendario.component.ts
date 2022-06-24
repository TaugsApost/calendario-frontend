import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Dia } from 'src/app/cadastro/shared/cadastro.model';
import { Calendario } from '../../shared/calendario.model';

@Component({
  selector: 'detalhe-calendario',
  templateUrl: './detalhe-calendario.component.html',
  styleUrls: ['./detalhe-calendario.component.scss']
})
export class DetalheCalendarioComponent implements OnInit {

  @Input() calendario: Calendario = new Calendario();
  @Input() editavel: boolean = false;

  @Output() excluir = new EventEmitter<any>();

  diaInicial: Dia;

  constructor() {
    this.diaInicial = new Dia;

  }

  ngOnInit(): void {
    this.calendario.configuracao.dias.forEach(d => {
      if (d.diaInicialCalendario) {
        this.diaInicial = d.dia;
      }
    });
  }

  botaoDeletar(item: any) {
    this.excluir.emit(item)
  }

}
