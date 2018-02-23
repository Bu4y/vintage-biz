import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, Platform } from 'ionic-angular';
import { StatusServiceProvider } from './../status/status-service';
import { ItemStatusModel } from '../../assets/model/status.model';
import { TranslateService } from '@ngx-translate/core';
import { LoadingProvider } from '../../providers/loading/loading';
/**
 * Generated class for the StatusDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-status-detail',
  templateUrl: 'status-detail.html',
})
export class StatusDetailPage {
  ordDetail: ItemStatusModel = new ItemStatusModel();
  isheight: number = 0;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private statusService: StatusServiceProvider,
    private loading: LoadingProvider,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private translate: TranslateService,
    private platform: Platform,
  ) {
    let itm = this.navParams.data;

    // let loading = this.loadingCtrl.create();
    this.loading.onLoading();
    this.statusService.getOrderDetail(itm).then(data => {
      this.ordDetail = data;
      // console.log(this.ordDetail);
      this.loading.dismiss();
    }, err => {
      this.loading.dismiss();
      console.log(err);
    })
  }

  ionViewWillEnter() {
    this.isheight =  this.platform.height();
    // alert(this.isheight);
  }

  rejectOrder() {
    let language = this.translate.currentLang;
    let rejectOrder = language === 'th' ? 'ปฏิเสธคำสั่งซื้อ' : 'Reject Order';
    let invalidRejectOrder = language === 'th' ? 'กรุณาระบุเหตุผลในการปฏิเสธคำสั่งซื้อ' : 'Please Comment your Reject Order';
    let rejectComment = language === 'th' ? 'เหตุผลในการปฏิเสธคำสั่งซื้อ' : 'Please Comment your Reject Order';
    let textCancel = language === 'th' ? 'ยกเลิก' : 'Cancel';
    let textSave = language === 'th' ? 'บันทึก' : 'Save';
    let prompt = this.alertCtrl.create({
      title: rejectOrder,
      message: rejectComment,
      inputs: [
        {
          name: 'rejectreason',
          placeholder: rejectOrder
        },
      ],
      buttons: [
        {
          text: textCancel,
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: textSave,
          handler: data => {
            if (data.rejectreason === '' || !data.rejectreason) {
              this.showErrorToast(invalidRejectOrder);
              return false;
            } else {
              let ord = {
                orderid: this.ordDetail.orderid,
                itemid: this.ordDetail.itemid,
                remark: data.rejectreason
              };
              // let loading = this.loadingCtrl.create();
              this.loading.onLoading();
              this.statusService.orderReject(ord).then(data => {
                this.navCtrl.pop();
                this.loading.dismiss();
              }, err => {
                this.loading.dismiss();
                console.log(err);
              })
              console.log('Saved clicked');
            }
          }
        }
      ]
    });
    prompt.present();
  }

  sentOrder(itm) {
    let language = this.translate.currentLang;
    let refID = language === 'th' ? 'เลขพัสดุ' : 'RefID';
    let messageRefID = language === 'th' ? 'กรุณากรอกเลขพัสดุ' : 'Please Enter your RefID';

    let textCancel = language === 'th' ? 'ยกเลิก' : 'Cancel';
    let textSave = language === 'th' ? 'บันทึก' : 'Save';
    let prompt = this.alertCtrl.create({
      title: refID,
      message: messageRefID,
      inputs: [
        {
          name: 'refID',
          placeholder: refID
        },
      ],
      buttons: [
        {
          text: textCancel,
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: textSave,
          handler: data => {
            if (data.refID === '' || !data.refID) {
              this.showErrorToast(messageRefID);
              return false;
            } else {
              let ord = {
                orderid: this.ordDetail.orderid,
                itemid: this.ordDetail.itemid,
                refid: data.refID
              };
              // let loading = this.loadingCtrl.create();
              this.loading.onLoading();
              this.statusService.orderSent(ord).then(data => {
                this.navCtrl.pop();
                this.loading.dismiss();
              }, err => {
                this.loading.dismiss();
                console.log(err);
              })
              console.log('Saved clicked');
            }
          }
        }
      ]
    });
    prompt.present();
  }
  showErrorToast(data: any) {
    let toast = this.toastCtrl.create({
      message: data,
      duration: 3000,
      position: 'top',
      // cssClass: 'toast'  
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
}
