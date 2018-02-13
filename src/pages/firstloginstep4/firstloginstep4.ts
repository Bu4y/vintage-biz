import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ActionSheetController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
// import { Firstloginstep5Page } from '../firstloginstep5/firstloginstep5';
// import { FirstloginstepModalPage } from '../firstloginstep-modal/firstloginstep-modal';

/**
 * Generated class for the Firstloginstep4Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-firstloginstep4',
  templateUrl: 'firstloginstep4.html',
})
export class Firstloginstep4Page {
  isAdd = false;
  firstLogin: any = {};
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public actionSheetCtrl: ActionSheetController,
    private translate: TranslateService
  ) {

  }
  ionViewWillEnter() {
    this.firstLogin = JSON.parse(window.localStorage.getItem('jjbiz-firstlogin'));
  }
  ionViewWillLeave() {
    window.localStorage.setItem('jjbiz-firstlogin', JSON.stringify(this.firstLogin));
  }
  openModal() {
    let modalopen = this.modalCtrl.create('FirstloginstepModalPage');
    modalopen.onDidDismiss(datadismiss => {
      if (datadismiss) {
        this.firstLogin.times.push(datadismiss);
      }
    });
    modalopen.present();
  }
  openActionsheet(item, i){
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
    this.firstLogin.times.splice(index, 1);
  }
  editTimes(item, i) {
    item.editMode = true;
    let modalopen = this.modalCtrl.create('FirstloginstepModalPage', item);
    modalopen.onDidDismiss(datadismiss => {
      if (datadismiss) {
        this.firstLogin.times[i] = datadismiss;
      }
    });
    modalopen.present();
  }
  step5() {
    window.localStorage.setItem('jjbiz-firstlogin', JSON.stringify(this.firstLogin));
    this.navCtrl.push('Firstloginstep5Page',this.firstLogin);
  }
}
