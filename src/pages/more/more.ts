import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { UserModel } from '../../assets/model/user.model';
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
  user: UserModel = new UserModel();
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public app: App
  ) {
  }
  ionViewWillEnter() {
    this.user = window.localStorage.getItem('jjbiz-user') ? JSON.parse(window.localStorage.getItem('jjbiz-user')) : null;
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
  editProfile() {
    this.navCtrl.push('ProfilePage');
  }
}
