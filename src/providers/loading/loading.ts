import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular';

/*
  Generated class for the LoadingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoadingProvider {
  loading: any;
  constructor(public loadingCtrl: LoadingController) {
    console.log('Hello LoadingProvider Provider');
  }

  onLoading() {
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<div class="lds-css ng-scope">
                  <div style="width:100%;height:100%" class="lds-eclipse">
                    <div class="div-image">
                      <img src="./assets/icon/g-loading.png" class="loading-image">
                    </div>
                    <div class="spin">
                    </div>
                  </div>
                </div>`
    });
    this.loading.present();
    return;
  }

  dismiss() {
    this.loading.dismiss();
    return;
  }

}
