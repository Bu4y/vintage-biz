import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders } from '@angular/common/http';

/*
  Generated class for the CoreserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CoreserviceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello CoreserviceProvider Provider');
  }

  authorizationHeader() {
    let token = JSON.parse(window.localStorage.getItem('token'));    
    let headers = new HttpHeaders().set('Authorization','Bearer ' + token);
    // headers.append('Authorization', 'Bearer ' + token);
    return headers;
  }

}
