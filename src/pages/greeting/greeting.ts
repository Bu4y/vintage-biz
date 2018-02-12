import { Component, ViewChild } from '@angular/core';
import { Slides, IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

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
      description: 'จัดการร้านง่ายๆเพียงปลายนิ้ว',
    },
    {
      title: 'For the Weekend',
      imageUrl: './assets/imgs/greetingshop/vin2.png',
      description: 'จัดการสินค้า',
    },
    {
      title: 'For the Weekend',
      imageUrl: './assets/imgs/greetingshop/vin3.png',
      description: 'จัดการรายการ การสั่งซื้อ',
    },
    {
      title: 'For the Weekend',
      imageUrl: './assets/imgs/greetingshop/vin4.png',
      description: 'สถานะการสั้งซื้อ',
    },
    {
      title: 'For the Weekend',
      imageUrl: './assets/imgs/greetingshop/vin5.png',
      description: 'ตรวจสอบรายได้ของร้าน',
    }
  ];
  constructor(public navCtrl: NavController, public navParams: NavParams,public platform: Platform) {
  }
  ionViewWillEnter(){
    // this.platformWidth = this.platform.width();
   console.log(this.platform.width());
   
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
