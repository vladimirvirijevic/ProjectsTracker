import { Component, OnInit } from '@angular/core';
import { TimerService, ProjectService, AuthenticationService } from '../_services';
import { Project } from '../_models';
import { Activity } from '../_models/activity';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styles: []
})
export class TimerComponent implements OnInit {
  time: number = 0;
  startTime: number;
  timer: any;
  selectedProjectName: string;
  projects: Project[];
  timerIsRunning = false;
  currentProject: Project;

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

  onChange(projectName) {
    this.timerService.setTimedProject(projectName);
  }

  displayTime() {
    this.timer = setInterval(() => {
      this.time = Date.now() - this.startTime;
    }, 1000);
  }
    
  startTimer() {
    if (this.timerService.isTimerRunning()) {
      return;
    }

    if (!this.selectedProjectName) {
      return;
    }

    this.timerIsRunning = true;
    this.startTime = Date.now();
    this.timerService.startTimer(this.startTime);
    this.displayTime();
  }

  

  stopTimer() {
    let d = new Date();

    this.timerIsRunning = false;
    this.time = 0;

    const activity = new Activity();
    activity.projectId = -1
    activity.projectName = this.selectedProjectName;



    activity.startTime = this.getTimeAsString(this.timerService.getStartingTime());
    activity.endTime = this.getTimeAsString(Date.now());
    activity.timeWorked = this.getTimeWorked((Date.now() - this.timerService.getStartingTime()));
    activity.date = this.getDateAsString(Date.now());

    this.timerService.stopTimer(activity).subscribe(
      () => clearInterval(this.timer)
    );
  }

  getProjects() {
    this.projectService.getAll(this.authService.currentUserValue.username)
      .subscribe(
        data => {
          this.projects = data;
          console.log(this.projects);
          // set default selected project name to first project
          if (this.projects) {
            if (this.timerService.getTimedProject) {
              this.selectedProjectName = this.timerService.getTimedProject();
            }
            else {
              this.selectedProjectName = this.projects[0].name;
            } 
          }
        }
      );
  }

  getTimeAsString(time) {
      let date = new Date(time);
      return date.getHours() + ":" + date.getMinutes();
  }

  getTimeWorked(time) {
    let date = new Date(time);
    return date.getMinutes().toString();
  }

  getDateAsString(time) {
      let date = new Date(time);
      return date.getDate() + "." + date.getMonth() + "." + date.getFullYear();
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }
}
