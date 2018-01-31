import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreatecatePage } from './createcate';
import { TranslateModule } from '@ngx-translate/core';
import { PreloadImageComponent } from '../../components/preload-image/preload-image';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    CreatecatePage,
  ],
  imports: [
    IonicPageModule.forChild(CreatecatePage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class CreatecatePageModule {}
