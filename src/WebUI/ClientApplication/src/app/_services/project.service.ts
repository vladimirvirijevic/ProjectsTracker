import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Project } from '../_models';
import { throwError, Observable, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private currentProjectSubject = new BehaviorSubject<Project>(null);

  setCurrentProject(project: Project) {
    localStorage.setItem('currentProject', JSON.stringify(project));
    this.currentProjectSubject = new BehaviorSubject<Project>(project);
  }

  /*
  public get getCurrentProject(): Project {
    return this.currentProjectSubject.value;
  }
  
  */
  public get getCurrentProject(): Project {
    const jsonProject = JSON.parse(localStorage.getItem('currentProject'));

    if (localStorage.getItem('currentProject')) {
      this.currentProjectSubject.next(JSON.parse(localStorage.getItem('currentProject')));
    }

    return this.currentProjectSubject.value;
  }

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
