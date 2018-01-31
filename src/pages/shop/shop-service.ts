import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Server } from '../../providers/server-config/server-config';
import { CoreserviceProvider } from '../../providers/coreservice/coreservice';
/*
  Generated class for the ShopServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ShopServiceProvider {

  constructor(public http: HttpClient, public coreService: CoreserviceProvider, public server: Server) {
    console.log('Hello ShopServiceProvider Provider');

  }


  // getShop(){
  //   // return this.http.get("./assets/Jason/shop.json")
  //   return this.http.get("https://eatsyd-test.herokuapp.com/api/shopshome")
  //     .toPromise()
  //     .then(response => response as any)
  //     .catch(this.handleError);
  // }

  getShop(): Promise<any> {
    let headers = this.coreService.authorizationHeader();
    return this.http.get(this.server.url + 'api/shopshome', { headers: headers })
      .toPromise()
      .then(response => response as any)
      .catch(this.handleError);
  }
  editShop(shopID, data): Promise<any> {

    let headers = this.coreService.authorizationHeader();
    return this.http.put(this.server.url + 'api/manageshop/' + shopID, data, { headers: headers })
      .toPromise()
      .then(response => response as any)
      .catch(this.handleError);
  }
  editIndexProduct(shopID, data): Promise<any> {

    let headers = this.coreService.authorizationHeader();
    return this.http.put(this.server.url + 'api/updateitems/' + shopID, { items: data.items }, { headers: headers })
      .toPromise()
      .then(response => response as any)
      .catch(this.handleError);
  }

  getCate(): Promise<any> {
    let headers = this.coreService.authorizationHeader();
    return this.http.get(this.server.url + 'api/categoryshops', { headers: headers })
      .toPromise()
      .then(response => response as any)
      .catch(this.handleError);
  }

  addFirstShop(data): Promise<any> {
    let headers = this.coreService.authorizationHeader();
    return this.http.put(this.server.url + 'api/manageshopinfo', data, { headers: headers })
      .toPromise()
      .then(response => {
        let data = response as any;
        window.localStorage.setItem('user', JSON.stringify(data.user));
        return response;
      })
      .catch(this.handleError);
  }

  setCover(shopId, img): Promise<any> {
    let data = { data: img };
    let headers = this.coreService.authorizationHeader();
    return this.http.put(this.server.url + 'api/changecover/' + shopId, data, { headers: headers })
      .toPromise()
      .then(response => response as any)
      .catch(this.handleError);
  }

  addPromote(shopId, img): Promise<any> {
    let data = { data: img };
    let headers = this.coreService.authorizationHeader();
    return this.http.put(this.server.url + 'api/addpromote/' + shopId, data, { headers: headers })
      .toPromise()
      .then(response => response as any)
      .catch(this.handleError);
  }

  addCate(shopId, data): Promise<any> {
    let headers = this.coreService.authorizationHeader();
    return this.http.put(this.server.url + 'api/createcate/' + shopId, data, { headers: headers })
      .toPromise()
      .then(response => response as any)
      .catch(this.handleError);
  }

  addProduct(shopId, data): Promise<any> {
    let headers = this.coreService.authorizationHeader();
    return this.http.put(this.server.url + 'api/createproduct/' + shopId, data, { headers: headers })
      .toPromise()
      .then(response => response as any)
      .catch(this.handleError);
  }

  getProduct(prodID): Promise<any> {
    let headers = this.coreService.authorizationHeader();
    return this.http.get(this.server.url + 'api/products/' + prodID, { headers: headers })
      .toPromise()
      .then(response => response as any)
      .catch(this.handleError);
  }
  editProduct(prodID, data): Promise<any> {
    let headers = this.coreService.authorizationHeader();
    return this.http.put(this.server.url + 'api/products/' + prodID, data, { headers: headers })
      .toPromise()
      .then(response => response as any)
      .catch(this.handleError);
  }
  editCate(cateId, data): Promise<any> {
    let headers = this.coreService.authorizationHeader();
    return this.http.put(this.server.url + 'api/categoryproducts/' + cateId, data, { headers: headers })
      .toPromise()
      .then(response => response as any)
      .catch(this.handleError);
  }
  deleteProduct(shopID, prodID, prodIndex, cateIndex): Promise<any> {
    let prod = {
      _id: prodID,
      index: prodIndex,
      cateindex: cateIndex
    };
    let headers = this.coreService.authorizationHeader();
    return this.http.put(this.server.url + 'api/deleteproduct/' + shopID, prod, { headers: headers })
      .toPromise()
      .then(response => response as any)
      .catch(this.handleError);
  }
  deletePromoteShop(shopID, index) {
    let headers = this.coreService.authorizationHeader();
    return this.http.put(this.server.url + 'api/removepromote/' + shopID, { index: index }, { headers: headers })
      .toPromise()
      .then(response => response as any)
      .catch(this.handleError);
  }
  deleteCateProd(shopID, categoryId) {
    let headers = this.coreService.authorizationHeader();
    return this.http.put(this.server.url + 'api/deletecateproduct/' + shopID, categoryId, { headers: headers })
      .toPromise()
      .then(response => response as any)
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}
