import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FirstloginstepModalPage } from './firstloginstep-modal';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    FirstloginstepModalPage,
  ],
  imports: [
    IonicPageModule.forChild(FirstloginstepModalPage),
    TranslateModule.forChild()
  ],
})
export class FirstloginstepModalPageModule {}
