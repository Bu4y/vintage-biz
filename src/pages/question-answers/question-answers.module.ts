import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuestionAnswersPage } from './question-answers';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    QuestionAnswersPage,
  ],
  imports: [
    IonicPageModule.forChild(QuestionAnswersPage),
    TranslateModule.forChild(),
  ],
})
export class QuestionAnswersPageModule {}
