import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  
  PROXY_URL = "https://cors-anywhere.herokuapp.com/";

  ODOO_HOST = "127.0.0.1";
  ODOO_PORT = "8069";
  ODOO_DATABASE = "mydb";

  // API_URL = 'http://192.168.107.163:8080/';
  API_URL = 'http://85877d91e1fe.ngrok.io/';
  
  constructor() { }
}
