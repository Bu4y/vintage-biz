import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Auth } from '../../providers/auth-service/auth-service';
import { LoadingProvider } from '../../providers/loading/loading';
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
    public loading: LoadingProvider
  ) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  login() {
    // let loading = this.loading.create();
    this.loading.onLoading()
    this.auth.login(this.credentials).then((res) => {
      if (res.roles.indexOf('shop') >= 0) {
        window.localStorage.setItem('jjbiz-user', JSON.stringify(res));
        this.loading.dismiss();
        let isFirstLogin = window.localStorage.getItem('isjjbizfirstlogin');
        if (isFirstLogin) {
          this.navCtrl.setRoot('TabnavPage');
        } else {
          this.navCtrl.setRoot('Firstloginstep1Page');
        }
      } else {
        this.loading.dismiss();
        alert('คุณไม่มีสิทธิ์เข้าใช้งาน!');
        this.credentials.username = '';
        this.credentials.password = '';
      }
    }, (err) => {
      console.log(err);
      this.loading.dismiss();
      alert('เกิดข้อผิดพลาด กรุณาเข้าสู่ระบบอีกครั้ง');
      this.credentials.username = '';
      this.credentials.password = '';
    });
  }
}
