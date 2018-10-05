import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {StaffMember} from '../StaffMember';
import {catchError, map, tap} from 'rxjs/operators';
import { MessageService } from '../../message.service';
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {CidimageComponent} from "../../components/cidimage/cidimage.component";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

cidimage: CidimageComponent;

@Injectable({
  providedIn: 'root'
})
export class StaffMemberService {

  private staffMembersUrl = 'http://localhost:8080/staffmembers';  // URL to web api

  constructor(
    private http: HttpClient, private messageService: MessageService, private router: Router) { }

  /** GET staff members from the server */
  getStaffMembers (): Observable<StaffMember[]> {
    return this.http.get<StaffMember[]>(this.staffMembersUrl)
      .pipe(
        catchError(this.handleError('getstaffmembers', []))
      );
  }

  /** GET staffMembers by id. Return `undefined` when id not found */
  getStaffMemberNo404<Data>(id: string): Observable<StaffMember> {
    const url = `${this.staffMembersUrl}/?id=${id}`;
    return this.http.get<StaffMember[]>(url)
      .pipe(
        map(staffMembers => staffMembers[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} staffMembers id=${id}`);
        }),
        catchError(this.handleError<StaffMember>(`getstaffMembers id=${id}`))
      );
  }

  /** GET staffMembers by id. Will 404 if id not found */
  getStaffMember(id: string): Observable<StaffMember> {
    const url = `${this.staffMembersUrl}/${id}`;
    return this.http.get<StaffMember>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<StaffMember>(`getStaffMembers id=${id}`))
    );
  }

  /* GET staffMember whose name contains search term */
  searchStaffMember(term: string): Observable<StaffMember[]> {
    if (!term.trim()) {
      // if not search term, return empty staffMember array.
      return of([]);
    }
    return this.http.get<StaffMember[]>(`${this.staffMembersUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found staffMembers matching "${term}"`)),
      catchError(this.handleError<StaffMember[]>('searchStaffMember', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new staffMember to the server */
  addStaffMember (staffMember: StaffMember): Observable<StaffMember> {
    return this.http.post<StaffMember>(this.staffMembersUrl, staffMember, httpOptions).pipe(
      tap((staffMember: StaffMember) => this.log(`added staffMember w/ id=${staffMember.id}`)),
      catchError(this.handleError<StaffMember>('addStaffMember'))
    );
  }

  /** DELETE: delete the staffMember from the server */
  deleteStaffMember (staffMember: StaffMember | number): Observable<StaffMember> {
    const id = typeof staffMember === 'number' ? staffMember : staffMember.id;
    const url = `${this.staffMembersUrl}/${id}`;

    return this.http.delete<StaffMember>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted staffMember id=${id}`)),
      catchError(this.handleError<StaffMember>('deleteStaffMember'))
    );
  }

  /** PUT: update the staffMember on the server */
  updateStaffMember (staffMember: StaffMember): Observable<any> {
    const id = typeof staffMember === 'number' ? staffMember : staffMember.id;
    const url = `${this.staffMembersUrl}/${id}`;

    return this.http.put(url, staffMember, httpOptions).pipe(
      tap(_ => this.log(`updated staffMember id=${staffMember.id}`)),
      catchError(this.handleError<any>('StaffMember'))
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

  /*loginStaffMember(staffMember: StaffMember): Observable<any>{
    const url = `${this.staffMembersUrl}/login`;
    return this.http.post(url, staffMember, {responseType: 'text'})
      .pipe(tap(data => {
        environment.credentials.document = staffMember.document.toString();
        environment.credentials.password = staffMember.password.toString();
        environment.httpOptions.headers = httpOptions.headers;
        environment.httpOptions.headers = environment.httpOptions.headers.append('Authorization', 'Basic '
          + btoa(staffMember.document + ':' + staffMember.password));
        environment.authentication = true;
        this.router.navigate(['/']);
      }));
  }*/
}
