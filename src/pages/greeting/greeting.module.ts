import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GreetingPage } from './greeting';
import { TranslateModule } from '@ngx-translate/core';
import { PreloadImageComponent } from '../../components/preload-image/preload-image';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    GreetingPage,
  ],
  imports: [
    IonicPageModule.forChild(GreetingPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class GreetingPageModule {}
