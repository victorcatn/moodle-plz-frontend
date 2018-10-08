import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material';
import {CidimageComponent} from "../cidimage/cidimage.component";
import {AppService} from "../../app.service";
import {AppComponent} from "../../app.component";


@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent {
  @ViewChild('sidenav') sidenav: MatSidenav;
  isExpanded = true;
  showSubmenu = false;
  isShowing = false;
  showSubSubMenu = false;

  estado = "conMouse"
  estado2 = "sinMouse"

  constructor(private service: AppService, private appcom: AppComponent){};

  logout(){
    this.service.logout();
    this.appcom.mostrarMenu(false);
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
