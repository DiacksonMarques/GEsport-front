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

  editTeam(value: Championship): Observable<Championship>{
    return this.httpCLient.put<Championship>(`${this.urlBase}/editTeam`, value);
  }

  deleteTeam(enrollment: string): Observable<ReturnGet<any>>{
    return this.httpCLient.delete<ReturnGet<any>>(`${this.urlBase}/deleteTeam/${enrollment}`);
  }

  allTeams(): Observable<ReturnGet<Championship[]>>{
    return this.httpCLient.get<ReturnGet<Championship[]>>(`${this.urlBase}/teams`);
  }

  getTeam(enrollment: string): Observable<ReturnGet<Championship>>{
    return this.httpCLient.get<ReturnGet<Championship>>(`${this.urlBase}/team/${enrollment}`);
  }
}
