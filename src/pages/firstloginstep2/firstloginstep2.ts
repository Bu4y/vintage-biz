import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ActionSheetController } from 'ionic-angular';
// import { Firstloginstep3Page } from '../firstloginstep3/firstloginstep3';
// import { ImagePicker } from '@ionic-native/image-picker';
import * as firebase from 'firebase';
import { Camera, CameraOptions, CameraPopoverOptions } from '@ionic-native/camera';
import { ImagecoverProvider } from '../../providers/imagecover/imagecover';
import { TranslateService } from '@ngx-translate/core';
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
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loading: LoadingController,
    public actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    public imgCoverService: ImagecoverProvider,
    private translate: TranslateService,
  ) {

  }


  ionViewWillEnter() {
    this.firstLogin = JSON.parse(window.localStorage.getItem('jjbiz-firstlogin'));
  }
  ionViewWillLeave() {
    window.localStorage.setItem('jjbiz-firstlogin', JSON.stringify(this.firstLogin));
  }
  selectCover() {
    let language = this.translate.currentLang;
    let textCamera = language === 'th' ? 'กล้อง' : 'Camera';
    let textGallery = language === 'th' ? 'อัลบั้มรูปภาพ' : 'Photo Gallery';
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: textCamera,
          handler: () => {
            this.openCamera('cover');
          }
        },
        {
          text: textGallery,
          handler: () => {
            this.galleryCamera('cover');
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
      quality: 30,
      destinationType: this.camera.DestinationType.FILE_URI,
      popoverOptions: popover,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    }
    let loadingCtrl = this.loading.create();
    this.camera.getPicture(options).then((imageData) => {
      loadingCtrl.present();
      this.noResizeImage(imageData).then((data) => {
        this.images.push(data);
        loadingCtrl.dismiss();
        if (from.toString() === 'cover') {
          this.updateCover();
        }
      }, (err) => {
        loadingCtrl.dismiss();
        console.log(err);
      });
    }, (err) => {
      console.log(err);
    });
  }
  galleryCamera(from) {
    this.images = [];
    const options: CameraOptions = {
      quality: 30,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    let loadingCtrl = this.loading.create();
    this.camera.getPicture(options).then((imageData) => {
      loadingCtrl.present();
      this.noResizeImage(imageData).then((data) => {
        this.images.push(data);
        loadingCtrl.dismiss();
        if (from.toString() === 'cover') {
          this.updateCover();
        }
      }, (err) => {
        loadingCtrl.dismiss();
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
  updateCover() {
    this.coverImg = this.images && this.images.length > 0 ? this.images[this.images.length - 1] : '';
    let loadingCtrl = this.loading.create();
    loadingCtrl.present();
    this.imgCoverService.getMeta(this.coverImg).then((data) => {
      if (data) {
        if (this.coverImg) {
          this.firstLogin.coverimage = this.coverImg;
          loadingCtrl.dismiss();
        } else {
          this.firstLogin.coverimage = '';
          loadingCtrl.dismiss();
        }
      } else {
        loadingCtrl.dismiss();
        alert('ขนาดรูปไม่ถูกต้อง กรุณาตรวจสอบรูปและลองใหม่อีกครั้ง!');
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
