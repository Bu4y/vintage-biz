import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Firstloginstep5Page } from './firstloginstep5';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    Firstloginstep5Page,
  ],
  imports: [
    IonicPageModule.forChild(Firstloginstep5Page),
    TranslateModule.forChild(),
    ComponentsModule
    
  ],
})
export class Firstloginstep5PageModule {}
