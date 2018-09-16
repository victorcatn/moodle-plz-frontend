import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Group} from "../Group";
import {Project} from "../../project/Project";
import {catchError, map, tap} from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private groupUrl = 'http://localhost:8080/group';  // URL to web api

  constructor(
    private http: HttpClient) { }

  /** GET groups from the server */
  getGroups (): Observable<Group[]> {
    return this.http.get<Group[]>(this.groupUrl)
      .pipe(
        catchError(this.handleError('getGroups', []))
      );
  }

  /** GET group by id. Return `undefined` when id not found */
  getGroupNo404<Data>(id: string): Observable<Group> {
    const url = `${this.groupUrl}/?id=${id}`;
    return this.http.get<Group[]>(url)
      .pipe(
        map(projects => projects[0]), // returns a {0|1} element array
        catchError(this.handleError<Group>(`getGroup id=${id}`))
      );
  }

  /** GET group by id. Will 404 if id not found */
  getGroup(id: string): Observable<Group> {
    const url = `${this.groupUrl}/${id}`;
    return this.http.get<Group>(url).pipe(
      catchError(this.handleError<Group>(`getHero id=${id}`))
    );
  }

  //////// Save methods //////////

  /** POST: add a new group to the server */
  addGroup (group: Group): Observable<Group> {
    return this.http.post<Group>(this.groupUrl, group, httpOptions).pipe(
      catchError(this.handleError<Group>('addGroup'))
    );
  }
  
  generateGroup (project: Project): Observable<Group> {
    if(project.neededKnowledges == null){project.neededKnowledges = []}; //TODO: move this to backend
    if(project.neededSkills == null){project.neededSkills = []};
    const url = `${this.groupUrl}/generate`;
    return this.http.post<Group>(url, project, httpOptions).pipe(
      catchError(this.handleError<Group>('generateGroup'))
    );
  }

  /** DELETE: delete the group from the server */
  deleteGroup (group: Group | number): Observable<Group> {
    const id = typeof group === 'number' ? group : group.id;
    const url = `${this.groupUrl}/${id}`;

    return this.http.delete<Group>(url, httpOptions).pipe(
      catchError(this.handleError<Group>('deleteGroup'))
    );
  }

  /** PUT: update the group on the server */
  updateGroup (group: Group): Observable<any> {
    return this.http.put(this.groupUrl, group, httpOptions).pipe(
      catchError(this.handleError<any>('updateGroup'))
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
    console.log(message);
  }
}
