import { Component, ViewChild } from '@angular/core';
import { Slides, IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the GreetingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-greeting',
  templateUrl: 'greeting.html',
})
export class GreetingPage {
  lastSlide = false;
  platformWidth: Number = 0;

  @ViewChild('slider') slider: Slides;
  slideIndex = 0;
  slides = [
    {
      title: 'Dream\'s Adventure',
      imageUrl: './assets/imgs/greetingshop/vin1.png',
      descriptionen: 'Manage own account easily',
      descriptionth: 'จัดการร้านง่ายๆเพียงปลายนิ้ว',
    },
    {
      title: 'For the Weekend',
      imageUrl: './assets/imgs/greetingshop/vin2.png',
      descriptionen: 'Product management',
      descriptionth: 'จัดการสินค้า',
    },
    {
      title: 'For the Weekend',
      imageUrl: './assets/imgs/greetingshop/vin3.png',
      descriptionen: 'Manage your orders',
      descriptionth: 'จัดการรายการ การสั่งซื้อ',
    },
    {
      title: 'For the Weekend',
      imageUrl: './assets/imgs/greetingshop/vin4.png',
      descriptionen: 'Status of orders',
      descriptionth: 'สถานะการสั้งซื้อ',
    },
    {
      title: 'For the Weekend',
      imageUrl: './assets/imgs/greetingshop/vin5.png',
      descriptionen: 'View revenue history',
      descriptionth: 'ตรวจสอบรายได้ของร้าน',
    }
  ];
  language: string;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private translate: TranslateService, ) {
  }

  ionViewWillEnter() {
    // this.platformWidth = this.platform.width();
    this.language = this.translate.currentLang;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad GreetingPage');
  }
  onSlideChanged() {
    this.slideIndex = this.slider.getActiveIndex();
    console.log('Slide changed! Current index is', this.slideIndex);
  }
  goToApp() {
    this.navCtrl.setRoot('AgreementPage');
    console.log('Go to App clicked');
  }
  skip() {
    this.lastSlide = true;
    this.slider.slideTo(this.slider.length());
  }

}
