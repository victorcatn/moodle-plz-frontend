import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material';
import {AppService} from "../../app.service";
import {AppComponent} from "../../app.component";


@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit{
  @ViewChild('sidenav') sidenav: MatSidenav;
  isExpanded = true;
  isShowing = false;

  constructor(private service: AppService, private appcom: AppComponent){};

  ngOnInit(){
    this.showSection(this.service.isHUA());
  }

  logout(){
    this.appcom.mostrarMenu(false);
    this.service.logout();
  }
  show = false;

  showSection(section){
      return this.show = section;
  }

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }
}
