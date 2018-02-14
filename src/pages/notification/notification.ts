import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingProvider } from '../../providers/loading/loading';
import moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { NotificationServiceProvider } from './notification-service';

/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {

  notificationData: Array<any> = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private notificationProvider: NotificationServiceProvider,
    private loading: LoadingProvider,
    private translate: TranslateService
  ) {
  }

  ionViewWillEnter() {
    this.getNotification();
  }

  doRefresh(refresher) {
    this.getNotification();
    refresher.complete();
  }

  getNotification() {
    this.loading.onLoading();
    this.notificationProvider.getNotification().then((data) => {
      this.loading.dismiss();
      this.notificationData = data;
    }, (err) => {
      this.loading.dismiss();
    });
  }

  getTime(date) {
    let language = this.translate.currentLang;
    if (language === 'th') {
      moment.locale('th');
    } else if (language === 'en') {
      moment.locale('en');
    }
    return moment(date).format('DD MMMM YYYY  HH:mm:ss');
  }

  getDescription(e) {
    this.navCtrl.push('NotificationDetailPage', { detail: e });
  }

}
