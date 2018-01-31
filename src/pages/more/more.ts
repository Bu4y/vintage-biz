import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
/**
 * Generated class for the MorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})
export class MorePage {
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public app: App
  ) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MorePage');
  }
  logout() {
    window.localStorage.removeItem('jjbiz-user');
    this.app.getRootNav().setRoot('LoginPage');
  }
  doRefresh(refresher) {
    setTimeout(() => {
      refresher.complete();
    }, 1500);
  }
  onSetting() {
    this.app.getRootNav().push('SettingDetailPage');
  }
}
