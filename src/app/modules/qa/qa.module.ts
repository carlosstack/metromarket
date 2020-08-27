import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QaRoutingModule } from './qa-routing.module';
import { AnswerComponent } from 'src/app/modules/qa/pages/main/answer.component';
import { AnswerActivityComponent } from 'src/app/modules/qa/pages/answer-activity/answer-activity.component';
import { NewAnswerComponent } from 'src/app/modules/qa/pages/new-answer/new-answer.component';
import { MyAnswersComponent } from 'src/app/modules/qa/pages/my-answers/my-answers.component';
import { AnswerPageComponent } from 'src/app/modules/qa/pages/answer-page/answer-page.component';
import { NavbarAnswerComponent } from 'src/app/modules/qa/components/navbar-answer/navbar-answer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QaChatHomeComponent } from 'src/app/modules/qa/pages/qa-chat-home/qa-chat-home.component';
import { SidebarAnswerComponent } from 'src/app/modules/qa/components/sidebar-answer/sidebar-answer.component';
import { MatTabsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatChipsModule, MatIconModule, MatAutocompleteModule, MatToolbarModule } from '@angular/material';
import { MyQuestionsComponent } from 'src/app/modules/qa/pages/my-questions/my-questions.component';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { DateAgoPipe } from 'src/app/shared/pipes/date-ago.pipe';
import { MainModule } from '../main/main.module';
import { SanitizeHtmlPipe } from 'src/app/shared/pipes/sanitize-html.pipe';
import { QachatService } from 'src/app/shared/services/qachat.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { RecentQuestionsComponent } from 'src/app/modules/qa/components/recent-questions/recent-questions.component';
import { PopularQuestionsComponent } from 'src/app/modules/qa/components/popular-questions/popular-questions.component';
import { ByDateQuestionsComponent } from 'src/app/modules/qa/components/by-date-questions/by-date-questions.component';
import { CommentsComponent } from 'src/app/modules/qa/components/comments/comments.component';
import { QachatLoadingComponent } from 'src/app/modules/qa/components/qachat-loading/qachat-loading.component';
import { SidebarRightComponent } from 'src/app/modules/qa/components/sidebar-right/sidebar-right.component';
import { TagsComponent } from 'src/app/modules/qa/pages/tags/tags.component';
import { MyQachatCommentsComponent } from 'src/app/modules/qa/pages/my-qachat-comments/my-qachat-comments.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { QachatSearchComponent } from 'src/app/modules/qa/pages/qachat-search/qachat-search.component';
import { QachatTopQuestionsComponent } from 'src/app/modules/qa/components/qachat-top-questions/qachat-top-questions.component';
import { QachatTopAnswersComponent } from 'src/app/modules/qa/components/qachat-top-answers/qachat-top-answers.component';
import { QachatTrendingTagsComponent } from 'src/app/modules/qa/components/qachat-trending-tags/qachat-trending-tags.component';
import { QaNavbarComponent } from './components/qa-navbar/qa-navbar.component';


@NgModule({
  declarations: [
    AnswerComponent,
    AnswerActivityComponent,
    NewAnswerComponent,
    MyAnswersComponent,
    AnswerPageComponent,
    NavbarAnswerComponent,
    QaChatHomeComponent,
    SidebarAnswerComponent,
    MyQuestionsComponent,
    RecentQuestionsComponent,
    PopularQuestionsComponent,
    ByDateQuestionsComponent,
    DateAgoPipe,
    SanitizeHtmlPipe,
    CommentsComponent,
    QachatLoadingComponent,
    SidebarRightComponent,
    TagsComponent,
    MyQachatCommentsComponent,
    QachatSearchComponent,
    QachatTopQuestionsComponent,
    QachatTopAnswersComponent,
    QachatTrendingTagsComponent,
    QaNavbarComponent
    
  ],
  imports: [
    CommonModule,
    QaRoutingModule,
    FormsModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatChipsModule,
    RichTextEditorAllModule,
    MatAutocompleteModule,
    MainModule,
    FormsModule,
    NgbDropdownModule,
    MatToolbarModule,
    MatIconModule

  ],
  providers:[QachatService,AuthService]
})
export class QaModule { }
