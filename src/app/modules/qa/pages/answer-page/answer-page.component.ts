import { Component, OnInit } from '@angular/core';
import { QachatService } from 'src/app/shared/services/qachat.service';
import { QuestionInterface } from 'src/app/shared/models/question';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AnswerInterface } from 'src/app/shared/models/answer';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-answer-page',
  templateUrl: './answer-page.component.html',
  styleUrls: ['./answer-page.component.css']
})
export class AnswerPageComponent implements OnInit {

  question: QuestionInterface;
  answers: AnswerInterface[];
  questionSub: Subscription;
  answersSub: Subscription;
  yourAnswerInput: AnswerInterface = {};

  rteForm: FormGroup;

  public tools: object = {
    items: ['Undo', 'Redo', '|',
      'Bold', 'Italic', 'Underline', 'StrikeThrough', '|',
      'FontSize', 'FontColor', '|',
      'SubScript', 'SuperScript', '|',
      'Alignments', '|', 'OrderedList', 'UnorderedList', '|', 'CreateLink',
      'Image', '|', 'ClearFormat', '|', 'FullScreen']
  };
  public pasteCleanupSettings: object = {
    plainText: true
  };
  public iframe: object = { enable: true };
  public height: number = 500;
  currentUser;

  constructor(private qachatService: QachatService, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');
    const uid = this.route.snapshot.paramMap.get('uid');

    this.rteForm = new FormGroup({
      'answer': new FormControl('', [Validators.required, Validators.minLength(1)])
    });
    this.authService.isAuth().subscribe(user => {
      this.currentUser = user;
      this.questionSub = this.qachatService.getQuestion(id, uid).subscribe(question => {

        this.question = question;

        this.getAnswers();


      });
    });
  }

  ngOnDestroy(): void {
    this.questionSub.unsubscribe();
    if (this.answersSub) {
      this.answersSub.unsubscribe();
    }

  }
  getAnswers() {
    this.answersSub = this.qachatService.getAnswers(this.question.id).subscribe(answers => {
      this.answers = answers;
    })
  }
  addAnswer() {
    this.yourAnswerInput.content = this.rteForm.get('answer').value;
    this.yourAnswerInput.quid = this.question.ownerUID;
    this.yourAnswerInput.date = Date.now();
    this.yourAnswerInput.qid = this.question.id;
    this.yourAnswerInput.uid = this.currentUser.uid;
    this.yourAnswerInput.votes = [];
    this.yourAnswerInput.owner = this.currentUser.displayName;
    this.yourAnswerInput.votesCount = 0;
    this.yourAnswerInput.commentsCount = 0;
    this.yourAnswerInput.questionTitle = this.question.title;
    this.rteForm.get('answer').reset();
    this.qachatService.addAnswer(this.yourAnswerInput).then((_) => {
      //this.getAnswers()
    }).catch(e => {
      console.error(e);
    });
  }
  //votes
  addVoteToQuestion(value) {
    if (this.question.votes[this.currentUser.uid] == null) {
      this.qachatService.addVoteToQuestion(this.question.id, value, this.currentUser.uid);
    }
  }
  addVoteToAnswer(value, answer: AnswerInterface) {

    if (answer.votes[this.currentUser.uid] == null) {
      this.qachatService.addVoteToAnswer(this.question.id, answer.id, value, this.currentUser.uid);
    }

  }

  getAnswersCommentsPath(id: string) {
    return 'qachat/answers/' + id + '/answer/comments'
  }
  getQuestionsCommentsPath(id: string) {
    return 'qachat/questions/' + id + '/question/comments'
  }

}
