import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Firstloginstep2Page } from './firstloginstep2';
import { PreloadImageComponent } from '../../components/preload-image/preload-image';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    Firstloginstep2Page
  ],
  imports: [
    IonicPageModule.forChild(Firstloginstep2Page),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class Firstloginstep2PageModule {}
