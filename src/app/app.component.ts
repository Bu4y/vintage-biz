import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// import { TabnavPage } from '../pages/tabnav/tabnav';
// import { LoginPage } from '../pages/login/login';

import * as firebase from 'firebase';
// import { AgreementPage } from '../pages/agreement/agreement';
// import { GreetingPage } from '../pages/greeting/greeting';
import { TranslateService } from '@ngx-translate/core';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // rootPage:any = TabnavPage;
  rootPage: any = 'LoginPage';
  user = {} as any;
  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    translate: TranslateService) {
    translate.addLangs(['en', 'th']);
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|th/) ? browserLang : 'en');
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.configFirebase();
    });
    let isFirstLogin = window.localStorage.getItem('isjjbizfirstlogin');
    if (!isFirstLogin) {
      this.rootPage = 'GreetingPage';
    } else {
      this.user = JSON.parse(window.localStorage.getItem('jjbiz-user'));
      if (this.user) {
        console.log(this.user);
        this.rootPage = 'TabnavPage';
      }
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
}


