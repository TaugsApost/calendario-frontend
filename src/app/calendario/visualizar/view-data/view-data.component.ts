import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Data } from '../../shared/calendario.model';

@Component({
  selector: 'view-data',
  templateUrl: './view-data.component.html',
  styleUrls: ['./view-data.component.scss']
})
export class ViewDataComponent implements OnInit {

  @Input() data: Data = new Data();
  @Input() display: boolean = false;
  @Input() ativo: boolean = true;
  @Output() fechar: EventEmitter<any> = new EventEmitter();


  constructor() { }

  ngOnInit(): void {

  }

  fecharData() {
    this.display = false;
    this.fechar.emit();
  }

}
