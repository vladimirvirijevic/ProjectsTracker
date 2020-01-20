import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../_models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(projectId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${environment.api_url}/tasks/get/${projectId}`);
  }

  changeStatus(task) {
    return this.http.put<any>(`${environment.api_url}/tasks/changestatus`, task);
  }
}
