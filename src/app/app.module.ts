import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { MyApp } from './app.component';
import { ShopServiceProvider } from '../pages/shop/shop-service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Auth } from '../providers/auth-service/auth-service';
import { Server } from '../providers/server-config/server-config';
import { CoreserviceProvider } from '../providers/coreservice/coreservice';
import { CreateproductPage } from '../pages/createproduct/createproduct';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
import { CreatecatePage } from '../pages/createcate/createcate';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { ProfilePage } from '../pages/profile/profile';
import { SortablejsModule } from "angular-sortablejs";

import * as ionicGalleryModal from 'ionic-gallery-modal';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { Geolocation } from '@ionic-native/geolocation';
import {
  GoogleMaps
} from '@ionic-native/google-maps';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { Crop } from '@ionic-native/crop';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagecoverProvider } from '../providers/imagecover/imagecover';
import { OrderServiceProvider } from '../pages/order/order-service';
import { StatusServiceProvider } from '../pages/status/status-service';
@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SortablejsModule,
    IonicModule.forRoot(MyApp),
    IonicImageViewerModule,
    ionicGalleryModal.GalleryModalModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: ionicGalleryModal.GalleryModalHammerConfig,
    },
    ShopServiceProvider,
    Auth,
    Server,
    CoreserviceProvider,
    Base64,
    ImagePicker,
    Geolocation,
    GoogleMaps,
    NativeGeocoder,
    Crop,
    Camera,
    ImagecoverProvider,
    OrderServiceProvider,
    StatusServiceProvider
  ]
})
export class AppModule { }

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
