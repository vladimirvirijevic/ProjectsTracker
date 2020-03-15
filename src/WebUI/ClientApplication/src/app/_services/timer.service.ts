import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  constructor() { }

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

  stopTimer() {
    localStorage.removeItem('startingTime');
    localStorage.setItem('timerIsRunning', 'FALSE');
  }
}
