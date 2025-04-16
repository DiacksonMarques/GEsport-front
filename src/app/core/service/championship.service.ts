import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Championship } from '../models/Championship';
import { ReturnGet } from '../models/ReturnGet';

@Injectable({
  providedIn: 'root'
})
export class ChampionshipService {

  private urlBase = `${environment.api}`;

  constructor(
    private httpCLient: HttpClient,
  ) { }

  createTeam(value: Championship): Observable<Championship>{
    return this.httpCLient.post<Championship>(`${this.urlBase}/createTeam`, value);
  }

  allTeams(): Observable<ReturnGet<Championship[]>>{
    return this.httpCLient.get<ReturnGet<Championship[]>>(`${this.urlBase}/teams`);
  }
}
