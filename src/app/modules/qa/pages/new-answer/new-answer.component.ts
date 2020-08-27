import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { removeSpaces } from '../../../../shared/validators/remove-spaces.validator';
import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { QachatService } from 'src/app/shared/services/qachat.service';
import { QuestionInterface } from 'src/app/shared/models/question';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { ToolbarService, LinkService, ImageService, HtmlEditorService } from '@syncfusion/ej2-angular-richtexteditor';
import { Observable } from 'rxjs';
import { MatAutocomplete,MatAutocompleteSelectedEvent } from '@angular/material';
import { startWith, map } from 'rxjs/operators';
export interface tag {
  name: string;
}

@Component({
  selector: 'app-new-answer',
  templateUrl: './new-answer.component.html',
  styleUrls: ['./new-answer.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService]

})
export class NewAnswerComponent implements OnInit {

  formGroupNewQuestion: FormGroup;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA, SPACE];
  tags: tag[] = [];

  question: QuestionInterface = {};

  addQuestionSub: Subscription;

  public tools: object = {
    items: ['Undo', 'Redo', '|',
      'Bold', 'Italic', 'Underline', 'StrikeThrough', '|',
       'FontSize', 'FontColor', '|',
      'SubScript', 'SuperScript', '|',
      'Alignments', '|', 'OrderedList', 'UnorderedList', '|', 'CreateLink',
      'Image', '|', 'ClearFormat', '|', 'FullScreen']
  };
  public iframe: object = { enable: true };
  public height: number = 500;


  tagCtrl = new FormControl();
  filteredTags: Observable<string[]>;
  allTags: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  @ViewChild('auto',{static: false}) matAutocomplete: MatAutocomplete;
  @ViewChild('tagInput',{static: false}) tagInput: ElementRef<HTMLInputElement>;

  loading:boolean;

  constructor(private authService: AuthService, private qachatService: QachatService, private formBuilder: FormBuilder, private router: Router) {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => tag ? this._filter(tag) : this.allTags.slice()));
   }

  ngOnInit() {
    this.buildFormNewQuestion();
    this.loading = false;
  }

  ngOnDestroy(): void {
    if (this.addQuestionSub) {
      this.addQuestionSub.unsubscribe();
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push({name:event.option.viewValue});
    this.tagInput.nativeElement.value = '';
    this.formGroupNewQuestion.get('tags').setValue({ valid: true });
    this.tagCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add 
    if (this.tags.length < 5) {
      if ((value || '').trim()) {
        this.tags.push({ name: value.trim() });
        this.formGroupNewQuestion.get('tags').setValue({ valid: true });
      }
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(tag: tag): void {
    const index = this.tags.indexOf(tag);

    if (index == 0) {
      this.formGroupNewQuestion.get('tags').setErrors({ invalid: true });
    }

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  buildFormNewQuestion() {
    this.formGroupNewQuestion = this.formBuilder.group({
      title: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$'), removeSpaces]],
      description: ['', [Validators.required]],
      tags: ['', [Validators.required]]
    });
  }

  parseTagsToArrayString() {
    const tags = [];
    this.tags.forEach(element => {
      tags.push(element.name);
    });
    return tags;
  }

  addQuestion() {
    this.loading = true;
    this.authService.isAuth().subscribe(user => {
      this.question.date = Date.now();
      this.question.votes = {};
      this.question.votesCount = 0;
      this.question.answers = 0;
      this.question.title = this.formGroupNewQuestion.get('title').value;
      this.question.description = this.formGroupNewQuestion.get('description').value;
      this.question.tags = this.parseTagsToArrayString();
      this.question.ownerUID = user.uid;
      this.question.owner = user.displayName;
      this.question.commentsCount = 0;

      this.qachatService.addQuestion(this.question).then((res) => {
        //redirect to answer-page
      }).catch(e => {
        this.loading = false;
        console.log(e)
      })
    });
  }
}
