import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NotifService } from 'src/app/shared/services/notif.service';



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
 
  constructor() {
    
  }

  
  ngOnInit() {
  
  }


  openNav() {
    document.getElementById("mySidebar").style.width = "100%";
  }
  
   closeNav() {
    document.getElementById("mySidebar").style.width = "0";

  }
 

  
}
