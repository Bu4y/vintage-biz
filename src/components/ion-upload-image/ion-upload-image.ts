import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ImagePicker } from '@ionic-native/image-picker';
import * as firebase from 'firebase';
import { LoadingController, Slides } from 'ionic-angular';
/**
 * Generated class for the IonUploadImageComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'ion-upload-images',
  templateUrl: 'ion-upload-image.html'
})
export class IonUploadImagesComponent {
  @ViewChild('formSlideImages') formSlideImages: Slides;
  @Input() images: Array<any> = [];
  @Input() isShowUpload: boolean;
  @Input() maximumImagesCount: any;
  @Output() resImage: EventEmitter<any> = new EventEmitter();
  constructor(
    public imagePicker: ImagePicker,
    public loading: LoadingController
  ) {
    console.log('Hello IonUploadImageComponent Component');
  }

  onRemove(i) {
    if (this.images.length > 1) {
      this.formSlideImages.slidePrev();
    }
    this.images.splice(i, 1);
    this.resImage.emit(this.images);
  }

  onUpload() {

    let options = {
      maximumImagesCount: this.maximumImagesCount,
      width: 900,
      quality: 30,
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
          this.resImage.emit(this.images);
          setTimeout(() => {
            loading[loadingCount].dismiss();
            loadingCount++;
          }, 1000);
        }, (error) => {
          loading[loadingCount].dismiss();
          loadingCount++;
          // alert('Upload Fail. ' + JSON.stringify(error));
        })
      }

    }, (err) => { });
  }

  uploadImage(imageString): Promise<any> {

    let storageRef = firebase.storage().ref();
    let filename = Math.floor((Date.now() / 1000) + new Date().getUTCMilliseconds());
    let imageRef = storageRef.child(`images/${filename}.jpg`);
    let parseUpload: any;

    return new Promise((resolve, reject) => {
      parseUpload = imageRef.putString('data:image/jpeg;base64,' + imageString, 'data_url');

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
    });
  }

}
