import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OneSignal } from '@ionic-native/onesignal';
// import { TabnavPage } from '../pages/tabnav/tabnav';
// import { LoginPage } from '../pages/login/login';

import * as firebase from 'firebase';
// import { AgreementPage } from '../pages/agreement/agreement';
// import { GreetingPage } from '../pages/greeting/greeting';
import { TranslateService } from '@ngx-translate/core';
import { ShopServiceProvider } from '../pages/shop/shop-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // rootPage:any = TabnavPage;
  rootPage: any = '';
  user = {} as any;
  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    translate: TranslateService,
    private oneSignal: OneSignal,
    public shopServiceProvider: ShopServiceProvider,
  ) {
    translate.addLangs(['en', 'th']);
    const browserLang = translate.getBrowserLang();
    translate.setDefaultLang(browserLang === 'th' ? 'en' : 'th');
    // translate.setDefaultLang('en');
    translate.use(browserLang.match(/en|th/) ? browserLang : 'en');
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.configFirebase();
      if (platform.is('cordova')) {
        this.onSignalSetup();
      }
    });
    let isFirstLogin = window.localStorage.getItem('isjjbizfirstlogin');
    if (!isFirstLogin) {
      this.rootPage = 'GreetingPage';
    } else {
      this.user = JSON.parse(window.localStorage.getItem('jjbiz-user'));

      this.shopServiceProvider.getShop().then((data) => {
        if (data.islaunch === true && this.user) {
          // this.navCtrl.setRoot('TabnavPage');
          this.rootPage = 'TabnavPage';
        } else {
          this.rootPage = 'Firstloginstep1Page';
          // this.navCtrl.setRoot('Firstloginstep1Page');
        }
      }, (err) => {
        // console.log(err);
      });
    }
  }

  configFirebase() {
    let config = {
      apiKey: "AIzaSyActRoM7SJW0h20HTM9GrkwJICC4moOzC8",
      authDomain: "green-vintage.firebaseapp.com",
      databaseURL: "https://green-vintage.firebaseio.com",
      projectId: "green-vintage",
      storageBucket: "green-vintage.appspot.com",
      messagingSenderId: "317596581774"
    };
    firebase.initializeApp(config);
  }
  onSignalSetup() {
    this.oneSignal.startInit('fdfae3dc-e634-47f4-b959-f04e60f4613b', '464766391164');

    // this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

    this.oneSignal.handleNotificationReceived().subscribe((onReceived) => {
      // do something when notification is received
    });
    this.oneSignal.handleNotificationOpened().subscribe(() => {
      // do something when a notification is opened
    });

    this.oneSignal.endInit();
  }

}


