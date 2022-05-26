import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-logar-conta',
  templateUrl: './logar-conta.component.html',
  styleUrls: ['./logar-conta.component.scss']
})
export class LogarContaComponent implements OnInit {

  login = {
    email: '',
    password: ''
  };

  constructor(
    private service: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async onSubmit() {
    try {
      const result = await this.service.login(this.login);
      console.log(`Login efetuado: ${result}`);
      // navego para a rota vazia novamente
      this.router.navigate(['']);
    } catch (error) {
      console.error(error);
    }
  }
}
