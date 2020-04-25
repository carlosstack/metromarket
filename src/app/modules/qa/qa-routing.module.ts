import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnswerComponent } from "../../components/answer/answer.component";
import { NewAnswerComponent } from 'src/app/components/answer/new-answer/new-answer.component';
import { AnswerActivityComponent } from 'src/app/components/answer/answer-activity/answer-activity.component';
import { MyAnswersComponent } from 'src/app/components/answer/my-answers/my-answers.component';
import { AnswerPageComponent } from 'src/app/components/answer/answer-page/answer-page.component';

const routes: Routes = [
  {
    path: 'a',
    component: AnswerComponent,
    children:[
      {path:'new',component: NewAnswerComponent, outlet:'answer'},
      {path:'activity',component: AnswerActivityComponent, outlet:'answer'},
      {path:'my-answers',component: MyAnswersComponent, outlet:'answer'},
      {path:'answer-page/:id',component: AnswerPageComponent, outlet:'answer'},
      { path:'**', redirectTo:'activity'}
    ]
  }, 
  { path:'**', redirectTo:'a'}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QaRoutingModule { }
