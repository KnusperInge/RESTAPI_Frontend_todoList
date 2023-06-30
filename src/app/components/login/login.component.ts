import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private auth: AuthService, private router: Router) {}

  username: string = '';
  password: string = '';
  response: any;
  async login() {
    try {
      this.response = await this.auth.loginwithUsernameandEmail(
        this.username,
        this.password
      );
      localStorage.setItem('token', this.response.token);
      this.router.navigate(['/todos']);
    } catch (e) {
      console.log('Irgendwas ist schief gelaufen', e);
    }
  }
}
