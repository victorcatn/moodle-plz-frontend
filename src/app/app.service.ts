import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {LoginComponent} from "./login/login.component";
import {throwError} from "rxjs";
import {AppComponent} from "./app.component";

@Injectable()
export class AppService {
   constructor(){}

   admin = false;

   setToken(token){
     sessionStorage.setItem('token', token);
   }

   getToken(){
     return sessionStorage.getItem('token');
   }

   logout(){
     sessionStorage.setItem('token', '');
   }

   isHUA(){
     return this.admin;
   }

  setHUA(admin){
    this.admin = admin;
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














  /*authenticated = false;

  constructor(private http: HttpClient){}

  authenticate(staffMember, callback){
    const headers = new HttpHeaders(staffMember ? {
      authorization: 'Basic' + btoa(staffMember.document + staffMember.password)
    }: {});

    this.http.get('http://localhost:8080/user', {headers: headers}).subscribe(response => {
      if (response['document']){
        this.authenticated = true;
      } else {
        this.authenticated = false;
      }
      return callback && callback();
    })
  }*/
}
