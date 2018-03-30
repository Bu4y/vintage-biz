import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';
// import { Firstloginstep3Page } from '../firstloginstep3/firstloginstep3';
// import { ImagePicker } from '@ionic-native/image-picker';
import * as firebase from 'firebase';
import { Camera, CameraOptions, CameraPopoverOptions } from '@ionic-native/camera';
import { ImagecoverProvider } from '../../providers/imagecover/imagecover';
import { TranslateService } from '@ngx-translate/core';
import { LoadingProvider } from '../../providers/loading/loading';
import { ImagePicker } from '@ionic-native/image-picker';
/**
 * Generated class for the Firstloginstep2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-firstloginstep2',
  templateUrl: 'firstloginstep2.html',
})
export class Firstloginstep2Page {
  firstLogin: any = {};
  images: Array<any> = [];
  coverImg: string = '';
  unshipImg: Array<any> = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loading: LoadingProvider,
    public actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    public imgCoverService: ImagecoverProvider,
    private translate: TranslateService,
    public imagePicker: ImagePicker,
    public alertCtrl: AlertController
  ) {
  }

  ionViewWillEnter() {
    this.firstLogin = JSON.parse(window.localStorage.getItem('jjbiz-firstlogin'));
    this.unshipImg.unshift(this.firstLogin.coverimage);
  }
  ionViewWillLeave() {
    window.localStorage.setItem('jjbiz-firstlogin', JSON.stringify(this.firstLogin));
  }
  resetCover() {
    this.unshipImg.splice(0, 1);
    this.firstLogin.coverimage = this.unshipImg[0];
    // if(this.unshipImg.length === 1){
    //   this.firstLogin.coverimage = this.unshipImg[0];
    // }
  }
  selectCover(from, maxImg) {
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
    this.images = [];
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
    }
    // let loadingCtrl = this.loading.create();
    this.camera.getPicture(options).then((imageData) => {
      this.loading.onLoading();
      this.noResizeImage(imageData).then((data) => {
        this.images.push(data);
        this.loading.dismiss();
        this.updateCover();
      }, (err) => {
        this.loading.dismiss();
        console.log(err);
        let language = this.translate.currentLang;
        let textNotifications = language === 'th' ? 'การแจ้งเตือน' : 'Notification';
        let textError = language === 'th' ? 'เกิดข้อผิดพลาด กรุณาอัพโหลดรูปใหม่อีกครั้ง' : 'Error Please upload a new image again.';
        let textButton = language === 'th' ? 'ปิด' : 'Close'
        let alert = this.alertCtrl.create({
          // title: textNotifications,
          subTitle: textError,
          buttons: [textButton]
        });
        alert.present();
      });
    }, (err) => {
      this.loading.dismiss();
      console.log(err);
    });
  }
  galleryCamera(from, maxImg) {
    this.images = [];
    const options = {
      maximumImagesCount: maxImg,
      quality: 80,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      // correctOrientation: true,
      // sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    // let loadingCtrl = this.loading.create();
    // this.camera.getPicture(options).then((imageData) => {
    this.imagePicker.getPictures(options).then((imageData) => {
      this.loading.onLoading();
      if (Array.isArray(imageData) && imageData.length > 0) {
        this.noResizeImage(imageData[0]).then((data) => {
          this.images.push(data);
          this.loading.dismiss();
          this.updateCover();
        }, (err) => {
          this.loading.dismiss();
          console.log(err);
          let language = this.translate.currentLang;
          let textNotifications = language === 'th' ? 'การแจ้งเตือน' : 'Notification';
          let textError = language === 'th' ? 'เกิดข้อผิดพลาด กรุณาอัพโหลดรูปใหม่อีกครั้ง' : 'Error Please upload a new image again.';
          let textButton = language === 'th' ? 'ปิด' : 'Close'
          let alert = this.alertCtrl.create({
            // title: textNotifications,
            subTitle: textError,
            buttons: [textButton]
          });
          alert.present();
        });
      } else {
        this.loading.dismiss();
      }
    }, (err) => {
      this.loading.dismiss();
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
  updateCover() {
    this.coverImg = this.images && this.images.length > 0 ? this.images[this.images.length - 1] : '';
    // this.unshipImg.unshift(this.firstLogin.coverimage);

    // this.currentCountImg = this.unshipImg.length;
    // let loadingCtrl = this.loading.create();
    this.loading.onLoading();
    this.imgCoverService.getMeta(this.coverImg).then((data) => {
      if (data) {
        this.unshipImg.unshift(this.coverImg);
        if (this.coverImg) {
          this.firstLogin.coverimage = this.coverImg;
          this.loading.dismiss();
        } else {
          this.firstLogin.coverimage = '';
          this.loading.dismiss();
        }
      } else {
        this.loading.dismiss();
        let language = this.translate.currentLang;
        let textNotifications = language === 'th' ? 'การแจ้งเตือน' : 'Notification';
        let textInvalidImage = language === 'th' ? 'ขนาดรูปไม่ถูกต้อง กรุณาตรวจสอบรูปและลองใหม่อีกครั้ง!' : 'Invalid image size. Please check the picture and try again!';
        let textButton = language === 'th' ? 'ปิด' : 'Close'
        let alert = this.alertCtrl.create({
          // title: textNotifications,
          subTitle: textInvalidImage,
          buttons: [textButton]
        });
        alert.present();
      }
    }, (err) => {
      console.log(err);
    });
  }
  step3() {
    window.localStorage.setItem('jjbiz-firstlogin', JSON.stringify(this.firstLogin));
    this.navCtrl.push('Firstloginstep3Page');
  }
}
