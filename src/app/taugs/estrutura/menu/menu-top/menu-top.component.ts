import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Usuario } from 'src/app/usuario/shared/usuario.model';

@Component({
  selector: 'taugs-menu-top',
  templateUrl: './menu-top.component.html',
  styleUrls: ['./menu-top.component.scss']
})
export class MenuTopComponent implements OnInit {

  @Input() user: any = null;

  itensMenu: MenuItem[] = [];
  itensUser: MenuItem[] = [];

  pagina: string = '';
  caminho: string = '/Home'
  url: string = '';

  constructor() {

  }

  ngOnInit(): void {
    this.itensMenu = [
      {
        label: 'Calendarios',
        icon: 'pi pi-calendar',
        items: [
          {
            label: 'Meus Calendários',
            routerLink: '/calendario',
            command: (event) => {
              this.mudarBreadCrumb(' /Home', '/Calendario', '/calendario');
            }
          },
          {
            label: 'Novo Calendário',
            routerLink: '/calendario/novo',
            command: (event) => {
              this.mudarBreadCrumb(' /Home/Calendario', '/Novo', '/calendario/novo');
            }
          }
        ]
      },
      {
        label: 'Compromissos',
        icon: 'pi pi-book',
        items: [
          {
            label: 'Meus Compromissos'
          }
        ]
      },
      {
        label: 'Cadastro',
        icon: 'pi pi-fw pi-pencil',
        items: [
          {
            label: 'Meus Dias',
            routerLink: '/cadastro/dia',
            command: (event) => {
              this.mudarBreadCrumb(' /Home/Cadastro', '/Dia', '/cadastro/dia');
            }
          },
          {
            label: 'Meus Meses',
            routerLink: '/cadastro/mes',
            command: (event) => {
              this.mudarBreadCrumb(' /Home/Cadastro', '/Mes', '/cadastro/mes');
            }
          }
        ]
      }
    ];
    this.itensUser = [
      {
        label: this.user == null ? '' : this.user.nome,
        items: [
          {
            label: 'Dados',
            icon: 'pi pi-fw pi-user'
          },
          {
            label: 'Sair',
            icon: 'pi pi-fw pi-power-off'
          }
        ]
      }
    ];
  }

  mudarBreadCrumb(caminho: string, pagina: string, url: string) {
    this.pagina = pagina;
    this.caminho = caminho;
    this.url = url;
  }

}
