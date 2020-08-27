import { Component, OnInit, HostListener } from '@angular/core';
import { QachatService } from 'src/app/shared/services/qachat.service';
import { TagInterface } from 'src/app/shared/models/tag';
import { Subscription } from 'rxjs';
import { PaginationService } from 'src/app/shared/services/pagination.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css'],
  providers: [PaginationService],

})
export class TagsComponent implements OnInit {

  private tags: TagInterface[];
  tagsSub: Subscription;
  constructor(private page: PaginationService) { }

  ngOnInit(): void {
    this.page.init(`qachat/tags/list`, 'count', { reverse: true, prepend: false, group: false, where: false, limit: 200 });
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

  search(txt: string) {

    if (txt.length == 0) {
      this.page.init(`qachat/tags/list`, 'count', { reverse: true, prepend: false, group: false, where: false, limit: 200 });
    }

    txt = txt.trim();
    txt = txt.toLowerCase();

    if (txt.length > 0) {
      this.page.init(`qachat/tags/list`, 'tag', { reverse: false, prepend: false, group: false, where: false, startAt: true, text: txt, limit: 200 });
    }
  }
}
