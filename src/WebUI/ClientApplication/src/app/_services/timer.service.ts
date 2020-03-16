import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Activity } from '../_models/activity';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  constructor(
    private http: HttpClient
  ) { }

  startTimer(time) {
    localStorage.setItem('startingTime', time);
    localStorage.setItem('timerIsRunning', 'TRUE');
  }

  setTimedProject(projectName) {
    localStorage.setItem('timedProject', projectName);
  }

  getTimedProject() {
    return localStorage.getItem('timedProject');
  }

  isTimerRunning(): boolean {
    if (localStorage.getItem('timerIsRunning') === 'TRUE') {
      return true;
    }
    
    return false;
  }

  getStartingTime(): number {
    if (localStorage.getItem('startingTime')) {
      return Number(localStorage.getItem('startingTime'));
    }
    
    return -100;
  }

  stopTimer(activity: Activity) {
    return this.http.post(`${environment.api_url}/timer/stop`, activity)
      .pipe(
        tap((data) => {
          console.log(data);
          localStorage.removeItem('startingTime');
          localStorage.setItem('timerIsRunning', 'FALSE');
          console.log(localStorage.getItem('timerIsRunning'));
          console.log(localStorage.getItem('startingTime'));
        })
      );
  }

  getActivites(): Observable<Activity[]> {
    return this.http.get<Activity[]>(`${environment.api_url}/timer/getactivities`);
  }
}
