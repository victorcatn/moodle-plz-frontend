import {Component, OnInit} from '@angular/core';
import {AppService} from "./app.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private app: AppService, private http: HttpClient, private router: Router, private spinner: NgxSpinnerService) {
    this.app.authenticate(undefined, undefined);
  }

  ngOnInit(){
    /*this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 300);*/
  }
  logout(){
    this.http.post('logout',{}).subscribe(() =>{
      this.app.authenticated = false;
      this.router.navigateByUrl('/login');
    });
  }

  title = 'moodle-plzFE';
}
