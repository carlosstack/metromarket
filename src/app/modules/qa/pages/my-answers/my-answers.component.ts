import { Component, OnInit, HostListener } from '@angular/core';
import { PaginationService } from 'src/app/shared/services/pagination.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-my-answers',
  templateUrl: './my-answers.component.html',
  styleUrls: ['./my-answers.component.css'],
  providers: [PaginationService],

})
export class MyAnswersComponent implements OnInit {

  constructor(private page:PaginationService,private auth:AuthService) { }

  ngOnInit() {
    this.auth.isAuth().take(1).subscribe(user=>{
      this.page.init(`answers`, 'date', { reverse: true, prepend: false, group: true, where: true, whereField: 'uid', operator: '==', value: user.uid, limit: 20 });
    })
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
