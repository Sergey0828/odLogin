import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../services/authentication.service';
import { NgForm } from '@angular/forms';
import { SenddataService } from './../../services/senddata.service';
import { EnvService } from './../../services/env.service';
import { Storage } from '@ionic/storage';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  products: any;
  currentProduct: any;
  private email;
  private password;
  // expense: number;
  // unitePrice: number;
  // quantity: number;

  constructor(
    private authService: AuthenticationService,
    private senddataService: SenddataService,
    private env: EnvService,
    private storage: Storage
  ) { 
    
  }

  ngOnInit() {
    this.loadProducts();

    this.currentProduct = {
      id: -1,
      key: -1,
      name: "",
      price: "",
      quantity: "",
      expense: "",
      description: ""
    };
  }

  logout() {
    this.authService.logout();
  }

  senddata(form:NgForm) {
    if(!form.value.expense || this.currentProduct.id == -1){
      return false
    }
    
    this.senddataService.senddata(this.currentProduct);
  }

  async loadProducts() {
    await this.storage.get("email").then((val) => {
      this.email = val;
    });
    await this.storage.get("password").then((val) => {
      this.password = val;
    });
    await this.senddataService.loadProduct(this.email, this.password)
    .subscribe(
      data => {
        var obj = data['response'];
        this.products = Object.keys(obj).map(
          function(key){
            return {id: key, key: obj[key]['id']
                  , name: obj[key]['name']
                  , description: obj[key]['name']
                  , price: obj[key]['price']};
          }
        )
      }
    );
  }

  onChangeUnitePrice(ev: any): void {
    this.currentProduct.price = ev.target.value;
    this.calcExpense();
  }

  onChangeQuantity(ev: any): void {
    this.currentProduct.quantity = ev.target.value;
    this.calcExpense();
  }

  calcExpense(): void {
    if (!isNaN(this.currentProduct.price) && !isNaN(this.currentProduct.quantity))
      this.currentProduct.expense = this.currentProduct.price * this.currentProduct.quantity;
    else
      this.currentProduct.expense = 0;
  }

  onProductChange(ev: any): void {
    var prodId = ev.target.value;
    if(isNaN(prodId)) {
      return;
    }
    this.currentProduct = this.products[prodId];
    this.calcExpense();
  }

  
}
