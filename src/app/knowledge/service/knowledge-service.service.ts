import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {catchError, map, tap} from "rxjs/operators";
import {MessageService} from "../../message.service";
import {Knowledge} from '../Knowledge';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class KnowledgeServiceService {

  private knowledgeUrl = 'http://localhost:8080/knowledges'

  constructor(private http: HttpClient, private messageService: MessageService) { }

  /** GET knowledges from the server */
  getKnowledges (): Observable<Knowledge[]> {
    return this.http.get<Knowledge[]>(this.knowledgeUrl)
      .pipe(
        tap(knowledges => this.log('fetched knowledges')),
        catchError(this.handleError('getknowledges', []))
      );
  }

  /** GET knowledge by id. Return `undefined` when id not found */
  getKnowledgeNo404<Data>(id: string): Observable<Knowledge> {
    const url = `${this.knowledgeUrl}/?id=${id}`;
    return this.http.get<Knowledge[]>(url)
      .pipe(
        map(knowledges => knowledges[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} knowledge id=${id}`);
        }),
        catchError(this.handleError<Knowledge>(`getknowledge id=${id}`))
      );
  }

  /** GET knowledge by id. Will 404 if id not found */
  getKnowledge(id: string): Observable<Knowledge> {
    const url = `${this.knowledgeUrl}/${id}`;
    return this.http.get<Knowledge>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Knowledge>(`getHero id=${id}`))
    );
  }

  /* GET knowledge whose name contains search term */
  searchKnowledge(term: string): Observable<Knowledge[]> {
    if (!term.trim()) {
      // if not search term, return empty knowledge array.
      return of([]);
    }
    return this.http.get<Knowledge[]>(`${this.knowledgeUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found knowledges matching "${term}"`)),
      catchError(this.handleError<Knowledge[]>('searchKnowledge', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new knowledge to the server */
  addKnowledge (knowledge: Knowledge): Observable<Knowledge> {
    return this.http.post<Knowledge>(this.knowledgeUrl, knowledge, httpOptions).pipe(
      tap((knowledge: Knowledge) => this.log(`added knowledge w/ id=${knowledge.id}`)),
      catchError(this.handleError<Knowledge>('addKnowledge'))
    );
  }

  /** DELETE: delete the knowledge from the server */
  deleteKnowledge (knowledge: Knowledge | number): Observable<Knowledge> {
    const id = typeof knowledge === 'number' ? knowledge : knowledge.id;
    const url = `${this.knowledgeUrl}/${id}`;

    return this.http.delete<Knowledge>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted knowledge id=${id}`)),
      catchError(this.handleError<Knowledge>('deleteKnowledge'))
    );
  }

  /** PUT: update the knowledge on the server */
  updateKnowledge (knowledge: Knowledge): Observable<any> {
    const id = typeof knowledge === 'number' ? knowledge : knowledge.id;
    const url = `${this.knowledgeUrl}/${id}`;
    return this.http.put(url, knowledge, httpOptions).pipe(
      tap(_ => this.log(`updated knowledge id=${knowledge.id}`)),
      catchError(this.handleError<any>('Knowledge'))
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
    this.messageService.add(`KnowledgeService: ${message}`);
  }
}
