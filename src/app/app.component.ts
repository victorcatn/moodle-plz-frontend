import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private http: HttpClient, private router: Router) {
    //this.app.authenticate(undefined, undefined);
  }

  ngOnInit(){
    //this.mostrarMenu();
  }

  menuActivado = false;

  mostrarMenu(menu){
    return this.menuActivado = menu;
  }


  title = 'moodle-plzFE';
}
