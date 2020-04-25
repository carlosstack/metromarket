import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QaRoutingModule } from './qa-routing.module';
import { AnswerComponent } from 'src/app/components/answer/answer.component';
import { AnswerActivityComponent } from 'src/app/components/answer/answer-activity/answer-activity.component';
import { NewAnswerComponent } from 'src/app/components/answer/new-answer/new-answer.component';
import { MyAnswersComponent } from 'src/app/components/answer/my-answers/my-answers.component';
import { AnswerPageComponent } from 'src/app/components/answer/answer-page/answer-page.component';


@NgModule({
  declarations: [
    AnswerComponent,
    AnswerActivityComponent,
    NewAnswerComponent,
    MyAnswersComponent,
    AnswerPageComponent,
    
  ],
  imports: [
    CommonModule,
    QaRoutingModule
  ]
})
export class QaModule { }
