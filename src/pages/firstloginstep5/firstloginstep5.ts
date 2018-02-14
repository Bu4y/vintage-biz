import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { Geolocation } from '@ionic-native/geolocation';
// import {
//   GoogleMaps,
//   GoogleMap,
//   GoogleMapsEvent,
//   GoogleMapOptions,
//   CameraPosition,
//   MarkerOptions,
//   Marker
// } from '@ionic-native/google-maps';
// import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';k
import { ShopServiceProvider } from '../shop/shop-service';
import { LoadingProvider } from '../../providers/loading/loading';
/**
 * Generated class for the Firstloginstep5Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-firstloginstep5',
  templateUrl: 'firstloginstep5.html',
})
export class Firstloginstep5Page {
  @ViewChild('map') mapref: ElementRef;
  // map: GoogleMap;
  lat = 0;
  long = 0;
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
  firstLogin: any = {};
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    // private geolocation: Geolocation,
    // private googleMaps: GoogleMaps,
    // private nativeGeocoder: NativeGeocoder,
    public shopServiceProvider: ShopServiceProvider,
    public loading: LoadingProvider
  ) {

  }
  ionViewWillEnter() {
    this.firstLogin = JSON.parse(window.localStorage.getItem('jjbiz-firstlogin'));
    this.address = window.localStorage.getItem('shop_location_address') ? JSON.parse(window.localStorage.getItem('shop_location_address')) : this.firstLogin.address;
    this.firstLogin.address = this.address ? this.address : this.firstLogin.address;
  }
  ionViewWillLeave() {
    window.localStorage.setItem('jjbiz-firstlogin', JSON.stringify(this.firstLogin));
  }
  save() {
    // let loadingCtrl = this.loading.create();
    this.loading.onLoading();
    window.localStorage.setItem('isjjbizfirstlogin', 'true');
    this.shopServiceProvider.addFirstShop(this.firstLogin).then((data) => {
      console.log(data);
      this.loading.dismiss();
      window.localStorage.removeItem('shop_location_address');
      window.localStorage.removeItem('jjbiz-firstlogin');
      this.navCtrl.setRoot('TabnavPage');
    }, (err) => {
      this.loading.dismiss();
      alert('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
      // alert(JSON.stringify(JSON.parse(err._body).message));
    });
  }
  cancel() {
    window.localStorage.setItem('jjbiz-firstlogin', JSON.stringify(this.firstLogin));
    this.navCtrl.setRoot('Firstloginstep1Page');
  }
  // getlocation() {
  //   this.geolocation.getCurrentPosition().then((resp) => {
  //     console.log(resp.coords.latitude + '    ' + resp.coords.longitude);
  //     this.firstLogin.address.lat = resp.coords.latitude;
  //     this.firstLogin.address.lng = resp.coords.longitude;
  //   }).catch((error) => {
  //     console.log('Error getting location', error);
  //   });
  // }
  // showMap() {
  //   this.navCtrl.push('GoogleMapsPage');
  // }
}

