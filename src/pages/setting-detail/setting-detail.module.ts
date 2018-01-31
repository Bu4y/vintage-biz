import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SettingDetailPage } from './setting-detail';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SettingDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(SettingDetailPage),
    TranslateModule.forChild(),
  ],
})
export class SettingDetailPageModule {}
