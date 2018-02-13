import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChangePasswordModel } from '../../assets/model/user.model';
import { MoreServiceProvider } from '../more/more-service';
import { LoadingProvider } from '../../providers/loading/loading';
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
    private loading: LoadingProvider
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
      alert('เกิดข้อผิดพลาดกรุณาตรวจสอบรหัสผ่านและลองใหม่อีกครั้ง');
    });
  }

}
