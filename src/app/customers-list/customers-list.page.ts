import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../services/customer.models';
import { ApiResponse  } from '../services/api.response.model';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.page.html',
  styleUrls: ['./customers-list.page.scss'],
})
export class CustomersListPage implements OnInit {

  constructor(public http: HttpClient, public customerService: CustomerService) { }

  public customers: Customer[];

  ngOnInit() {
    this.loadCustomers();
  }

  public loadCustomers() {
    this.customerService.getCustomers()
      .subscribe((response: Customer[]) => { this.customers = response; });
  }
}
