import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../services/authentication.service';
import { NgForm } from '@angular/forms';
import { SenddataService } from './../../services/senddata.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private senddataService: SenddataService
  ) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }

  senddata(form:NgForm) {
    this.senddataService.senddata(form.value.username, form.value.phonenumber, form.value.address);
  }

}
