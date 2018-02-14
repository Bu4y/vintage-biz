import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Server } from '../../providers/server-config/server-config';
import { CoreserviceProvider } from '../../providers/coreservice/coreservice';
/*
  Generated class for the NotificationServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotificationServiceProvider {

    constructor(public http: HttpClient, public coreService: CoreserviceProvider, public server: Server) {
        console.log('Hello NotificationServiceProvider Provider');
    }
    getNotification(): Promise<any> {
        let headers = this.coreService.authorizationHeader();
        return this.http.get(this.server.url + 'api/userownernotifications', { headers: headers })
            .toPromise()
            .then(response => response as any)
            .catch(this.handleError);
    }
    readNotification(id) {
        let headers = this.coreService.authorizationHeader();
        return this.http.get(this.server.url + 'api/userownerreadnotification/' + id, { headers: headers })
            .toPromise()
            .then(response => response as Array<any>)
            .catch(this.handleError);
    }
    deleteNotification(id) {
        let headers = this.coreService.authorizationHeader();
        return this.http.delete(this.server.url + 'api/notifications/' + id, { headers: headers })
            .toPromise()
            .then(response => response as Array<any>)
            .catch(this.handleError);
    }
    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }

}
