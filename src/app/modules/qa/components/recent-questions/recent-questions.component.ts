import { Component, OnInit, HostListener, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { PaginationService } from 'src/app/shared/services/pagination.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-recent-questions',
  templateUrl: '../questions-template/questions-template.component.html',
  styleUrls: ['../questions-template/questions-template.component.css'],
  providers: [PaginationService],

})
export class RecentQuestionsComponent implements OnInit {

  constructor(private page:PaginationService, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
      this.page.init(`questions`, 'date',  { reverse: true, prepend: false, group: true, where: false,limit:20});
  }


  @HostListener("window:scroll", [])
  onScroll(): void {
    //In chrome and some browser scroll is given to body tag
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    // pos/max will give you the distance between scroll bottom and and bottom of screen in percentage.
    if (pos == max) {
      //Do your action here
      this.page.more()

    }

  }
}
