@Injectable()
export class AppService {
  constructor(private router: Router){}

  admin = false;
  session = false;

  setToken(token){
    sessionStorage.setItem('token', token);
    this.session = true;
  }

  getToken(){
    return sessionStorage.getItem('token');
  }

  isSessionActive(){
    if(this.getToken() !== ''){
      this.session = true;
    } else{
      this.session = false;
    };
    return this.session;
  }

  logout(){
    sessionStorage.setItem('token', '');
    this.session = false;
    this.router.navigate(['login']).then(() => console.log('redirigido desde logout'));
  }

  isHUA(){
    if(sessionStorage.getItem('isHUA') === 'true'){
      this.admin = true;
    } else{
      this.admin = false;
    };
    return this.admin;
  }

  setHUA(admin){
    sessionStorage.setItem('isHUA', admin);
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

import {Injectable} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";
import {throwError} from "rxjs";

import {Router} from "@angular/router";
