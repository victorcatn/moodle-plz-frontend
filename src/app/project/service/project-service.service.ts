import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Project} from "../Project";
import {catchError, map, tap} from "rxjs/operators";
import {MessageService} from "../../message.service";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProjectServiceService {

  private projectUrl = 'http://localhost:8080/project';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET heroes from the server */
  getProjects (): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectUrl)
      .pipe(
        tap(projects => this.log('fetched projects')),
        catchError(this.handleError('getProjects', []))
      );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getProjectNo404<Data>(id: string): Observable<Project> {
    const url = `${this.projectUrl}/?id=${id}`;
    return this.http.get<Project[]>(url)
      .pipe(
        map(projects => projects[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} project id=${id}`);
        }),
        catchError(this.handleError<Project>(`getHero id=${id}`))
      );
  }

  /** GET project by id. Will 404 if id not found */
  getProject(id: string): Observable<Project> {
    const url = `${this.projectUrl}/${id}`;
    return this.http.get<Project>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Project>(`getHero id=${id}`))
    );
  }

  /* GET project whose fullName contains search term */
  searchProject(term: string): Observable<Project[]> {
    if (!term.trim()) {
      // if not search term, return empty project array.
      return of([]);
    }
    return this.http.get<Project[]>(`${this.projectUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found projects matching "${term}"`)),
      catchError(this.handleError<Project[]>('searchProject', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new project to the server */
  addProject (hero: Project): Observable<Project> {
    return this.http.post<Project>(this.projectUrl, hero, httpOptions).pipe(
      tap((customer: Project) => this.log(`added project w/ id=${customer.id}`)),
      catchError(this.handleError<Project>('addHero'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteProject (project: Project | number): Observable<Project> {
    const id = typeof project === 'number' ? project : project.id;
    const url = `${this.projectUrl}/${id}`;

    return this.http.delete<Project>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted project id=${id}`)),
      catchError(this.handleError<Project>('deleteProject'))
    );
  }

  /** PUT: update the project on the server */
  updateProject (project: Project): Observable<any> {
    return this.http.put(this.projectUrl, project, httpOptions).pipe(
      tap(_ => this.log(`updated project id=${project.id}`)),
      catchError(this.handleError<any>('updateProject'))
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
    this.messageService.add(`ProjectService: ${message}`);
  }
}
