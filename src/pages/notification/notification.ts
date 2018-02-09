import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {

  notificationData = [
    {
      "day": "Wed Jan 31 2018 16:21:38 GMT+0700 (SE Asia Standard Time)",
      "description": "The email notification is triggered by an event, which is triggered by a business rule. Events can be triggered by business rules and, in turn, reacted to elsewhere."
    },
    {
      "day": "Thu Feb 19 2018 19:00:00 GMT+0700 (SE Asia Standard Time)",
      "description": "The email notification is triggered by an event, which is triggered by a business rule. Events can be triggered by business rules and, in turn, reacted to elsewhere."
    },
    {
      "day": "Thu Feb 21 2018 19:00:00 GMT+0700 (SE Asia Standard Time)",
      "description": "The email notification is triggered by an event, which is triggered by a business rule. Events can be triggered by business rules and, in turn, reacted to elsewhere."
    }
  ]
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');
  }

  getDescription(e) {
    this.navCtrl.push('NotificationDetailPage', { detail: e });
  }

}
