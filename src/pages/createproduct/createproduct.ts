import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ActionSheetController, LoadingController } from 'ionic-angular';
import { ShopServiceProvider } from '../shop/shop-service';
import { Camera, CameraOptions, CameraPopoverOptions } from '@ionic-native/camera';
import * as firebase from 'firebase';
import { TranslateService } from '@ngx-translate/core';
import { ShippingMasterModel } from '../../assets/model/shippingmaster.model';

/**
 * Generated class for the CreateproductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-createproduct',
  templateUrl: 'createproduct.html',
})
export class CreateproductPage {
  createprod: any = {};
  // images: Array<any> = [];
  shippings: Array<ShippingMasterModel> = [];
  selectedshippings = [];
  customShippings= [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public shopServiceProvider: ShopServiceProvider,
    public viewCtrl: ViewController,
    public actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    private loading: LoadingController,
    private translate: TranslateService

  ) {
    this.createprod.shippings = [];
    if (this.navParams.data._id) {
      let loading = this.loading.create();
      loading.present();
      this.shopServiceProvider.getProduct(this.navParams.data._id).then((data) => {
        let images = [];
        data.images.forEach(img => {
          images.push(img);
        });
        this.createprod._id = data._id;
        this.createprod.name = data.name;
        this.createprod.price = data.price;
        this.createprod.detail = data.detail;
        this.createprod.images = images;
        this.createprod.issale = data.issale ? data.issale : false;
        this.createprod.ispromotionprice = data.ispromotionprice ? data.ispromotionprice : false;
        this.createprod.isrecommend = data.isrecommend ? data.isrecommend : false;
        this.createprod.promotionprice = data.promotionprice ? data.promotionprice : null;
        this.createprod.startdate = data.startdate;
        this.createprod.expiredate = data.expiredate;
        loading.dismiss();
      }, (err) => {
        loading.dismiss();
        console.log(err);
      })
    } else {
      this.createprod.cateindex = this.navParams.data.cateindex;
      this.createprod.index = this.navParams.data.index;
      this.createprod.categories = this.navParams.data.cate;
      this.createprod.images = this.navParams.data.images;
    }
    this.getShippingmaster();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateproductPage');
  }
  getShippingmaster() {
    this.shopServiceProvider.getShippingmaster().then((data) => {
      console.log(data);
      this.shippings = data;
    }, (err) => {
      console.log(err);
    })
  }

  checkedPromotion() {
    if (this.createprod.ispromotionprice === false) {
      this.createprod.promotionprice = null;
      this.createprod.startdate = null;
      this.createprod.expiredate = null;
    }
  }
  openActionSheet(from) {
    let language = this.translate.currentLang;
    let textCamera = language === 'th' ? 'กล้อง' : 'Camera';
    let textGallery = language === 'th' ? 'อัลบั้มรูปภาพ' : 'Photo Gallery';
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: textCamera,
          handler: () => {
            this.openCamera(from);
          }
        },
        {
          text: textGallery,
          handler: () => {
            this.galleryCamera(from);
          }
        }
      ]
    });
    actionSheet.present();
  }
  openCamera(from) {
    // this.createprod.images = [];
    const popover: CameraPopoverOptions = {
      x: 0,
      y: 32,
      width: 320,
      height: 480,
      arrowDir: this.camera.PopoverArrowDirection.ARROW_ANY
    }
    const options: CameraOptions = {
      quality: 30,
      destinationType: this.camera.DestinationType.FILE_URI,
      popoverOptions: popover,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true,
      correctOrientation: true,
      targetHeight: from !== 'cover' ? 150 : 150,
      targetWidth: from !== 'cover' ? 150 : 450
    }
    let loading = this.loading.create();
    this.camera.getPicture(options).then((imageData) => {
      loading.present();
      this.noResizeImage(imageData).then((data) => {
        this.createprod.images.push(data);
        loading.dismiss();
      }, (err) => {
        loading.dismiss();
        console.log(err);
      });
    }, (err) => {
      console.log(err);
    });
  }
  galleryCamera(from) {
    // this.createprod.images = [];
    const options: CameraOptions = {
      quality: 30,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true,
      correctOrientation: true,
      targetHeight: from !== 'cover' ? 300 : 300,
      targetWidth: from !== 'cover' ? 300 : 600,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    let loading = this.loading.create();
    this.camera.getPicture(options).then((imageData) => {
      loading.present();
      this.noResizeImage(imageData).then((data) => {
        this.createprod.images.push(data);
        loading.dismiss();
      }, (err) => {
        loading.dismiss();
        console.log(err);
      });
    }, (err) => {
      console.log(err);
    });
  }
  noResizeImage(fileUri): Promise<any> {
    return new Promise((resolve, reject) => {
      this.uploadImage(fileUri).then((uploadImageData) => {
        resolve(uploadImageData);
      }, (uploadImageError) => {
        reject(uploadImageError)
      });
    });
  }
  uploadImage(imageString): Promise<any> {
    return new Promise((resolve, reject) => {
      const storageRef = firebase.storage().ref();
      const filename = Math.floor((Date.now() / 1000) + new Date().getUTCMilliseconds());
      let imageRef = storageRef.child(`images/${filename}.png`);
      let parseUpload: any;
      let metadata = {
        contentType: 'image/png',
      };
      let xhr = new XMLHttpRequest();
      xhr.open('GET', imageString, true);
      xhr.responseType = 'blob';
      xhr.onload = (e) => {
        let blob = new Blob([xhr.response], { type: 'image/png' });
        parseUpload = imageRef.put(blob, metadata);
        parseUpload.on('state_changed', (_snapshot) => {
          let progress = (_snapshot.bytesTransferred / _snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (_snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
          }
        },
          (_err) => {
            reject(_err);
          },
          (success) => {
            resolve(parseUpload.snapshot.downloadURL);
          });
      }
      xhr.send();
    });
  }
  deleteProd(i) {
    this.createprod.images.splice(i, 1);
  }
  save() {
    console.log(this.createprod);
    this.viewCtrl.dismiss(this.createprod);
  }
  closeDismiss() {
    this.viewCtrl.dismiss();
  }
  selectedshipping() {

    console.log(this.shippings);
    let customShippings = [];
    let shippings = this.shippings;
    this.selectedshippings.forEach(function (ship) {
      shippings.forEach(function (shipp) {
        if (ship === shipp._id.toString()) {
          customShippings.push({
            _id: shipp._id,
            name: shipp.name,
            detail: shipp.detail,
            price: 0
          });
        }
      });
    });
    this.customShippings = customShippings;
  }

}
