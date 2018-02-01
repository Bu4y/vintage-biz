import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { OrderModel } from '../../assets/model/order.model';
/*
  Generated class for the OrderServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OrderServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello OrderServiceProvider Provider');
  }
  getOrderList(): Promise<Array<OrderModel>> {
    return this.http.get('./assets/Jason.orderlist.json')
      .toPromise()
      .then(response => response as Array<OrderModel>)
      .catch(this.handleError);
  }
  getOrderDetail(): Promise<any> {
    return this.http.get('./assets/Jason.orderdetail.json')
      .toPromise()
      .then(response => response as any)
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}
