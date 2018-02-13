import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QuestionModel } from '../../assets/model/question-answers.model'
import { TranslateService } from '@ngx-translate/core';
import { QuestionAnswersServiceProvider } from './question-answers-service';
import { LoadingProvider } from '../../providers/loading/loading';
/**
 * Generated class for the QuestionAnswersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-question-answers',
  templateUrl: 'question-answers.html',
})
export class QuestionAnswersPage {

  qas: Array<QuestionModel>;
  shownGroup = null;
  language: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public QuestionProvider: QuestionAnswersServiceProvider,
    private translate: TranslateService,
    private loading: LoadingProvider,
  ) {

  }

  ionViewWillEnter() {
    this.language = this.translate.currentLang;
    this.getQuestions();
  }

  toggleGroup(group) {
    if (this.isGroupShown(group)) {
      this.shownGroup = null;
    } else {
      this.shownGroup = group;
    }
  };
  isGroupShown(group) {
    return this.shownGroup === group;
  };

  getQuestions() {
    this.loading.onLoading();
    this.QuestionProvider.getQuestionAnswers().then(res => {
      this.qas = res;
      this.loading.dismiss();
    })
  }

}
