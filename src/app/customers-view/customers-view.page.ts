import { Component, OnInit } from '@angular/core';
import { Customer } from '../services/customer.models';
import { CustomerService} from '../services/customer.service'
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-customers-view',
  templateUrl: './customers-view.page.html',
  styleUrls: ['./customers-view.page.scss'],
})

export class CustomersViewPage implements OnInit {

  customer: Customer;

  constructor(private route: ActivatedRoute, private customerService: CustomerService) { }

  ngOnInit() {
     const customerId: number = +this.route.snapshot.paramMap.get('id');
     this.loadCustomer(customerId);
  }

  loadCustomer(customerId: number) {
    this.customerService.getCustomer(customerId)
      .subscribe((response: Customer) => {
        this.customer = response;
        console.log(`Loaded customer with the id of '${customerId}'.`);
        }
      );
  }

}
