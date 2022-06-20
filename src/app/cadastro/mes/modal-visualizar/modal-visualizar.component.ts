import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Mes } from '../../shared/cadastro.model';

@Component({
  selector: 'modal-visualizar-mes',
  templateUrl: './modal-visualizar.component.html',
  styleUrls: ['./modal-visualizar.component.scss']
})
export class ModalVisualizarMesComponent implements OnInit {

  @Input() display: boolean = false;
  @Input() mes: Mes = new Mes();

  @Output() desativar: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  voltar() {
    this.display = false;
    this.desativar.emit()
  }

}
