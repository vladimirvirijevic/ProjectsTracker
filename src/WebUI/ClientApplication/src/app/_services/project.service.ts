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

  private handleError(error: any) {
    console.log(error);
    return throwError(error);
  }

  getAll(username: string): Observable<Project[]> {
    return this.http.get<Project[]>(`${environment.api_url}/projects/getall/${username}`).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }

  get(id: number): Observable<Project> {
    return this.http.get<Project>(`${environment.api_url}/projects/get/${id}`);
  }

  create(project) {
    return this.http.post<any>(`${environment.api_url}/projects/post`, project);
  }

  addTask(task) {
    return this.http.post<any>(`${environment.api_url}/projects/addtask`, task);
  }
}
