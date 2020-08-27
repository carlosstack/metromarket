import { Component, OnInit, Input } from '@angular/core';
import { CommentInterface } from 'src/app/shared/models/comment';
import { CommentsService } from 'src/app/shared/services/comments.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
  providers: [CommentsService]
})
export class CommentsComponent implements OnInit {

  @Input() public collection;
  @Input() public docUID;
  @Input() public docID;
  @Input() public commentsCount;
  @Input() public parentID;
  @Input() public parentUID;
  @Input() public parentTitle;

  private comment: CommentInterface = {};
  private comments: CommentInterface[] = [];
  private firstComments: CommentInterface[] = [];

  private commentInput: string = '';
  private commentsSub: Subscription;
  private currentUID = '';
  private showMoreBtn: boolean = true;
  private showMoreLoading: boolean = false;


  constructor(private commentService: CommentsService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isAuth().subscribe(user => {
      this.comment.uid = user.uid;
      this.currentUID = user.uid;
      this.comment.owner = user.displayName;
      this.comment.docID = this.docID;
      this.comment.docUID = this.docUID;
      this.comment.parentID = this.parentID;
      this.comment.parentTitle = this.parentTitle;
      this.comment.parentUID = this.parentUID;
    })
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
  }
  get() {
    this.showMoreBtn = false;
    this.showMoreLoading = true;
    this.commentsSub = this.commentService.get(this.collection).subscribe(comments => {
      this.showMoreLoading = false;
      this.comments = comments;
    });
  }
  add() {
    this.comment.date = Date.now();
    this.comment.content = this.commentInput;
    this.commentInput = '';
    this.commentService.add(this.comment, this.collection).then(_ => {
     if(this.showMoreBtn){
      this.get();
     }
    }).catch(e => {
      console.error(e);
    });
  }
  delete(id) {
    this.commentService.delete(this.collection, id).catch(e => {
      console.error(e);
    });
  }
  
}
