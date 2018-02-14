import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { UserModel } from '../../assets/model/user.model';
import { LoadingProvider } from '../../providers/loading/loading';
import { MoreServiceProvider } from './more-service';
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
  badge: number = 0;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public app: App,
    private loading: LoadingProvider,
    private moreServiceProvider: MoreServiceProvider
  ) {
  }
  ionViewWillEnter() {
    this.user = window.localStorage.getItem('jjbiz-user') ? JSON.parse(window.localStorage.getItem('jjbiz-user')) : null;
    this.loading.onLoading();
    this.moreServiceProvider.getBadge().then((data) => {
      this.badge = data;
      console.log(this.badge);
      this.loading.dismiss();
    }, (err) => {
      this.loading.dismiss();
    });
    console.log('ionViewDidLoad MorePage');
  }
  logout() {
    window.localStorage.removeItem('jjbiz-user');
    window.localStorage.removeItem('shopID');
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
  onChangePassword() {
    this.navCtrl.push('ChangePasswordPage');
  }
  gotoWallet() {
    this.navCtrl.push('WalletPage');
  }
  notification() {
    this.navCtrl.push('NotificationPage');
  }
  gotoContact() {
    this.navCtrl.push('ContactPage');
  }
  gotoQuestion() {
    this.navCtrl.push('QuestionAnswersPage');
  }
}
