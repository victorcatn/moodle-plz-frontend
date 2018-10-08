import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material';
import {trigger, state, style, animate, transition, animation} from '@angular/animations';


@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css'],
  /*animations: [
    trigger('animacionMenu',[
      state('sinMouse', style({
        transform : 'translateX(-80%)'
      })),
      state('conMouse', style({
        transform : 'translateX(0)'
      })),
      transition('sinMouse <=> conMouse', animate('300ms'))
    ])
  ]*/
})
export class MenubarComponent {
  @ViewChild('sidenav') sidenav: MatSidenav;
  isExpanded = true;
  showSubmenu = false;
  isShowing = false;
  showSubSubMenu = false;

  estado = "conMouse"
  estado2 = "sinMouse"
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
