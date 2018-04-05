import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { ShopModel } from '../shop/shop.model';
import { ImagePicker } from '@ionic-native/image-picker';
import { ShopServiceProvider } from '../shop/shop-service';
import * as firebase from 'firebase';
import { Auth } from '../../providers/auth-service/auth-service';
import { Crop } from '@ionic-native/crop';
import { Camera, CameraOptions, CameraPopoverOptions } from '@ionic-native/camera';
import { TranslateService } from '@ngx-translate/core';
import { LoadingProvider } from '../../providers/loading/loading';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  firstLogin: any = {};
  citizenid: boolean = false;
  images: Array<any> = [];
  profileImg: string = '';
  myDate: String = new Date().toISOString();
  shop: ShopModel = new ShopModel();
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public imagePicker: ImagePicker,
    public loading: LoadingController,
    public loadingCtrl: LoadingProvider,
    public shopServiceProvider: ShopServiceProvider,
    private auth: Auth,
    private crop: Crop,
    private camera: Camera,
    public actionSheetCtrl: ActionSheetController,
    private translate: TranslateService,
    private alertCtrl: AlertController,
    private cdRef: ChangeDetectorRef
  ) {
    this.shopServiceProvider.getShop().then(data => {
      this.shop = data;
    }, (err) => {
      // window.localStorage.removeItem('bikebikeshop');
    });
    let getfirstLogin = JSON.parse(window.localStorage.getItem('jjbiz-user'));
    getfirstLogin.profileImageURL = getfirstLogin.profileImageURL ? getfirstLogin.profileImageURL : './assets/imgs/Upload-Profile.png';
    getfirstLogin.dateOfBirth = getfirstLogin.dateOfBirth ? getfirstLogin.dateOfBirth : this.myDate;
    // let getDate = new Date();
    // let month = getDate.getUTCMonth() + 1; //months from 1-12
    // let day = getDate.getUTCDate();
    // let year = getDate.getUTCFullYear();
    this.firstLogin = getfirstLogin;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Firstloginstep1Page');
    this.citizenid = this.firstLogin.citizenid ? true : false;
  }
  mexInputLength(e, type) {
    if (type === 'bank') {
      this.cdRef.detectChanges();
      this.firstLogin.bankaccount = e.length > 10 ? e.substring(0, 10) : e;
    } else if (type === 'citizen') {
      this.cdRef.detectChanges();
      this.firstLogin.citizenid = e.length > 13 ? e.substring(0, 13) : e;
    }
  }
  // selectProfile() {
  //   this.onUpload('profile', 1);
  // }
  onUpload(from, maxImg) {
    let options = {
      maximumImagesCount: maxImg,
      width: 900,
      quality: 80,
      outputType: 1
    };
    this.imagePicker.getPictures(options).then((results) => {
      let loading = [];
      let loadingCount = 0;
      for (var i = 0; i < results.length; i++) {
        loading.push(this.loading.create({
          content: (i + 1) + '/' + (results.length),
          cssClass: `loading-upload`,
          showBackdrop: false
        }));
        loading[i].present();
        this.uploadImage(results[i]).then((resUrl) => {
          this.images.push(resUrl);

          setTimeout(() => {
            loading[loadingCount].dismiss();
            loadingCount++;

            if (loadingCount === results.length) {
              if (from.toString() === 'profile') {
                this.updateProfile();
              }
            }
          }, 1000);

        }, (error) => {
          loading[loadingCount].dismiss();
          loadingCount++;
          // alert('Upload Fail. ' + JSON.stringify(error));
        })
      }

    }, (err) => { });
  }
  // uploadImage(imageString): Promise<any> {

  //   let storageRef = firebase.storage().ref();
  //   let filename = Math.floor((Date.now() / 1000) + new Date().getUTCMilliseconds());
  //   let imageRef = storageRef.child(`images/${filename}.jpg`);
  //   let parseUpload: any;

  //   return new Promise((resolve, reject) => {
  //     parseUpload = imageRef.putString('data:image/jpeg;base64,' + imageString, 'data_url');
  //     parseUpload.on('state_changed', (_snapshot) => {
  //       let progress = (_snapshot.bytesTransferred / _snapshot.totalBytes) * 100;
  //       console.log('Upload is ' + progress + '% done');
  //       switch (_snapshot.state) {
  //         case firebase.storage.TaskState.PAUSED: // or 'paused'
  //           console.log('Upload is paused');
  //           break;
  //         case firebase.storage.TaskState.RUNNING: // or 'running'
  //           console.log('Upload is running');
  //           break;
  //       }
  //     },
  //       (_err) => {
  //         reject(_err);
  //       },
  //       (success) => {
  //         resolve(parseUpload.snapshot.downloadURL);
  //       });
  //   });
  // }
  updateProfile() {
    this.profileImg = this.images && this.images.length > 0 ? this.images[this.images.length - 1] : '';
    if (this.profileImg) {
      this.firstLogin.profileImageURL = this.profileImg;
    } else {
      this.firstLogin.profileImageURL = '';
    }
  }
  save() {
    if (this.firstLogin.bankaccount.length === 10) {
      this.auth.manageUser(this.firstLogin).then((data) => {
        window.localStorage.setItem('jjbiz-user', JSON.stringify(data));
        if (data.citizenid) {
          this.citizenid = true;
        } else {
          this.citizenid = false;
        }
        // console.log(this.citizenid);
        this.navCtrl.pop();
      }, (err) => {
        console.log(err);
        let language = this.translate.currentLang;
        let textNotifications = language === 'th' ? 'การแจ้งเตือน' : 'Notification';
        let textError = language === 'th' ? 'เกิดข้อผิดพลาด กรุณาบันทึกข้อมูลใหม่อีกครั้ง' : 'Error Please save the information again.';
        let textButton = language === 'th' ? 'ปิด' : 'Close'
        let alert = this.alertCtrl.create({
          // title: textNotifications,
          subTitle: textError,
          buttons: [textButton]
        });
        alert.present();
      });
    } else {
      let language = this.translate.currentLang;
      let textError = language === 'th' ? 'เลขที่บัญชี ไม่ถูกต้อง' : 'Invalid account number.';
      let textNotifications = language === 'th' ? 'การแจ้งเตือน' : 'Notification';
      let textButton = language === 'th' ? 'ปิด' : 'Close'
      let alert = this.alertCtrl.create({
        // title: textNotifications,
        subTitle: textError,
        buttons: [textButton]
      });
      alert.present();
    }
  }
  selectProfile() {
    let language = this.translate.currentLang;
    let textCamera = language === 'th' ? 'กล้อง' : 'Camera';
    let textGallery = language === 'th' ? 'อัลบั้มรูปภาพ' : 'Photo Gallery';
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: textGallery,
          handler: () => {
            this.onImagePicker('profile', 1);
          }
        },
        {
          text: textCamera,
          handler: () => {
            this.openCamera();
          }
        }
      ]
    });

    actionSheet.present();
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
  openCamera() {
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
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      // popoverOptions: popover,
      correctOrientation: true
    }
    // let loading = this.loading.create();
    this.camera.getPicture(options).then((imageData) => {
      this.loadingCtrl.onLoading();
      this.resizeImage(imageData).then((data) => {
        this.images.push(data);
        this.loadingCtrl.dismiss();
        this.updateProfile();
      }, (err) => {
        this.loadingCtrl.dismiss();
        console.log(err);
        // let language = this.translate.currentLang;
        //     let textNotifications = language === 'th' ? 'การแจ้งเตือน' : 'Notification';
        //     let textError = language === 'th' ? 'เกิดข้อผิดพลาด กรุณาอัพโหลดรูปใหม่อีกครั้ง' : 'Error Please upload a new image again.';
        //     let textButton = language === 'th' ? 'ปิด' : 'Close'
        //     let alert = this.alertCtrl.create({
        //       // title: textNotifications,
        //       subTitle: textError,
        //       buttons: [textButton]
        //     });
        //     alert.present();
      })
    }, (err) => {
      this.loadingCtrl.dismiss();
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
  onImagePicker(from, maxImg) {
    let options = {
      maximumImagesCount: maxImg,
      width: 900,
      quality: 80,
      outputType: 0
    };
    this.imagePicker.getPictures(options).then((results) => {
      // let loading = [];
      // let loadingCount = 0;
      this.loadingCtrl.onLoading();

      if (Array.isArray(results) && results.length > 0) {
        for (var i = 0; i < results.length; i++) {
          // this.loadingCtrl.onLoading();
          // loading.push(this.loading.create({
          //   content: (i + 1) + '/' + (results.length),
          //   cssClass: `loading-upload`,
          //   showBackdrop: false
          // }));
          // loading[i].present();
          // this.uploadImage(results[i]).then((resUrl) => {
          //   this.images.push(resUrl);
          //   setTimeout(() => {
          //     loading[loadingCount].dismiss();
          //     loadingCount++;
          //     if (loadingCount === results.length) {
          //       if (from.toString() === 'profile') {
          //         this.updateProfile();
          //       }
          //     }
          //   }, 1000);
          // }, (error) => {
          //   loading[loadingCount].dismiss();
          //   loadingCount++;
          //   // alert('Upload Fail. ' + JSON.stringify(error));
          // })
          this.resizeImage(results[i]).then((data) => {
            this.images.push(data);
            this.loadingCtrl.dismiss();
            this.updateProfile();
            // setTimeout(() => {
            //   loading[loadingCount].dismiss();
            //   loadingCount++;
            //   if (loadingCount === results.length) {
            //     if (from.toString() === 'profile') {
            //       this.updateProfile();
            //     }
            //   }
            // }, 1000);
          }, (err) => {
            this.loadingCtrl.dismiss();
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
          })
        }
      } else {
        this.loadingCtrl.dismiss();
      }
    }, (err) => {
      this.loadingCtrl.dismiss();
      // Handle error
    });
  }
  // step2() {
  //   this.firstLogin.coverimage = this.shop.coverimage ? this.shop.coverimage : 'no image';
  //   this.firstLogin.name = this.shop.name ? this.shop.name : '';
  //   this.firstLogin.name_eng = this.shop.name_eng ? this.shop.name_eng : '';
  //   this.firstLogin.detail = this.shop.detail ? this.shop.detail : '';
  //   this.firstLogin.email = this.shop.email ? this.shop.email : '';
  //   this.firstLogin.tel = this.shop.tel ? this.shop.tel : '';
  //   this.firstLogin.facebook = this.shop.facebook ? this.shop.facebook : '';
  //   this.firstLogin.line = this.shop.line ? this.shop.line : '';
  //   this.firstLogin.times = this.shop.times ? this.shop.times : [];
  //   this.firstLogin.categories = this.shop.categories ? this.shop.categories : [];
  //   this.firstLogin.address = this.shop.address ? this.shop.address : {};
  //   // alert(JSON.stringify(this.firstLogin.coverimage));
  //   this.navCtrl.setRoot(Firstloginstep2Page, this.firstLogin);
  // }
}
