import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrderDetailModel } from '../../assets/model/order-detail.model';
import { OrderServiceProvider } from '../order/order-service';

/**
 * Generated class for the OrderDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-detail',
  templateUrl: 'order-detail.html',
})
export class OrderDetailPage {
  order: OrderDetailModel = new OrderDetailModel();
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public orderService: OrderServiceProvider
  ) {
    // this.navParams.data;
    this.orderService.getOrderDetail().then((data) => {
      this.order = data;
    }, (err) => {
      console.log(err);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderDetailPage');
  }

}
