import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CoreserviceProvider } from '../../providers/coreservice/coreservice';
import { Server } from '../../providers/server-config/server-config';

/*
  Generated class for the MoreServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MoreServiceProvider {

  constructor(
    public http: HttpClient,
    public coreService: CoreserviceProvider,
    public server: Server
  ) {
    console.log('Hello MoreServiceProvider Provider');
  }
  getBadge(): Promise<any> {
    let headers = this.coreService.authorizationHeader();
    return this.http.get(this.server.url + 'api/getbadge/', { headers: headers })
      .toPromise()
      .then(response => response as any)
      .catch(this.handleError);
  }

  changePassword(auth): Promise<any> {
    let headers = this.coreService.authorizationHeader();


    return this.http.post(this.server.url + 'api/users/password', auth, { headers: headers })
      .toPromise()
      .then(response => response as any)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}
