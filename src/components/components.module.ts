import { NgModule } from '@angular/core';
import { IonUploadImagesComponent } from "../components/ion-upload-image/ion-upload-image";
import { PreloadImageComponent } from './preload-image/preload-image';
import { IonicModule } from 'ionic-angular';
@NgModule({
	declarations: [
		IonUploadImagesComponent,
		PreloadImageComponent
	],
	imports: [
		IonicModule
	],
	exports: [
		IonUploadImagesComponent,
		PreloadImageComponent
	]
})
export class ComponentsModule { }
