import { Component, Input, OnInit } from '@angular/core';
import { Data } from '../../shared/calendario.model';

@Component({
  selector: 'view-data',
  templateUrl: './view-data.component.html',
  styleUrls: ['./view-data.component.scss']
})
export class ViewDataComponent implements OnInit {

  @Input() data: Data = new Data();
  @Input() ativo: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
