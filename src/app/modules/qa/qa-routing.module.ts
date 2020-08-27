import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnswerComponent } from "./pages/main/answer.component";
import { NewAnswerComponent } from 'src/app/modules/qa/pages/new-answer/new-answer.component';
import { AnswerActivityComponent } from 'src/app/modules/qa/pages/answer-activity/answer-activity.component';
import { MyAnswersComponent } from 'src/app/modules/qa/pages/my-answers/my-answers.component';
import { AnswerPageComponent } from 'src/app/modules/qa/pages/answer-page/answer-page.component';
import { QaChatHomeComponent } from 'src/app/modules/qa/pages/qa-chat-home/qa-chat-home.component';
import { MyQuestionsComponent } from 'src/app/modules/qa/pages/my-questions/my-questions.component';
import { TagsComponent } from 'src/app/modules/qa/pages/tags/tags.component';
import { MyQachatCommentsComponent } from 'src/app/modules/qa/pages/my-qachat-comments/my-qachat-comments.component';

const routes: Routes = [
  {
    path: 'a',
    component: AnswerComponent,
    children: [
      { path: '', component: QaChatHomeComponent, outlet: 'qa' },
      { path: 'new', component: NewAnswerComponent, outlet: 'qa' },
      { path: 'my-answers', component: MyAnswersComponent, outlet: 'qa' },
      { path: 'my-questions', component: MyQuestionsComponent, outlet: 'qa' },
      { path: 'my-comments', component: MyQachatCommentsComponent, outlet: 'qa' },
      { path: 'question-page/:uid/:id', component: AnswerPageComponent, outlet: 'qa' },
      { path: 'tags', component: TagsComponent, outlet: 'qa' },
      { path: '**', redirectTo: '' }
    ]
  },
  { path: '**', redirectTo: 'a' }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QaRoutingModule { }
