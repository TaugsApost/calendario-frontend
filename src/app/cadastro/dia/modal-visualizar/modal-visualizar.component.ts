import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Dia } from '../../shared/cadastro.model';

@Component({
  selector: 'modal-visualizar',
  templateUrl: './modal-visualizar.component.html',
  styleUrls: ['./modal-visualizar.component.scss']
})
export class ModalVisualizarComponent implements OnInit {

  @Input() display: boolean = false;
  @Input() dia: Dia = new Dia();

  @Output() desativar: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  voltar() {
    this.display = false;
    this.desativar.emit()
  }

}
