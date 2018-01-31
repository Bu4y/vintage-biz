import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PreloadImageComponent } from '../../components/preload-image/preload-image';
import { CreateproductPage } from './createproduct';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    CreateproductPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateproductPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class CreateproductPageModule {}
