import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {StaffMember} from "../StaffMember";
import {catchError, map, tap} from "rxjs/operators";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class StaffMemberService {

  private staffMembersUrl = 'http://localhost:8080/staffmember';  // URL to web api

  constructor(
    private http: HttpClient) { }

  /** GET staff members from the server */
  getStaffMembers (): Observable<StaffMember[]> {
    return this.http.get<StaffMember[]>(this.staffMembersUrl)
      .pipe(
        catchError(this.handleError('getstaffmembers', []))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - fullName of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(`staffmemberService: ${message}`);
  }
}
