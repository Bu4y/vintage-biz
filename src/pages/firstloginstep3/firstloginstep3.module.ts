import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Firstloginstep3Page } from './firstloginstep3';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    Firstloginstep3Page,
  ],
  imports: [
    IonicPageModule.forChild(Firstloginstep3Page),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class Firstloginstep3PageModule {}
