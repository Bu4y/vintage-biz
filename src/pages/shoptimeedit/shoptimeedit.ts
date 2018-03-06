import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the ShoptimeeditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-shoptimeedit',
  templateUrl: 'shoptimeedit.html',
})
export class ShoptimeeditPage {
  editData: any = {};
  isCheck: boolean = false;
  addTime: any = {};
  // private day: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private translate: TranslateService,
    private alertCtrl: AlertController
  ) {
    this.editData = this.navParams.data;
  }
  ionViewWillEnter() {
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
    if (this.editData) {
      if (this.editData.days && this.editData.days.length > 0) {
        this.editData.days.forEach(fday => {
          days.forEach(dday => {
            if (fday === dday.name) {
              dday.checked = true;
            }
          });
        });
      }
    }
    let data = {
      detail: this.editData.description,
      openTime: this.editData.timestart,
      closeTime: this.editData.timeend,
      days: days
    }
    this.addTime = this.editData ? data : {
      detail: "",
      openTime: timenow,
      closeTime: timenow,
      days: days
    };
    this.addDays();
  }
  dismiss() {
    this.viewCtrl.dismiss();
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
          let textError = language === 'th' ? 'เกิดข้อผิดพลาด กรุณาเลือกเวลาเปิด-ปิด' : 'Error Please select time.';
          let textButton = language === 'th' ? 'ปิด' : 'Close'
          let alert = this.alertCtrl.create({
            title: textNotifications,
            subTitle: textError,
            buttons: [textButton]
          });
          alert.present();
    }
  }
}
