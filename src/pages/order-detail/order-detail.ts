import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrderDetailModel } from '../../assets/model/order-detail.model';
import { OrderServiceProvider } from '../order/order-service';
import { AlertController } from 'ionic-angular';
import { LoadingProvider } from '../../providers/loading/loading';
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
  testRadioResult: string = '';
  testRadioOpen: boolean = false;
  order: OrderDetailModel = new OrderDetailModel();
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public orderService: OrderServiceProvider,
    public alertCtrl: AlertController,
    private loading: LoadingProvider
  ) {
    // this.navParams.data;
    this.loading.onLoading();
    this.orderService.getOrderDetail().then((data) => {
      this.order = data;
      this.loading.dismiss();
    }, (err) => {
      console.log(err);
      this.loading.dismiss();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderDetailPage');
  }
  doRadio() {
    let alert = this.alertCtrl.create();
    alert.setTitle('เหตุผลในการปฏิเสธสินค้า');

    alert.addInput({
      type: 'radio',
      label: 'สินค้าหมด',
      value: 'สินค้าหมด',
      checked: true
    });

    alert.addInput({
      type: 'radio',
      label: 'ไม่มีสินค้า',
      value: 'ไม่มีสินค้า'
    });

    alert.addInput({
      type: 'radio',
      label: 'ร้านค้าปิด',
      value: 'ร้านค้าปิด'
    });


    alert.addButton('Cancel');
    alert.addButton({
      text: 'Ok',
      handler: (data: any) => {
        console.log('Radio data:', data);
        this.testRadioOpen = false;
        this.testRadioResult = data;
      }
    });

    alert.present().then(() => {
      this.testRadioOpen = true;
    });
  }

}
