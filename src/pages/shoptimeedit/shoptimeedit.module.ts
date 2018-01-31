import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShoptimeeditPage } from './shoptimeedit';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ShoptimeeditPage,
  ],
  imports: [
    IonicPageModule.forChild(ShoptimeeditPage),
    TranslateModule.forChild()
  ],
})
export class ShoptimeeditPageModule {}
