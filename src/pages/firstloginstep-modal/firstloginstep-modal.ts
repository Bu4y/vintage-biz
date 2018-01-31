import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';

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
    public loadingCtrl: LoadingController
  ){
    this.firstLogin = this.navParams.data;
  }
  ionViewWillEnter() {
    let loading = this.loadingCtrl.create();
    loading.present();
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
    loading.dismiss();
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
      alert('เกิดข้อผิดพลาด กรุณาเลือดเวลาเปิด-ปิด');
    }
  }
  closeModel() {
    this.viewCtrl.dismiss();
  }
}
