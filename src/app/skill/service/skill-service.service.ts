import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import { Skill } from '../Skill';
import {catchError, map, tap} from "rxjs/operators";
import {MessageService} from "../../message.service";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SkillServiceService {

  private skillUrl = 'http://localhost:8080/skills'

  constructor(private http: HttpClient, private messageService: MessageService) { }

  /** GET skills from the server */
  getSkills (): Observable<Skill[]> {
    return this.http.get<Skill[]>(this.skillUrl)
      .pipe(
        tap(skills => this.log('fetched skills')),
        catchError(this.handleError('getSkills', []))
      );
  }

  /** GET skill by id. Return `undefined` when id not found */
  getProjectNo404<Data>(id: string): Observable<Skill> {
    const url = `${this.skillUrl}/?id=${id}`;
    return this.http.get<Skill[]>(url)
      .pipe(
        map(skills => skills[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} skill id=${id}`);
        }),
        catchError(this.handleError<Skill>(`getSkill id=${id}`))
      );
  }

  /** GET skill by id. Will 404 if id not found */
  getSkill(id: string): Observable<Skill> {
    const url = `${this.skillUrl}/${id}`;
    return this.http.get<Skill>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Skill>(`getHero id=${id}`))
    );
  }

  /* GET skill whose name contains search term */
  searchSkill(term: string): Observable<Skill[]> {
    if (!term.trim()) {
      // if not search term, return empty skill array.
      return of([]);
    }
    return this.http.get<Skill[]>(`${this.skillUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found skills matching "${term}"`)),
      catchError(this.handleError<Skill[]>('searchSkill', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new skill to the server */
  addSkill (skill: Skill): Observable<Skill> {
    return this.http.post<Skill>(this.skillUrl, skill, httpOptions).pipe(
      tap((skill: Skill) => this.log(`added skill w/ id=${skill.id}`)),
      catchError(this.handleError<Skill>('addSkill'))
    );
  }

  /** DELETE: delete the skill from the server */
  deleteSkill (skill: Skill | number): Observable<Skill> {
    const id = typeof skill === 'number' ? skill : skill.id;
    const url = `${this.skillUrl}/${id}`;

    return this.http.delete<Skill>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted skill id=${id}`)),
      catchError(this.handleError<Skill>('deleteSkill'))
    );
  }

  /** PUT: update the skill on the server */
  updateSkill (skill: Skill): Observable<any> {
    return this.http.put(this.skillUrl, skill, httpOptions).pipe(
      tap(_ => this.log(`updated skill id=${skill.id}`)),
      catchError(this.handleError<any>('Skill'))
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
