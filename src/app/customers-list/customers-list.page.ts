import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../services/customer.models';
import { ApiResponse  } from '../services/api.response.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.page.html',
  styleUrls: ['./customers-list.page.scss'],
})
export class CustomersListPage implements OnInit {

  constructor(public http: HttpClient, public customersService: CustomerService,
    private alertController: AlertController) { }

  public customers: Customer[];

  ngOnInit() {
    this.loadCustomers();
  }

  public loadCustomers() {
    this.customersService.getCustomers()
      .subscribe((response: Customer[]) => { this.customers = response; });
  }

  public deleteCustomer(customer: Customer) {
    this.customersService.deleteCustomer(customer)
      .subscribe((response: ApiResponse) => {
        if (response) {
          this.displayAlert('Success', 'Successfully deleted the contact!');
          if (response.wasSuccessful) {
            this.loadCustomers();
          }
        }         else {
          this.displayAlert('Failed', 'Failed to delete the contact!');
          console.log('Failed to delete');
        }
      });
  }

  public async displayAlert(title: string, message: string) {
    const alert = await this.alertController.create({
      header: title,
      message: message,
      buttons: ['Ok']
    });
    await alert.present();
  }
}
