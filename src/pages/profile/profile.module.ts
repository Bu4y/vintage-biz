import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePage } from './profile';
import { TranslateModule } from '@ngx-translate/core';
import { PreloadImageComponent } from '../../components/preload-image/preload-image';
import { ComponentsModule } from '../../components/components.module';


@NgModule({
  declarations: [
    ProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilePage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class ProfilePageModule {}
