import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AppService} from "./app.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private http: HttpClient, private router: Router, private service: AppService) {
    //this.app.authenticate(undefined, undefined);
  }

  ngOnInit(){
    this.menuActivado = this.service.isSessionActive();
  }

  menuActivado = false;

  mostrarMenu(menu){
    return this.menuActivado = menu;
  }


  title = 'moodle-plzFE';
}
