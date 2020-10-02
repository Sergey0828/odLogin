import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvService } from './env.service';
import { Storage } from '@ionic/storage';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SenddataService {

  private email;
  private password;

  constructor( 
    private http: HttpClient,
    private env: EnvService,
    private storage: Storage
  ) {
    this.storage.get("email").then((val) => {
      this.email = val;
    });
    this.storage.get("password").then((val) => {
      this.password = val;
    });
   }


  senddata(product: any){
    var headers = new HttpHeaders();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");

    let postData = {
      host: this.env.ODOO_HOST,
      port: this.env.ODOO_PORT,
      database: this.env.ODOO_DATABASE,
      username: this.email,
      password: this.password,
      model: 'xxx_test_module.course', 
      method: 'save_expense',
      options: {
        product: product,
      }
    }

    return  this.http.post(this.env.PROXY_URL + this.env.API_URL + "api/call_kw",
      JSON.stringify(postData), {headers: headers} )
      .subscribe( data => {
        alert(data['response']);
      });
      

  }

  loadProduct(username: String, password: String): Observable<any> {
    var headers = new HttpHeaders();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");

    
      let postData = {
        host: this.env.ODOO_HOST,
        port: this.env.ODOO_PORT,
        database: this.env.ODOO_DATABASE,
        username: username,
        password: password,
        model: 'xxx_test_module.course',
        method: 'get_products',
        options: {
        }
      }
    return  this.http.post(this.env.PROXY_URL + this.env.API_URL + "api/call_kw",
        JSON.stringify(postData), {headers: headers} )
        .pipe(
        );
  }


}
