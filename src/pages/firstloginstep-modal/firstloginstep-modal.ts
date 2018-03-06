import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { LoadingProvider } from '../../providers/loading/loading';
import { TranslateService } from '@ngx-translate/core';
/**
 * Generated class for the FirstloginstepModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-firstloginstep-modal',
  templateUrl: 'firstloginstep-modal.html',
})
export class FirstloginstepModalPage {
  firstLogin: any = {};
  // addTime: any = [];
  addTime: any = {};
  isCheck: boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public loading: LoadingProvider,
    private translate: TranslateService,
    private alertCtrl: AlertController
  ) {
    this.firstLogin = this.navParams.data;
  }
  ionViewWillEnter() {
    // let loading = this.loadingCtrl.create();
    this.loading.onLoading();
    let timenow = new Date();
    let days = [{
      name: 'จันทร์',
      checked: false
    },
    {
      name: 'อังคาร',
      checked: false
    },
    {
      name: 'พุธ',
      checked: false
    },
    {
      name: 'พฤหัสบดี',
      checked: false
    },
    {
      name: 'ศุกร์',
      checked: false
    },
    {
      name: 'เสาร์',
      checked: false
    },
    {
      name: 'อาทิตย์',
      checked: false
    }];
    if (this.firstLogin) {
      if (this.firstLogin.days && this.firstLogin.days.length > 0) {
        this.firstLogin.days.forEach(fday => {
          days.forEach(dday => {
            if (fday === dday.name) {
              dday.checked = true;
            }
          });
        });
      }
    }
    let data = {
      detail: this.firstLogin.description,
      openTime: this.firstLogin.timestart,
      closeTime: this.firstLogin.timeend,
      days: days
    }
    this.addTime = this.firstLogin ? data : {
      detail: "",
      openTime: timenow,
      closeTime: timenow,
      days: days
    };
    this.addDays();
    this.loading.dismiss();
  }
  ionViewWillLeave() {
    window.localStorage.setItem('firstlogin', JSON.stringify(this.firstLogin));
  }
  addDays() {
    this.isCheck = false;
    this.addTime.days.forEach(e => {
      if (e.checked) {
        this.isCheck = true;
      }
    });
  }
  add(data) {
    let newDay = [];
    data.days.forEach(day => {
      if (day.checked === true) {
        newDay.push(day.name);
      }
    });
    let resData = {
      description: data.detail,
      timestart: data.openTime,
      timeend: data.closeTime,
      days: newDay
    };
    if (data.openTime && data.closeTime) {
      this.viewCtrl.dismiss(resData);
    } else {
      let language = this.translate.currentLang;
      let textNotifications = language === 'th' ? 'การแจ้งเตือน' : 'Notification';
      let textError = language === 'th' ? 'เกิดข้อผิดพลาด กรุณาเลือกเวลาเปิด-ปิด' : 'Error Please select Time.';
      let textButton = language === 'th' ? 'ปิด' : 'Close'
      let alert = this.alertCtrl.create({
        title: textNotifications,
        subTitle: textError,
        buttons: [textButton]
      });
      alert.present();
    }
  }
  closeModel() {
    this.viewCtrl.dismiss();
  }
}
