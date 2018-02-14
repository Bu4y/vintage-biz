import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { LoadingProvider } from '../../providers/loading/loading';
import { NotificationServiceProvider } from '../notification/notification-service';

/**
 * Generated class for the NotificationDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notification-detail',
  templateUrl: 'notification-detail.html',
})
export class NotificationDetailPage {

  detailNoti: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private translate: TranslateService,
    private loading: LoadingProvider,
    private notificationProvider: NotificationServiceProvider,
    private alertCtrl: AlertController
  ) {
    this.detailNoti = this.navParams.get('detail');
  }

  ionViewWillEnter() {
    this.readMessage();
  }

  readMessage() {
    this.loading.onLoading();
    this.notificationProvider.readNotification(this.detailNoti._id).then(() => {
      this.loading.dismiss();
    }, () => {
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

  notificationDelete() {
    let language = this.translate.currentLang;
    let title = '';
    let message = '';
    let cancel = '';
    let ok = '';
    if (language === 'th') {
      title = 'ลบข้อความ';
      message = 'คุณต้องลบข้อความนี้? ข้อความนี้จะถูกลบออกจากระบบ';
      cancel = 'ยกเลิก';
      ok = 'ตกลง';
    } else if (language === 'en') {
      title = 'Remove message';
      message = 'You must delete this message.? This message will be removed from the system.';
      cancel = 'Cancel';
      ok = 'OK';
    }
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      mode: 'ios',
      buttons: [
        {
          text: ok,
          cssClass: 'confirm',
          handler: () => {
            this.loading.onLoading();
            this.notificationProvider.deleteNotification(this.detailNoti._id).then(() => {
              this.loading.dismiss();
              this.navCtrl.pop();
            }, () => {
              this.loading.dismiss();
            });
          }
        },
        {
          text: cancel,
          role: 'cancel',
          cssClass: 'cancel',
          handler: () => {

          }
        }
      ]
    });
    alert.present();
  }

}
