import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PaginationService } from 'src/app/shared/services/pagination.service';

@Component({
  selector: 'app-my-questions',
  templateUrl: './my-questions.component.html',
  styleUrls: ['../../components/questions-template/questions-template.component.css'],
  providers: [PaginationService],

})
export class MyQuestionsComponent implements OnInit {

  constructor(private page: PaginationService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isAuth().subscribe(user => {
      this.page.init(`users-questions/${user.uid}/questions`, 'date', { reverse: true, prepend: false, group: false, where: false, limit: 20 });
    });
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
