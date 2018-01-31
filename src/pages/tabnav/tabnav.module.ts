import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabnavPage } from './tabnav';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    TabnavPage,
  ],
  imports: [
    IonicPageModule.forChild(TabnavPage),
    TranslateModule.forChild(),
  ]
})
export class TabnavPageModule {}
