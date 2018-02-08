import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, Content, Platform, AlertController } from 'ionic-angular';
import { StatusServiceProvider } from './status-service';
import { OrderModel } from '../../assets/model/order.model';
import { TranslateService } from '@ngx-translate/core';

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
  orders: Array<OrderModel>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public statusService: StatusServiceProvider,
    public alertCtrl: AlertController,
    private translate: TranslateService
  ) {
    this.tabs = ["ที่ต้องจัดส่ง", "จัดส่งแล้ว", "สำเร็จ", "ยกเลิกแล้ว"];
    console.log('Width: ' + platform.width());
    this.screenWidth_px = platform.width();

  }
  // doRefresh(refresher) {
  //   setTimeout(() => {
  //     refresher.complete();
  //   }, 1500);
  // }
  ionViewWillEnter() {
    this.SwipedTabsIndicator = document.getElementById("indicator");
    for (let i in this.tabs)
      this.tabTitleWidthArray.push(document.getElementById("tabTitle" + i).offsetWidth);

    this.selectTab(0);
    this.getOrders();
  }
  scrollIndicatiorTab() {
    this.ItemsTitles.scrollTo(this.calculateDistanceToSpnd(this.SwipedTabsSlider.getActiveIndex()) - this.screenWidth_px / 2, 0);
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
    this.statusService.getOrderList().then(data => {
      this.orders = data;
      console.log(this.orders);
    }, err => {
      console.log(err);
    })
  }
  gotoDetail(item) {
    // this.navCtrl.push('OrderDetailPage', item);
    this.navCtrl.push('StatusDetailPage', item);
  }
  gotoDetail2(item) {
    this.navCtrl.push('OrderDetailPage', item);
  }
  refId(){
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
          name: refID,
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
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }
  rejectOrder(){
    let language = this.translate.currentLang;
    let rejectOrder = language === 'th' ? 'ปฏิเสธคำสั่งซื้อ' : 'Reject Order';
    let rejectComment = language === 'th' ? 'เหตุผลในการปฏิเสธคำสั่งซื้อ' : 'Please Comment your Reject Order';
    let textCancel = language === 'th' ? 'ยกเลิก' : 'Cancel';
    let textSave = language === 'th' ? 'บันทึก' : 'Save';
    let prompt = this.alertCtrl.create({
      title: rejectOrder,
      message: rejectComment,
      inputs: [
        {
          name: rejectOrder,
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
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }
}
