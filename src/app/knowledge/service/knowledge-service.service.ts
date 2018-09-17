import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Knowledge} from "../Knowledge";

@Injectable({
  providedIn: 'root'
})
export class KnowledgeServiceService {

  constructor() { }

  getKnowledges(): Observable<Knowledge[]>{
    let vacio: Observable<Knowledge[]> = null
    return vacio
  }
}
