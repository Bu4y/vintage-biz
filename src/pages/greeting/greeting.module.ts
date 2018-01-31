import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GreetingPage } from './greeting';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    GreetingPage,
  ],
  imports: [
    IonicPageModule.forChild(GreetingPage),
    TranslateModule.forChild()
  ],
})
export class GreetingPageModule {}
