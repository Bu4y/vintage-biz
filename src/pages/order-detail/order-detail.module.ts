import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderDetailPage } from './order-detail';
import { PipesModule } from '../../pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    OrderDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderDetailPage),
    PipesModule,
    TranslateModule.forChild()
  ],
})
export class OrderDetailPageModule {}
