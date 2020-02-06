import { Component, OnInit } from '@angular/core';
import { TimerService, ProjectService, AuthenticationService } from '../_services';
import { Project } from '../_models';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styles: []
})
export class TimerComponent implements OnInit {
  time: number;
  startTime: number;
  timer: any;
  selectedProjectName: string;
  projects: Project[];
  timerIsRunning = false;

  constructor(
    private timerService: TimerService,
    private projectService: ProjectService,
    private authService: AuthenticationService
  ) {
    if (this.timerService.isTimerRunning()) {
      this.startTime = timerService.getStartingTime();
      this.displayTime();
    }
  }

  ngOnInit() {
    this.timerIsRunning = this.timerService.isTimerRunning();
    this.getProjects();
  }

  displayTime() {
    this.timer = setInterval(() => {
      this.time = Date.now() - this.startTime;
      console.log(this.time);
    }, 1000);
  }
    
  startTimer() {
    if (this.timerService.isTimerRunning()) {
      return;
    }
    this.timerIsRunning = true;
    this.startTime = Date.now();
    this.timerService.startTimer(this.startTime);
    this.displayTime();
  }

  stopTimer() {
    this.timerIsRunning = false;
    this.time = 0;
    this.timerService.stopTimer();
    clearInterval(this.timer);
  }

  getProjects() {
    this.projectService.getAll(this.authService.currentUserValue.username)
      .subscribe(
        data => {
          this.projects = data;
          // set default selected project name to first project
          if (this.projects) {
            this.selectedProjectName = this.projects[0].name;
          }
        }
      );
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }
}
