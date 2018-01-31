import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BikerPage } from './biker';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    BikerPage,
  ],
  imports: [
    IonicPageModule.forChild(BikerPage),
    TranslateModule.forChild()
  ],
})
export class BikerPageModule {}
