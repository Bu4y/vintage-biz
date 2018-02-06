import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StatusPage } from './status';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    StatusPage,
  ],
  imports: [
    IonicPageModule.forChild(StatusPage),
    TranslateModule.forChild(),
    PipesModule
  ],
})
export class StatusPageModule {}
