import { Component, Input, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { LoginModule } from 'src/app/estrutura/login/login.module';
import { LoginService } from 'src/app/estrutura/login/login.service';
import { Usuario } from 'src/app/usuario/shared/usuario.model';

@Component({
  selector: 'taugs-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() user: Usuario = new Usuario();

  items: MenuItem[] = [];
  display: boolean = false;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Conta'
      },
      {
        label: 'Sair',
        command: (event) => {
          this.loginService.logout();
          this.router.navigate(['login']);
        }
      }
    ];
  }

  teste() {
    this.display = true;
  }

}
