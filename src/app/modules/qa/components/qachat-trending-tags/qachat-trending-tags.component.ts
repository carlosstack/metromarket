import { Component, OnInit } from '@angular/core';
import { PaginationService } from 'src/app/shared/services/pagination.service';

@Component({
  selector: 'app-qachat-trending-tags',
  templateUrl: './qachat-trending-tags.component.html',
  styleUrls: ['./qachat-trending-tags.component.css'],
  providers: [PaginationService],

})
export class QachatTrendingTagsComponent implements OnInit {

  constructor(private page:PaginationService) { }

  ngOnInit(): void {
    this.page.init(`qachat/tags/list`, 'count', { reverse: true, prepend: false, group: false, where: false, limit: 9 });
  }

}
