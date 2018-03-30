import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ActionSheetController, AlertController } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { ShopServiceProvider } from '../shop/shop-service';
import { Camera, CameraOptions, CameraPopoverOptions } from '@ionic-native/camera';
import * as firebase from 'firebase';
import { TranslateService } from '@ngx-translate/core';
import { LoadingProvider } from '../../providers/loading/loading';
import { Crop } from '@ionic-native/crop';
/**
 * Generated class for the CreatecatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-createcate',
  templateUrl: 'createcate.html',
})
export class CreatecatePage {
  cate: any = {};
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private imagePicker: ImagePicker,
    public shopServiceProvider: ShopServiceProvider,
    public viewCtrl: ViewController,
    public actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    private loading: LoadingProvider,
    private translate: TranslateService,
    private crop: Crop,
    private alertCtrl: AlertController
  ) {
    if (this.navParams.data._id) {
      this.cate = this.navParams.data;
    } else {
      this.cate.image = this.navParams.data.img;
    }
    // console.log(this.navParams.data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatecatePage');
  }
  closeDismiss() {
    this.viewCtrl.dismiss();
  }
  openActionSheet(from, maxImg) {
    let language = this.translate.currentLang;
    let textCamera = language === 'th' ? 'กล้อง' : 'Camera';
    let textGallery = language === 'th' ? 'อัลบั้มรูปภาพ' : 'Photo Gallery';
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: textGallery,
          handler: () => {
            this.galleryCamera(from, maxImg);
          }
        },
        {
          text: textCamera,
          handler: () => {
            this.openCamera(from);
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
      quality: 80,
      destinationType: this.camera.DestinationType.FILE_URI,
      // popoverOptions: popover,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
      // allowEdit: true,
      // correctOrientation: true,
      // targetHeight: from !== 'cover' ? 600 : 600,
      // targetWidth: from !== 'cover' ? 600 : 800
    }
    // let loading = this.loading.create();
    this.camera.getPicture(options).then((imageData) => {
      // loading.present();
      this.loading.onLoading();
      // this.noResizeImage(imageData).then((data) => {
      this.resizeImage(imageData).then((data) => {
        this.cate.image = data;
        this.loading.dismiss();
      }, (err) => {
        this.loading.dismiss();
        console.log(err);
        // let language = this.translate.currentLang;
        // let textNotifications = language === 'th' ? 'การแจ้งเตือน' : 'Notification';
        // let textError = language === 'th' ? 'เกิดข้อผิดพลาด กรุณาอัพโหลดรูปใหม่อีกครั้ง' : 'Error Please upload a new image again.';
        // let textButton = language === 'th' ? 'ปิด' : 'Close'
        // let alert = this.alertCtrl.create({
        //   // title: textNotifications,
        //   subTitle: textError,
        //   buttons: [textButton]
        // });
        // alert.present();
      });
    }, (err) => {
      this.loading.dismiss();
      console.log(err);
    });
  }
  galleryCamera(from, maxImg) {
    // this.createprod.images = [];
    const options = {
      maximumImagesCount: maxImg,
      quality: 80,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      // allowEdit: true,
      // correctOrientation: true,
      // targetHeight: from !== 'cover' ? 600 : 600,
      // targetWidth: from !== 'cover' ? 600 : 900,
      // sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    // let loading = this.loading.create();
    // this.camera.getPicture(options).then((imageData) => {
    this.imagePicker.getPictures(options).then((imageData) => {
      this.loading.onLoading();
      if (Array.isArray(imageData) && imageData.length > 0) {
        for (var i = 0; i < imageData.length; i++) {

          this.resizeImage(imageData[i]).then((data) => {
            this.cate.image = data;
            this.loading.dismiss();
          }, (err) => {
            this.loading.dismiss();
            console.log(err);
            // let language = this.translate.currentLang;
            // let textNotifications = language === 'th' ? 'การแจ้งเตือน' : 'Notification';
            // let textError = language === 'th' ? 'เกิดข้อผิดพลาด กรุณาอัพโหลดรูปใหม่อีกครั้ง' : 'Error Please upload a new image again.';
            // let textButton = language === 'th' ? 'ปิด' : 'Close'
            // let alert = this.alertCtrl.create({
            //   // title: textNotifications,
            //   subTitle: textError,
            //   buttons: [textButton]
            // });
            // alert.present();
          });
        }
      } else {
        this.loading.dismiss();
      }
    }, (err) => {
      this.loading.dismiss();
      console.log(err);
    });

  }
  noResizeImage(fileUri): Promise<any> {
    // alert('resize');
    return new Promise((resolve, reject) => {
      // alert(JSON.stringify(cropData));
      this.uploadImage(fileUri).then((uploadImageData) => {
        resolve(uploadImageData);
      }, (uploadImageError) => {
        reject(uploadImageError)
      });
    });
  }
  resizeImage(fileUri): Promise<any> {
    return new Promise((resolve, reject) => {
      this.crop.crop(fileUri).then((cropData) => {
        this.uploadImage(cropData).then((uploadImageData) => {
          resolve(uploadImageData);
        }, (uploadImageError) => {
          reject(uploadImageError)
        });
      }, (cropError) => {
        reject(cropError)
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
  deleteCate() {
    this.cate.image = '';
  }
  save() {
    this.viewCtrl.dismiss(this.cate);
  }
}
