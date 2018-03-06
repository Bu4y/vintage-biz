import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ChangePasswordModel } from '../../assets/model/user.model';
import { MoreServiceProvider } from '../more/more-service';
import { LoadingProvider } from '../../providers/loading/loading';
import { TranslateService } from '@ngx-translate/core';
/**
 * Generated class for the ChangePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {
  auth: ChangePasswordModel = new ChangePasswordModel();
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public moreService: MoreServiceProvider,
    private loading: LoadingProvider,
    private translate: TranslateService,
    public alertCtrl: AlertController,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePasswordPage');
  }

  changePassword() {
    this.loading.onLoading();
    this.moreService.changePassword(this.auth).then((data) => {
      this.loading.dismiss();
      this.navCtrl.pop();
    }, (err) => {
      this.loading.dismiss();
      let language = this.translate.currentLang;
      let textNotifications = language === 'th' ? 'การแจ้งเตือน' : 'Notification';
      let textError = language === 'th' ? 'เกิดข้อผิดพลาด กรุณาตรวจสอบรหัสผ่านและลองใหม่อีกครั้ง' : 'Error Please check your password and try again.';
      let textButton = language === 'th' ? 'ปิด' : 'Close'
      let alert = this.alertCtrl.create({
        title: textNotifications,
        subTitle: textError,
        buttons: [textButton]
      });
      alert.present();
    });
  }

}
