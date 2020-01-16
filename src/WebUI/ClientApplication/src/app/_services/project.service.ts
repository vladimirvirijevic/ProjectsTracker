import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Project } from '../_models';
import { throwError, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
  httpOptions = {
    headers: this.headers
  };

  private handleError(error: any) {
    console.log(error);
    return throwError(error);
  }

  getAll(): Observable<Project[]> {
    return this.http.get<Project[]>(`${environment.api_url}/projects/getall`).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }
}
