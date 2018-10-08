import {Component, OnInit} from '@angular/core';
import {AppService} from "../../app.service";
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest, HttpResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import { catchError, map, tap} from 'rxjs/operators';

@Component({
  selector: 'app-cidimage',
  templateUrl: './cidimage.component.html',
  styleUrls: ['./cidimage.component.css']
})
export class CidimageComponent implements OnInit {

  title: 'ModdlePlz';
  greeting: {}

  document: String;

  constructor(private app: AppService, private http: HttpClient){
  }

  authenticated(){
    return this.app.authenticated;
  }

  ngOnInit() {
    let url = 'http://localhost:8080/user';

    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': 'Basic ' + sessionStorage.getItem('token')
    });

    let options = {headers: headers};
    this.http.post<Observable<Object>>(url, {}, options).
    subscribe(principal => {
        this.document = principal['document'];
      },
      error => {
        if(error.status == 401)
          alert('Unauthorized')
      })

    this.getHeader();
  }

  getHeader(){
    return sessionStorage.getItem('token');
  }

  logout(){
    sessionStorage.setItem('token', '');
  }

  private handleError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      console.error('An error ocurred:', error.error.message);
    } else{
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`
      );
    }
    return throwError(
      'Something go bad, try again'
    )
  }

}
