import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { OrderModel } from '../../assets/model/order.model';
import { StatusModel } from '../../assets/model/status.model';
import { Server } from '../../providers/server-config/server-config';
import { CoreserviceProvider } from '../../providers/coreservice/coreservice';

@Injectable()
export class StatusServiceProvider {

  constructor(public http: HttpClient, public coreService: CoreserviceProvider, public server: Server) {
    console.log('Hello StatusServiceProvider Provider');
  }
  // getOrder(): Promise<Array<StatusModel>> {
  //   return this.http.get('./assets/Jason/order.json')
  //     .toPromise()
  //     .then(response => response as Array<StatusModel>)
  //     .catch(this.handleError);
  // }
  getOrder(id): Promise<any> {
    let headers = this.coreService.authorizationHeader();
    return this.http.get(this.server.url + 'api/shopgetorders/' + id, { headers: headers })
      .toPromise()
      .then(response => response as any)
      .catch(this.handleError);
  }
  getOrderList(): Promise<Array<OrderModel>> {
    return this.http.get('./assets/Jason/orderlist.json')
      .toPromise()
      .then(response => response as Array<OrderModel>)
      .catch(this.handleError);
  }
  getOrderDetail(): Promise<any> {
    return this.http.get('./assets/Jason/orderdetail.json')
      .toPromise()
      .then(response => response as any)
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}
