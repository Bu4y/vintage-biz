import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { LoginPage } from '../login/login';

/**
 * Generated class for the AgreementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-agreement',
  templateUrl: 'agreement.html',
})
export class AgreementPage {
  isShowAgreementBtn: boolean = true;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgreementPage');
  }

  agreement() {
    // window.localStorage.setItem('bikebikeshopfirstlogin', 'true');
    this.navCtrl.setRoot('LoginPage');
  }
  doInfinite(infiniteScroll) {
    this.isShowAgreementBtn = false;
    infiniteScroll.complete();
  }

}
