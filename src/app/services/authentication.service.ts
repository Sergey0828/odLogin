// import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { BehaviorSubject} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvService } from './env.service';



const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticationState = new BehaviorSubject(false);

  constructor(
    private storage: Storage, 
    private plt: Platform,
    private http: HttpClient,
    private env: EnvService
  ) { 
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  checkToken() {
    this.storage.get(TOKEN_KEY).then(res => {
      if(res) {
        this.authenticationState.next(true);
      }
    });
  }

  login() {
    return this.storage.set(TOKEN_KEY, 'Bearer 1234567').then(() => {
      this.authenticationState.next(true);
    });
  }

  logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

  login_0(email: String, password: String) {
    var headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append("Content-Type", 'application/json');
    
    let postData = {
      host: this.env.ODOO_HOST,
      port: this.env.ODOO_PORT,
      database: this.env.ODOO_DATABASE,
      username: email,
      password: password,
    }

    return  this.http.post(this.env.PROXY_URL + this.env.API_URL + "api/login",
      JSON.stringify(postData), {headers: headers} )
      .subscribe( data => {
        this.storage.set(TOKEN_KEY, data).then(() => {
          this.storage.set('email', email);
          this.storage.set('password', password);

          this.authenticationState.next(true);
        });
      });
      
  }





}
