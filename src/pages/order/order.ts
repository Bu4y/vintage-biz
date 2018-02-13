import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrderModel } from '../../assets/model/order.model';
import { OrderServiceProvider } from './order-service';
import { LoadingProvider } from '../../providers/loading/loading';
/**
 * Generated class for the OrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {
  orders: Array<OrderModel>;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public orderService: OrderServiceProvider,
    private loading : LoadingProvider
  ) {

  }
  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad OrderPage');
  //   this.getOrders();
  // }
  ionViewWillEnter(){
  this.getOrders();
   
  }
  doRefresh(refresher) {
    setTimeout(() => {
      refresher.complete();
    }, 1500);
  }
  getOrders() {
    this.loading.onLoading();
    this.orderService.getOrderList().then(data => {
      this.orders = data
    this.loading.dismiss();
    }, err => {
      console.log(err);
      this.loading.dismiss();
    })
  }
  gotoDetail(item) {
    this.navCtrl.push('OrderDetailPage', item);
  }
}
