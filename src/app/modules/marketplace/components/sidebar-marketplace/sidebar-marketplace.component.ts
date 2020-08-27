import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-marketplace',
  templateUrl: './sidebar-marketplace.component.html',
  styleUrls: ['./sidebar-marketplace.component.css']
})
export class SidebarMarketplaceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  openNav() {
    document.getElementById("mySidebar").style.width = "200px";
  }
  
   closeNav() {
    document.getElementById("mySidebar").style.width = "0";

  }

}
