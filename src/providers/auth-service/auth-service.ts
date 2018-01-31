import { Injectable } from '@angular/core';
import { Headers, Request } from '@angular/http';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/toPromise";

import { Server } from '../server-config/server-config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CoreserviceProvider } from '../../providers/coreservice/coreservice';
@Injectable()
export class Auth {

  constructor(public http: HttpClient, public server: Server, public coreService: CoreserviceProvider) {
  }

  // AuthHeaders() {
  //   let headers = this.coreService.authorizationHeader();
  //   headers.append("Authorization", "Bearer " + window.localStorage.getItem('token'));
  //   return headers;
  // }

  private(): Promise<any> {
    let headers = this.coreService.authorizationHeader();
    return this.http.post(this.server.url + 'api/users/me', null, { headers: headers })
      .toPromise()
      .then((response) => {
        let res = response as any;
        window.localStorage.setItem('jjbiz-user', JSON.stringify(res));
        window.localStorage.setItem('token', JSON.parse(res.loginToken));
        return res;
      })
      .catch(this.handleError);
  }

  login(credentials): Promise<any> {
    return this.http.post(this.server.url + 'api/auth/signin', credentials)
      .toPromise()
      .then((response) => {
        let res = response as any;
        window.localStorage.setItem('jjbiz-user', JSON.stringify(res));
        window.localStorage.setItem('token', JSON.stringify(res.loginToken));
        return res;
      })
      .catch(this.handleError);
  }

  fbLogin(facebookData): Promise<any> {
    return this.http.post(this.server.url + 'api/auth/signin', { facebookData: facebookData, facebookLogin: true })
      .toPromise()
      .then((response) => {
        let res = response as any;
        window.localStorage.setItem('jjbiz-user', JSON.stringify(res));
        window.localStorage.setItem('token', JSON.stringify(res.loginToken));
        return res;
      })
      .catch(this.handleError);
  }

  signUp(user): Promise<any> {
    return this.http.post(this.server.url + 'api/auth/signup', user)
      .toPromise()
      .then((response) => {
        let res = response as any;
        window.localStorage.setItem('jjbiz-user', JSON.stringify(res));
        window.localStorage.setItem('token', JSON.stringify(res.loginToken));
        return res;
      })
      .catch(this.handleError);
  }

  manageUser(user): Promise<any> {
    let headers = this.coreService.authorizationHeader();
    return this.http.put(this.server.url + 'api/usermanage/' + user._id, user, { headers: headers })
      .toPromise()
      .then((response) => {
        let res = response as any;
        window.localStorage.setItem('jjbiz-user', JSON.stringify(res));
        return res;
      })
      .catch(this.handleError);
  }

  logout() {
    window.localStorage.removeItem('token');
    return true;
  }

  isLogedin() {
    if (window.localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }
  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}