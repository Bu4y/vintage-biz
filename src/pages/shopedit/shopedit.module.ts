import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShopeditPage } from './shopedit';
import { TranslateModule } from '@ngx-translate/core';
import { PipesPipe } from '../../pipes/pipes/pipes';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    ShopeditPage
  ],
  imports: [
    IonicPageModule.forChild(ShopeditPage),
    TranslateModule.forChild(),
    PipesModule
  ],
})
export class ShopeditPageModule {}
