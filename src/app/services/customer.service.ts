import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { Customer } from './customer.models';
import { ApiResponse } from './api.response.model';

@Injectable()
export class CustomerService {

  private customersBaseUrl = 'http://localhost:3000/customers';

  constructor(public http: HttpClient) {
  }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.customersBaseUrl)
      .pipe(
        map(customers => customers),
          catchError(this.handleError('getCustomers', []))
      );
  }

  getCustomer(customerId: number | string): Observable<Customer> {
    return this.http.get<Customer>(`${this.customersBaseUrl}/${customerId}`)
      .pipe(
        map(customer => customer),
          catchError(this.handleError(`getCustomer(${customerId}`, null))
      );
  }

  saveCustomer(customer: Customer): Observable<number> {
    if (customer.guid === '' || customer.guid === undefined) {
      customer.guid = Guid.newGuid();
    }

    if (customer.picture == null || customer.picture === undefined) {
      // Set the picture to the randomuser.me picture.
      customer.picture = {
        large : 'https://randomuser.me/api/portraits/' + customer.gender + '/' + customer.randomImageId + '.jpg',
        medium : 'https://randomuser.me/api/portraits/med/' + customer.gender + '/' + customer.randomImageId + '.jpg',
        thumbnail : 'https://randomuser.me/api/portraits/thumb/' + customer.gender + '/' + customer.randomImageId + '.jpg'
      };
    }

    if (customer.id === 0) {
      return this.addCustomer(customer);
    } else {
      return this.updateCustomer(customer);
    }
  }

  addCustomer(customer: Customer): Observable<number> {
    return this.http.post<ApiResponse>(`${this.customersBaseUrl}`, customer, { observe: 'response' })
      .pipe(
        map((response) => this.toApiResponse(response)),
          catchError(this.handleError(`addCustomer(${customer.guid}`, null)),
            map((apiResponse) => apiResponse.body.id),
              catchError(this.handleError(`addCustomer(${customer.guid}) Failed to Parse Id`, null))
      );
  }

  updateCustomer(customer: Customer): Observable<number> {
    return this.http.put<ApiResponse>(`${this.customersBaseUrl}/${customer.id}`, customer, { observe: 'response' })
      .pipe(
        map((response) => this.toApiResponse(response)),
          catchError(this.handleError(`updateCustomer(${customer.id}`, null)),
            map((apiResponse) => apiResponse.body.id),
              catchError(this.handleError(`updateCustomer(${customer.id}) Failed to Parse Id`, null))
      );
  }

  deleteCustomer(customer: Customer): Observable<ApiResponse> {
    return this.deleteCustomerById(customer.id);
  }

  deleteCustomerById(customerId: number | string): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.customersBaseUrl}/${customerId}`, { observe: 'response' })
      .pipe(
        map((response) => this.toApiResponse(response)),
          catchError(this.handleError(`deleteCustomer(${customerId}`, null))
      );
  }

  toApiResponse(response: HttpResponse<ApiResponse>): ApiResponse {
    return {
      body: response.body,
      statusCode: response.status,
      statusText: response.statusText,
      wasSuccessful: ((response.status === 200) || (response.status === 201))
    };
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getNewCustomer(): Customer {
    return this.setCustomerDefaults(new Customer);
  }

  setCustomerDefaults(customer: Customer): Customer {
    customer.id = 0;
    customer.guid = Guid.newGuid();
    customer.isActive = true;
    customer.balance = '$0.00';
    customer.age = 0;
    customer.eyeColor = '';
    customer.gender = '';
    customer.randomImageId = this.randomIntFromInterval(1, 100);
    customer.name = {first: '', last: ''};
    customer.company = '';
    customer.email = '';
    customer.phone = '';
    customer.address = '';
    customer.about = '';
    customer.registered = new Date(Date.now());
    // TODO: Get Latitude, Longitude based on Address or make one up.
    customer.latitude = 0;
    customer.longitude = 0;
    customer.tags = ['test', 'data']; // TODO: Generate random tags;
    customer.friends = [{id: 0, name: 'Joe'}];
    customer.picture = {
      large : '',
      medium : '',
      thumbnail : ''
    };

    return customer;
  }

  private randomIntFromInterval(min: number, max: number): number  {
    return Math.floor(Math.random() * (max - min + 1 ) + min);
  }
}
class Guid {
  static newGuid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
          return v.toString(16);
      });
  }
}
