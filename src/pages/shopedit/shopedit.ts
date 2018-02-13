import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ActionSheetController } from 'ionic-angular';
import { ShopServiceProvider } from '../shop/shop-service';
import { CateModel } from '../shop/shop.model';
import { TranslateService } from '@ngx-translate/core';
import { LoadingProvider } from '../../providers/loading/loading';
/**
 * Generated class for the ShopeditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-shopedit',
  templateUrl: 'shopedit.html',
})
export class ShopeditPage {
  editData: any;
  cate: Array<CateModel>;
  categories = [];
  validateEmail: boolean = true;
  address: any = {
    address: '',
    addressdetail: '',
    subdistinct: '',
    distinct: '',
    province: '',
    postcode: '',
    lat: '',
    lng: ''
  }
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public shopServiceProvider: ShopServiceProvider,
    public loading: LoadingProvider,
    public actionSheetCtrl: ActionSheetController,
    private translate: TranslateService
  ) {
    this.editData = this.navParams.data;
    // let loadingCtrl = this.loading.create();
    this.loading.onLoading();
    this.shopServiceProvider.getCate().then(data => {
      this.cate = data;
      this.editData.categories.forEach(fcate => {
        data.forEach(dcate => {
          if (fcate._id.toString() === dcate._id.toString()) {
            this.categories.push(dcate);
          }
        });
      });
      this.loading.dismiss();
    }, (err) => {
      this.loading.dismiss();
      // window.localStorage.removeItem('bikebikeshop');
    });
  }
  validationEmail() {
    if (this.editData.email.indexOf('@') != -1) {
      this.validateEmail = true;
    } else {
      this.validateEmail = false;
    }
  }
  ionViewWillEnter() {
    this.validationEmail();
    this.address = window.localStorage.getItem('shop_location_address') ? JSON.parse(window.localStorage.getItem('shop_location_address')) : this.editData.address;
    this.editData.address = this.address ? this.address : this.editData.address;
    console.log(this.editData);
  }
  ionViewWillLeave() {
    if (window.localStorage.getItem('shop_location_address')) {
      window.localStorage.removeItem('shop_location_address');
    }
  }
  openActionsheet(item, i) {
    let language = this.translate.currentLang;
    let textEdit = language === 'th' ? 'แก้ไขเวลา' : 'Edit Times';
    let textDelete = language === 'th' ? 'ลบเวลา' : 'Delete Times';
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: textEdit,
          handler: () => {
            this.editTimes(item, i);
          }
        },
        {
          text: textDelete,
          handler: () => {
            this.deleteTimes(i);
          }
        }
      ]
    });
    actionSheet.present();
  }
  deleteTimes(index) {
    this.editData.times.splice(index, 1);
  }
  editTimes(item, i) {
    item.editMode = true;
    let modalopen = this.modalCtrl.create('ShoptimeeditPage', item);
    modalopen.onDidDismiss(datadismiss => {
      if (datadismiss) {
        this.editData.times[i] = datadismiss;
      }
    });
    modalopen.present();
  }
  addTime() {
    let ShoptimeModal = this.modalCtrl.create('ShoptimeeditPage');
    ShoptimeModal.onDidDismiss(data => {
      if (data) {
        this.editData.times.push(data);
      }
    });
    ShoptimeModal.present();
  }
  save() {
    this.editData.categories = this.categories;
    // let loadingCtrl = this.loading.create();
    this.loading.onLoading();
    this.shopServiceProvider.editShop(this.editData._id, this.editData).then((data) => {
      this.loading.dismiss();
      window.localStorage.removeItem('shop_location_address');
      this.navCtrl.setRoot('TabnavPage');
    }, (err) => {
      this.loading.dismiss();
      alert('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
      // alert(JSON.stringify(JSON.parse(err._body).message));
    });
  }
  showMap() {
    this.navCtrl.push('GoogleMapsPage');
  }
}
