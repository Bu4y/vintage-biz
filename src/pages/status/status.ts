import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, Content, Platform, AlertController, ToastController } from 'ionic-angular';
import { StatusServiceProvider } from './status-service';
// import { OrderModel } from '../../assets/model/order.model';
import { TranslateService } from '@ngx-translate/core';
import { StatusModel } from '../../assets/model/status.model';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';

/**
 * Generated class for the StatusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-status',
  templateUrl: 'status.html',
})
export class StatusPage {
  @ViewChild('SwipedTabsSlider') SwipedTabsSlider: Slides;
  @ViewChild('MultiItemsScrollingTabs') ItemsTitles: Content;

  SwipedTabsIndicator: any = null;
  tabTitleWidthArray: any = [];
  tabElementWidth_px: number = 50;
  screenWidth_px: number = 0;
  isRight: boolean = true;
  isLeft: boolean = true;
  tabs: any = [];
  orders: Array<StatusModel>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public statusService: StatusServiceProvider,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private translate: TranslateService,
    private loading: LoadingController
  ) {
  }
  // doRefresh(refresher) {
  //   setTimeout(() => {
  //     refresher.complete();
  //   }, 1500);
  // }
 
  scrollIndicatiorTab() {
    this.ItemsTitles.scrollTo(this.calculateDistanceToSpnd(this.SwipedTabsSlider.getActiveIndex()) - this.screenWidth_px / 2, 0);
  }
  ionViewWillEnter() {
    this.tabTitleWidthArray = [];
    this.tabs = ['TO_SHIPPING', 'SHIPPED', 'COMPLETED', 'CANCELLED'];
    this.screenWidth_px = this.platform.width();
    setTimeout(() => {
      this.SwipedTabsIndicator = document.getElementById("indicator");
      for (let i in this.tabs) this.tabTitleWidthArray.push(document.getElementById("tabTitle" + i).offsetWidth);
      this.selectTab(0);
      this.getOrders();
      console.log(this.tabTitleWidthArray);
    }, 300);
  }

  selectTab(index) {
    this.SwipedTabsIndicator.style.width = this.tabTitleWidthArray[index] + "px";
    this.SwipedTabsIndicator.style.webkitTransform = 'translate3d(' + (this.calculateDistanceToSpnd(index)) + 'px,0,0)';
    this.SwipedTabsSlider.slideTo(index);
  }

  calculateDistanceToSpnd(index) {
    var result = 0;
    for (var _i = 0; _i < index; _i++) {
      result = result + this.tabTitleWidthArray[_i];
    }
    return result;
  }

  updateIndicatorPosition() {
    var index = this.SwipedTabsSlider.getActiveIndex();
    if (this.SwipedTabsSlider.length() == index)
      index = index - 1;

    this.SwipedTabsIndicator.style.width = this.tabTitleWidthArray[index] + "px";
    this.SwipedTabsIndicator.style.webkitTransform = 'translate3d(' + (this.calculateDistanceToSpnd(index)) + 'px,0,0)';

  }

  updateIndicatorPositionOnTouchEnd() {
    setTimeout(() => { this.updateIndicatorPosition(); }, 200);
  }

  animateIndicator($event) {

    this.isLeft = false;
    this.isRight = false;
    var currentSliderCenterProgress = (1 / (this.SwipedTabsSlider.length() - 1)) * this.SwipedTabsSlider.getActiveIndex();
    if ($event.progress < currentSliderCenterProgress) {
      this.isLeft = true;
      this.isRight = false;

    } if ($event.progress > currentSliderCenterProgress) {
      this.isLeft = false;
      this.isRight = true;
    }

    if (this.SwipedTabsSlider.isEnd())
      this.isRight = false;

    if (this.SwipedTabsSlider.isBeginning())
      this.isLeft = false;

    if (this.isRight)
      this.SwipedTabsIndicator.style.webkitTransform =
        'translate3d(' + (this.calculateDistanceToSpnd(this.SwipedTabsSlider.getActiveIndex())
          + ($event.progress - currentSliderCenterProgress) * (this.SwipedTabsSlider.length() - 1) * this.tabTitleWidthArray[this.SwipedTabsSlider.getActiveIndex() + 1])
        + 'px,0,0)';

    if (this.isLeft)
      this.SwipedTabsIndicator.style.webkitTransform =
        'translate3d(' + (this.calculateDistanceToSpnd(this.SwipedTabsSlider.getActiveIndex())
          + ($event.progress - currentSliderCenterProgress) * (this.SwipedTabsSlider.length() - 1) * this.tabTitleWidthArray[this.SwipedTabsSlider.getActiveIndex() - 1])
        + 'px,0,0)';

    if (!this.isRight && !this.isLeft)
      this.SwipedTabsIndicator.style.width = this.tabTitleWidthArray[this.SwipedTabsSlider.getActiveIndex()] + "px";

  }

  getOrders() {
    let id = window.localStorage.getItem('shopID');
    let loading = this.loading.create();
    loading.present();
    this.statusService.getOrder(id).then(data => {
      this.orders = data;
      console.log(this.orders);
      loading.dismiss();
    }, err => {
      loading.dismiss();
      console.log(err);
    })
  }
  gotoDetail(itm) {
    // this.navCtrl.push('OrderDetailPage', item);
    // console.log(itm);
    this.navCtrl.push('StatusDetailPage', itm);
  }
  gotoDetail2(item) {
    this.navCtrl.push('OrderDetailPage', item);
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
                orderid: itm.orderid,
                itemid: itm.itemid,
                refid: data.refID
              };
              let loading = this.loading.create();
              loading.present();
              this.statusService.orderSent(ord).then(data => {
                this.getOrders();
                loading.dismiss();
              }, err => {
                loading.dismiss();
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
  rejectOrder(itm) {
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
                orderid: itm.orderid,
                itemid: itm.itemid,
                remark: data.rejectreason
              };
              let loading = this.loading.create();
              loading.present();
              this.statusService.orderReject(ord).then(data => {
                this.getOrders();
                loading.dismiss();
              }, err => {
                loading.dismiss();
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
  // completedOrder(itm) {
  //   let ord = {
  //     orderid: itm.orderid,
  //     itemid: itm.itemid,
  //   };
  //   let loading = this.loading.create();
  //   loading.present();
  //   this.statusService.orderComplete(ord).then(data => {
  //     this.getOrders();
  //     loading.dismiss();
  //   }, err => {
  //     loading.dismiss();
  //     console.log(err);
  //   })
  // }
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
