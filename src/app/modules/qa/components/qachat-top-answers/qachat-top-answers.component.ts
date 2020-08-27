import { Component, OnInit } from '@angular/core';
import { PaginationService } from 'src/app/shared/services/pagination.service';

@Component({
  selector: 'app-qachat-top-answers',
  templateUrl: './qachat-top-answers.component.html',
  styleUrls: ['./qachat-top-answers.component.css'],
  providers: [PaginationService],

})
export class QachatTopAnswersComponent implements OnInit {

  constructor(private page:PaginationService) { }

  ngOnInit(): void {
    this.page.init(`answers`, 'votesCount', { reverse: true, prepend: false, group: true, where: false,  limit: 5 });
  }

}
