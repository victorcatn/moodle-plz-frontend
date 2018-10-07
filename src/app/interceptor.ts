import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
/*import {BehaviorSubject} from "rxjs";
import {catchError, finalize, map} from "rxjs/operators";*/

/*@Injectable()
export class HTTPStatus{
  private  request$: BehaviorSubject<boolean>;
  constructor(){
    this.request$ = new BehaviorSubject(false);
  }

  setHTTPStatus(inFlight: boolean){
    this.request$.next(inFlight);
  }

  getHTTPStatus(): Observable<boolean>{
    return this.request$.asObservable();
  }
}*/

@Injectable()
export class  AuthInterceptor implements HttpInterceptor{

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>>{
    const idToken = localStorage.getItem("id_token");

    if(idToken){
      const cloned = req.clone({
        headers: req.headers.set("Authorization", idToken)
      });

      return next.handle(cloned);

    }

    else {
      return next.handle(req);
    }
  }
}
    /*return next.handle(req).pipe(
      map(event => {return event;}),
      catchError(error => {return Observable.throw(error);} ),
      finalize(() => {this.status.setHTTPStatus(false);})
    )
  }
}*/
