import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Auth } from '../../providers/auth-service/auth-service';
import { LoadingProvider } from '../../providers/loading/loading';
import { ShopServiceProvider } from '../shop/shop-service';
import { TranslateService } from '@ngx-translate/core';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private credentials: any = {};
  constructor(
    private auth: Auth,
    public navCtrl: NavController,
    public navParams: NavParams,
    public shopServiceProvider: ShopServiceProvider,
    public loading: LoadingProvider,
    private translate: TranslateService,
    public alertCtrl: AlertController
  ) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  login() {
    let language = this.translate.currentLang;
    let alertPermission = language === 'th' ? 'คุณไม่มีสิทธิ์เข้าใช้งาน!' : 'You do not have permission to access.';
    let alertInvalid = language === 'th' ? 'ชื่อผู้ใช้งาน หรือ รหัสผ่านไม่ถูกต้อง' : 'Username or password is invalid.';
    let title = language === 'th' ? 'การแจ้งเตือน' : 'Notifications';
    let okay = language === 'th' ? 'ตกลง' : 'OK';
    // let loading = this.loading.create();
    this.loading.onLoading()
    this.auth.login(this.credentials).then((res) => {
      if (res.roles.indexOf('shop') >= 0) {
        window.localStorage.setItem('jjbiz-user', JSON.stringify(res));
        this.loading.dismiss();
        // let isFirstLogin = window.localStorage.getItem('isjjbizfirstlogin');
        this.shopServiceProvider.getShop().then((data) => {
          if (data.islaunch) {
            this.navCtrl.setRoot('TabnavPage');
          } else {
            this.navCtrl.setRoot('Firstloginstep1Page');
          }
        }, (err) => {
          console.log(err);
        });

      } else {
        this.loading.dismiss();
        let alert = this.alertCtrl.create({
          title: title,
          subTitle: alertPermission,
          buttons: [okay]
        });
        alert.present()
        // alert(alertPermission);
        this.credentials.username = '';
        this.credentials.password = '';
      }
    }, (err) => {
      this.loading.dismiss();
      let alert = this.alertCtrl.create({
        title: title,
        subTitle: alertInvalid,
        buttons: [okay]
      });
      alert.present()
      this.credentials.username = '';
      this.credentials.password = '';
    });
  }
}
