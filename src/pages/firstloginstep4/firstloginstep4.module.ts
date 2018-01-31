import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Firstloginstep4Page } from './firstloginstep4';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    Firstloginstep4Page
  ],
  imports: [
    IonicPageModule.forChild(Firstloginstep4Page),
    TranslateModule.forChild(),
    PipesModule
  ],
})
export class Firstloginstep4PageModule {}
