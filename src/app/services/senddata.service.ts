import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvService } from './env.service';
import { Storage } from '@ionic/storage';

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


  senddata(username: String, phonenumber: String, address: String){
    var headers = new HttpHeaders();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");

    let postData = {
      host: this.env.ODOO_HOST,
      port: this.env.ODOO_PORT,
      database: this.env.ODOO_DATABASE,
      username: this.email,
      password: this.password,
      model: 'res.users', //'my.odoo.model',
      method: 'read', // 'my_odoo_method',
      options: {
        id: "*"
        // username: username,
        // phonenumber: phonenumber,
        // address: address
      }
    }
    
    

    return  this.http.post(this.env.PROXY_URL + this.env.API_URL + "api/call_kw",
      JSON.stringify(postData), {headers: headers} )
      .subscribe( data => {
        console.log(data);
      });
      

  }




}
