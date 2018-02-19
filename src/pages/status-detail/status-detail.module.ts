import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StatusDetailPage } from './status-detail';
import { TranslateModule } from '@ngx-translate/core';
import { PreloadImageComponent } from '../../components/preload-image/preload-image';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    StatusDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(StatusDetailPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class StatusDetailPageModule {}
