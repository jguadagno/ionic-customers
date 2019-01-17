import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../services/customer.models';
import { ApiResponse } from '../services/api.response.model';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-customers-edit',
  templateUrl: './customers-edit.page.html',
  styleUrls: ['./customers-edit.page.scss'],
})
export class CustomersEditPage implements OnInit {

  constructor(public http: HttpClient, public customerService: CustomerService,
    public route: ActivatedRoute, public loadingController: LoadingController,
    public router: Router) {
  }

  customer: Customer;

  ngOnInit() {
    const customerIdParam = this.route.snapshot.paramMap.get('id');
    console.log('Id Param' + customerIdParam);
    if (customerIdParam == null || customerIdParam === undefined || customerIdParam !== '') {
      const customerId: number = +this.route.snapshot.paramMap.get('id');
      this.loadCustomer(customerId);
    } else {
      this.customer = this.customerService.getNewCustomer();
    }
  }

  async loadCustomer(customerId: number) {

    const loader = await this.loadingController.create({ message: 'Loading'});
    loader.present();

    await this.customerService.getCustomer(customerId)
      .subscribe((response: Customer) => {
        this.customer = response;
        console.log(`Loaded customer with the id of '${customerId}'.`);
        }
      );
    loader.dismiss();
  }

  private saveCustomer() {
    this.customerService.saveCustomer(this.customer)
      .subscribe((affectId: number) => {
        if (affectId > 0) {
          console.log('Save was successful');
          this.router.navigate(['/customers/']);
        } else {
          console.log('Save failed!');
        }
      });
  }
}
