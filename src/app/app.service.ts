import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class AppService {
  authenticated = false;

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
  }
}
