import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-cidimage',
  templateUrl: './cidimage.component.html',
  styleUrls: ['./cidimage.component.css']
})
export class CidimageComponent implements OnInit {

  title: 'ModdlePlz';

  document: String;
  auth: boolean;

  constructor(private http: HttpClient){
  }

  ngOnInit() {

    //let url = 'http://localhost:8080/user';

    /*let headers: HttpHeaders = new HttpHeaders({
      'Authorization': 'Basic ' + sessionStorage.getItem('token')
    });*/

    //this.getHeader();
  }

  show = true;

  showLogin(show){
    console.log(show);
    return this.show = show;

  }


}
