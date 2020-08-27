import { Component, OnInit } from '@angular/core';
import { PaginationService } from 'src/app/shared/services/pagination.service';

@Component({
  selector: 'app-qachat-top-questions',
  templateUrl: './qachat-top-questions.component.html',
  styleUrls: ['./qachat-top-questions.component.css'],
  providers: [PaginationService],

})
export class QachatTopQuestionsComponent implements OnInit {

  constructor(private page:PaginationService) { }

  ngOnInit(): void {
    this.page.init(`questions`, 'votesCount', { reverse: true, prepend: false, group: true, where: false, limit: 5 });

  }

}
