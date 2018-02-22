import { Component, ViewChild } from '@angular/core';
import {
  App,
  IonicPage,
  ModalController,
  NavController,
  NavParams,
  PopoverController,
  Slides,
  LoadingController,
  ActionSheetController,
} from 'ionic-angular';
import { ShopModel } from "./shop.model";
import { ShopServiceProvider } from "./shop-service"
import { ImagePicker } from '@ionic-native/image-picker';
import * as firebase from 'firebase';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { SortablejsOptions } from 'angular-sortablejs/dist';
import { GalleryModal } from 'ionic-gallery-modal';
import { UserModel } from '../../assets/model/user.model';
import { Crop } from '@ionic-native/crop';
import { Camera, CameraOptions, CameraPopoverOptions } from '@ionic-native/camera';
import { ImagecoverProvider } from '../../providers/imagecover/imagecover';
import { TranslateService } from '@ngx-translate/core';
import { LoadingProvider } from '../../providers/loading/loading';

/**
 * Generated class for the ShopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html',
})
export class ShopPage {
  selectedCateId = '';
  shop: ShopModel = new ShopModel();
  index: number = 0;
  idx: Number = 0;
  images: Array<any> = [];
  prodIndex: Number = 0;
  cate: any = {};
  isModify: boolean = false;
  slides: Slides;
  options: SortablejsOptions = {
  };
  isCreateCate: boolean = false;
  user: UserModel = new UserModel();
  isDrag: boolean = false;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loading: LoadingProvider,
    public loadingCtrl: LoadingController,
    public shopServiceProvider: ShopServiceProvider,
    public app: App,
    public popoverCtrl: PopoverController,
    public imagePicker: ImagePicker,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    private crop: Crop,
    private camera: Camera,
    public imgCoverService: ImagecoverProvider,
    private translate: TranslateService
  ) {

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopPage');
  }
  ionViewWillEnter() {
    this.user = window.localStorage.getItem('jjbiz-user') ? JSON.parse(window.localStorage.getItem('jjbiz-user')) : null;
    this.shopService();
  }
  edit(shop) {
    this.saveDragDrop();
    this.navCtrl.push('ShopeditPage', shop)
  }
  shopService() {
    this.images = [];
    // let loading = this.loading.create();
    // loading.present();
    this.loading.onLoading();
    this.shopServiceProvider.getShop().then(data => {
      // let tabs = document.getElementsByClassName('.show-tabbar');

      window.localStorage.setItem('islaunch', data.islaunch);
      if (!data.islaunch) {
        this.app.getRootNav().setRoot('Firstloginstep1Page');
      }
      this.shop = data;
      window.localStorage.setItem('shopID', this.shop._id);
      if (data.items && data.items.length > 0) {
        let index = this.index > 0 ? this.index : 0;
        this.cate = data.items[index].cate;
      }
      if (this.isCreateCate) {
        let lastcate = data.items.length - 1;
        this.cate = data.items[lastcate].cate;
        this.index = lastcate;
        this.isCreateCate = false;
      }
      this.options = {
        chosenClass: 'xxx',
        ghostClass: 'xxx2',
        onEnd: (event: any) => {
          //console.log(JSON.stringify(this.shop.items[this.idx]));
          // this.shopServiceProvider.editIndexProduct(this.shop._id, this.shop).then((data) => {
          //   this.shopService();
          // }, (err) => {

          // });
          this.isDrag = true;
        },
        animation: 150,
        delay: 0,
        filter: ".js-edit"
      };
      this.loading.dismiss();
    }, (err) => {
      window.localStorage.removeItem('jjbiz-user');
      this.loading.dismiss();
      this.app.getRootNav().setRoot('LoginPage');
    });
  }
  saveDragDrop() {
    if (this.isDrag) {
      // let loading = this.loading.create();
      // loading.present();
      this.loading.onLoading();
      this.shopServiceProvider.editIndexProduct(this.shop._id, this.shop).then((data) => {
        this.loading.dismiss();
        this.isDrag = false;
        this.shopService();
      }, (err) => {
        this.loading.dismiss();
      });
    }
  }
  productIndex(i) {
    this.prodIndex = i;
    // this.onUpload('product', 3);
  }
  changeStatus(status) {
    if (status === 'open') {
      this.shop.isopen = false;
    } else {
      this.shop.isopen = true;
    }
  }
  setModeEdit() {
    this.isModify = true;
  }
  clearMode() {
    this.isModify = false;
    this.saveDragDrop();
  }
  createCate() {
    this.onUpload('cate', 1);
    // this.formCate();
    // let popover = this.popoverCtrl.create(CreatecatePage);
    // popover.present({
    // });
  }
  formCate() {
    let img = this.images && this.images.length > 0 ? this.images[0] : 'noimage';
    let data = {
      shopid: this.shop._id,
      img: img
    };
    let modalopen = this.modalCtrl.create('CreatecatePage', data);
    modalopen.onDidDismiss(datadismiss => {
      this.images = [];
      if (datadismiss) {
        // let loading = this.loading.create();
        // loading.present();
        this.loading.onLoading();
        this.shopServiceProvider.addCate(this.shop._id, datadismiss).then((data) => {
          this.loading.dismiss();
          this.isCreateCate = true;
          this.shopService();
        }, (err) => {
          this.loading.dismiss();
          alert('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
          // alert(JSON.stringify(JSON.parse(err._body).message));
        });
      }
    });
    modalopen.present();
    // let popover = this.popoverCtrl.create(CreatecatePage, data);
    // popover.present({
    // });
    // popover.onDidDismiss(data => {
    //   this.shopService();
    // });
  }
  formProduct() {
    let data = {
      shopid: this.shop._id,
      images: this.images,
      cate: this.cate,
      index: this.prodIndex,
      cateindex: this.index
    };
    let modalproduct = this.modalCtrl.create('CreateproductPage', data);
    modalproduct.onDidDismiss(datadismiss => {
      this.images = [];
      if (datadismiss) {
        // let loading = this.loading.create();
        // loading.present();
        this.loading.onLoading();
        this.shopServiceProvider.addProduct(this.shop._id, datadismiss).then((data) => {
          this.loading.dismiss();
          this.shopService();
        }, (err) => {
          this.loading.dismiss();
          // alert(JSON.stringify(JSON.parse(err._body).message));
          alert('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
        });
      }
    });
    modalproduct.present();
    // let popover = this.popoverCtrl.create(CreateproductPage, data);
    // popover.present({
    // });
    // popover.onDidDismiss(data => {
    //   this.shopService();
    // });
  }
  selectShopBG() {
    this.onUpload('cover', 1);
  }
  updateShopBG() {
    let img = this.images && this.images.length > 0 ? this.images[0] : 'noimage';
    // let loadingCtrl = this.loading.create();
    // loadingCtrl.present();
    this.loading.onLoading();
    this.imgCoverService.getMeta(img).then((data) => {
      if (data) {
        this.shopServiceProvider.setCover(this.shop._id, img).then((data) => {
          this.loading.dismiss();
          this.shopService();
        }, (err) => {
          // alert(JSON.stringify(JSON.parse(err._body).message));
          this.loading.dismiss();
          alert('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
          console.log(err);
        });
      } else {
        this.loading.dismiss();
        alert('ขนาดรูปไม่ถูกต้อง กรุณาตรวจสอบรูปและลองใหม่อีกครั้ง!');
      }
    }, (err) => {
      this.loading.dismiss();
      alert('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
      console.log(err);
    });
  }
  addPromote() {
    this.onUpload('promote', 1);
  }
  updatePromote() {
    // let loading = this.loading.create();
    // loading.present();
    this.loading.onLoading();
    let img = this.images && this.images.length > 0 ? this.images[0] : 'noimage';
    this.shopServiceProvider.addPromote(this.shop._id, img).then((data) => {
      this.loading.dismiss();
      this.shopService();
    }, (err) => {
      this.loading.dismiss();
      // alert(JSON.stringify(JSON.parse(err._body).message));
      alert('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
      console.log(err);
    });
  }
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
        loading.push(this.loadingCtrl.create({
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
            // alert(loadingCount + '===' + results.length);
            if (loadingCount === results.length) {
              if (from.toString() === 'cover') {
                this.updateShopBG();
              } else if (from.toString() === 'promote') {
                this.updatePromote();
              } else if (from.toString() === 'cate') {
                this.formCate();
              } else if (from.toString() === 'product') {
                this.formProduct();
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
  myProfile() {
    this.navCtrl.push('ProfilePage');
  }
  selectCate(i, cate) {
    this.index = i;
    this.idx = i;
    this.selectedCateId = cate ? cate._id : '';
    this.cate = cate;
  }
  openEditCate(cate) {
    let language = this.translate.currentLang;
    let textEdit = language === 'th' ? 'แก้ไขหมวดหมู่สินค้า' : 'Edit Category';
    let textDelete = language === 'th' ? 'ลบหมวดหมู่สินค้า' : 'Delete Category';
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: textEdit,
          handler: () => {
            let modalproduct = this.modalCtrl.create('CreatecatePage', cate);
            modalproduct.onDidDismiss(dismiss => {
              // console.log(dismiss);
              if (dismiss) {
                this.shopServiceProvider.editCate(dismiss._id, dismiss).then((data) => {
                  this.shopService();
                }, (err) => {
                  alert('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
                });
              }
            });
            modalproduct.present();
          }
        },
        {
          text: textDelete,
          handler: () => {
            this.deleteCateProd(cate._id);
          },
          cssClass: 'font-red'
        }
      ]
    });
    actionSheet.present();
  }
  openEditProduct(product, index) {
    let language = this.translate.currentLang;
    let textEdit = language === 'th' ? 'แก้ไขสินค้า' : 'Edit Product';
    let textDelete = language === 'th' ? 'ลบสินค้า' : 'Delete Product';
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: textEdit,
          handler: () => {
            let modalproduct = this.modalCtrl.create('CreateproductPage', product);
            modalproduct.onDidDismiss(dismiss => {
              if (dismiss) {
                this.shopServiceProvider.editProduct(dismiss._id, dismiss).then((data) => {
                  this.shopService();
                }, (err) => {
                  alert('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
                });
              }
            });
            modalproduct.present();
          }
        },
        {
          text: textDelete,
          handler: () => {
            this.showConfirm(this.shop._id, product._id, index, this.index);
          },
          cssClass: 'font-red'
        }
      ]
    });
    actionSheet.present();
  }
  openActionSheet(from, i, name) {
    let language = this.translate.currentLang;
    let textCamera = language === 'th' ? 'กล้อง' : 'Camera';
    let textGallery = language === 'th' ? 'อัลบั้มรูปภาพ' : 'Photo Gallery';
    if (!name || name === '') {
      this.prodIndex = i;
      let actionSheet = this.actionSheetCtrl.create({
        buttons: [
          {
            text: textGallery,
            handler: () => {
              if (from) {
                this.galleryCamera(from, 1);
              }
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
      popoverOptions: popover,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      // allowEdit: from !== 'cover' ? true : false,
      // correctOrientation: true,
      // targetHeight: from !== 'cover' ? 600 : 600,
      // targetWidth: from !== 'cover' ? 600 : 800
    }
    // let loading = this.loadingCtrl.create();
    // this.loading.onLoading()
    this.camera.getPicture(options).then((imageData) => {
      this.loading.onLoading();
      if (from.toString() === 'cover') {
        // this.loading.onLoading();
        this.noResizeImage(imageData).then((data) => {
          this.images.push(data);
          this.loading.dismiss();
          this.updateShopBG();
        }, (err) => {
          this.loading.dismiss();
          console.log(err);
        });
      } else {
        // this.loading.onLoading();
        this.resizeImage(imageData).then((data) => {
          this.images.push(data);
          this.loading.dismiss();
          if (from.toString() === 'promote') {
            this.updatePromote();
          } else if (from.toString() === 'cate') {
            this.saveDragDrop();
            this.formCate();
          } else if (from.toString() === 'product') {
            this.saveDragDrop();
            this.formProduct();
          }
        }, (err) => {
          this.loading.dismiss();
          console.log(err);
        });
      }
    }, (err) => {
      this.loading.dismiss();
      // Handle error
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
      // allowEdit: from !== 'cover' ? true : false,
      // correctOrientation: true,
      // targetHeight: from !== 'cover' ? 600 : 600,
      // targetWidth: from !== 'cover' ? 600 : 900,
      // sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    // let loading = this.loadingCtrl.create();
    // this.camera.getPicture(options).then((imageData) => {
    // this.loading.onLoading()
    this.imagePicker.getPictures(options).then((imageData) => {
      this.loading.onLoading();
      if (Array.isArray(imageData)) {
        for (var i = 0; i < imageData.length; i++) {
          if (from.toString() === 'cover') {
            // this.loading.onLoading();
            this.noResizeImage(imageData).then((data) => {
              this.images.push(data);
              this.loading.dismiss();
              this.updateShopBG();
            }, (err) => {
              this.loading.dismiss();
              console.log(err);
            });
          } else {
            //   this.loading.onLoading();
            this.loading.dismiss();
            this.resizeImage(imageData[i]).then((data) => {
              this.images.push(data);

              if (from.toString() === 'promote') {
                this.updatePromote();
              } else if (from.toString() === 'cate') {
                this.saveDragDrop();
                this.formCate();
              } else if (from.toString() === 'product') {
                this.saveDragDrop();
                this.formProduct();
              }
            }, (err) => {
              this.loading.dismiss();
              alert(err);
            });
          }
        }
      } else {
        this.loading.dismiss();
      }


    }, (err) => {
      this.loading.dismiss();
      // Handle error
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
  showConfirm(shopID, prodID, prodIndex, cateIndex) {
    let confirm = this.alertCtrl.create({
      title: 'การแจ้งเตือน',
      message: 'คุณต้องการลบสินค้านี้ใช่หรือไม่?',
      buttons: [
        {
          text: 'ยกเลิก',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'ตกลง',
          cssClass: 'font-red',
          handler: () => {
            this.shopServiceProvider.deleteProduct(shopID, prodID, prodIndex, cateIndex).then((data) => {
              this.shopService();
            }, (err) => {
              // alert(JSON.stringify(JSON.parse(err._body).message));
              alert('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
            });
          }
        }
      ]
    });
    confirm.present();
  }
  deletePromoteShop(index) {
    let confirm = this.alertCtrl.create({
      title: 'การแจ้งเตือน',
      message: 'คุณต้องการลบรูปโปรโมทร้านนี้ใช่หรือไม่?',
      buttons: [
        {
          text: 'ยกเลิก',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'ตกลง',
          cssClass: 'font-red',
          handler: () => {
            this.shopServiceProvider.deletePromoteShop(this.shop._id, index).then((data) => {
              this.shopService();
            }, (err) => {
              // alert(JSON.stringify(JSON.parse(err._body).message));
              alert('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
            });
          }
        }
      ]
    });
    confirm.present();
  }
  deleteCateProd(cateID) {
    let confirm = this.alertCtrl.create({
      title: 'การแจ้งเตือน',
      message: 'คุณต้องการลบหมวดหมู่สินค้านี้ใช่หรือไม่? สินค้าทั้งหมดจะถูกลบไปด้วย!',
      buttons: [
        {
          text: 'ยกเลิก',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'ตกลง',
          cssClass: 'font-red',
          handler: () => {
            // console.log(cateID);
            let dataCate = { cateId: cateID };
            this.shopServiceProvider.deleteCateProd(this.shop._id, dataCate).then((data) => {
              if (this.index > 0) {
                this.index -= 1;
              }
              this.shopService();
            }, (err) => {
              // alert(JSON.stringify(JSON.parse(err._body).message));
              alert('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
            });
          }
        }
      ]
    });
    confirm.present();
  }
}
