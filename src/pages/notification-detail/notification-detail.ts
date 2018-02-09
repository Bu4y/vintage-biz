import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.detailNoti = this.navParams.get('detail');
    console.log(this.detailNoti);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationDetailPage');
  }

  notificationDelete(){
    
  }

}
