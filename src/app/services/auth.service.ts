import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from 'src/environments/environments.prod';
import { lastValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public http: HttpClient) {}

  loginwithUsernameandEmail(username: string, password: string) {
    const url = environments.baseUrl + '/login/';
    const body = { username: username, password: password };
    // Bei Try-Catch lastValueFrom verwenden
    return lastValueFrom(this.http.post<any>(url, body));
  }
}
