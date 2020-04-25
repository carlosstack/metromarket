import { Component, OnInit } from '@angular/core';
import { NormalOfertService } from 'src/app/services/normal-ofert.service';
import { AuthService } from 'src/app/services/auth.service';
import { OfertInterface } from 'src/app/models/ofert';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.css']
})
export class ExchangeComponent implements OnInit {

  public activeOferts: OfertInterface[];
  public MyActiveOferts: OfertInterface[];
  public MyAcceptedActiveOferts: OfertInterface[];
  public MyNewActiveOferts: OfertInterface[];
  public currentUserUID;

  constructor(private authService: AuthService, private ofertService: NormalOfertService) { }

  ngOnInit() {
    this.authService.isAuth().subscribe((user) => {
      this.currentUserUID = user.uid;
      this.ofertService.getMyActiveOferts(user.uid).subscribe((activeOferts) => {
        if (!this.MyAcceptedActiveOferts && !this.MyNewActiveOferts) {
          this.activeOferts = activeOferts.sort((a, b) => b.date - a.date);
          this.MyActiveOferts =  activeOferts;
        } else {
          this.MyActiveOferts =  activeOferts;
          this.activeOferts = this.MyActiveOferts.concat(this.MyAcceptedActiveOferts).concat(this.MyNewActiveOferts).sort((a, b) => b.date - a.date);

        }
      })
      this.ofertService.getMyAcceptedActiveOferts(user.uid).subscribe((activeOferts) => {
        if (!this.MyActiveOferts && !this.MyNewActiveOferts) {
          this.activeOferts = activeOferts.sort((a, b) => b.date - a.date);
          this.MyAcceptedActiveOferts =  activeOferts;
        } else {
          this.MyAcceptedActiveOferts =  activeOferts;
          this.activeOferts = this.MyAcceptedActiveOferts.concat(this.MyActiveOferts).concat(this.MyNewActiveOferts).sort((a, b) => b.date - a.date);

        }
      })
      this.ofertService.getMyNewActiveOferts(user.uid).subscribe((activeOferts) => {
        if (!this.MyActiveOferts && !this.MyAcceptedActiveOferts) {
          this.activeOferts = activeOferts.sort((a, b) => b.date - a.date);
          this.MyNewActiveOferts =  activeOferts;
        } else {
          this.MyNewActiveOferts =  activeOferts;
          this.activeOferts = this.MyNewActiveOferts.concat(this.MyActiveOferts).concat(this.MyAcceptedActiveOferts).sort((a, b) => b.date - a.date);
        
        }
      })
    })
  }

  getColor(status: string) {
    switch (status) {
      case 'ACCEPTED':
        return 'teal';
      case 'ACCEPTED_UNSUCCESS_AND_WAITING_FOR_RATING':
        return 'coral';
      case 'ACCEPTED_SUCCESS_AND_WAITING_FOR_RATING':
        return 'coral';
      case 'NEW':
        return 'dodgerblue';
    }
  }

  getStatusByOfert(ofert) {
    if (this.currentUserUID == ofert.ownerUID) {
      return ofert.statusOwner;
    } else if (this.currentUserUID == ofert.acceptedByUID) {
      return ofert.statusAcceptedBy;
    }
  }
  filterDuplicates() {
    var activeOferts = [];
    this.activeOferts = this.activeOferts.sort((a, b) => a.date - b.date);

    for (let i = 0; i < this.activeOferts.length; i++) {

      if (i == 0) {
        activeOferts.push(this.activeOferts[i])
      } else {
        var duplicate = false;
        for (let j = 0; j < activeOferts.length; j++) {

          if (this.activeOferts[i].id == activeOferts[j].id) {
            activeOferts.splice(j, 1, this.activeOferts[i])
            duplicate = true;
          }
        }
        if (!duplicate) {
          activeOferts.push(this.activeOferts[i])
        }

      }
    }
    this.activeOferts = activeOferts;
  }


}
