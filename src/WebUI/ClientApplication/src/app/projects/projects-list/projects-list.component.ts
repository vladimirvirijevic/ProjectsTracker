import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/_models';
import { ProjectService } from 'src/app/_services/project.service';
import { AuthenticationService } from 'src/app/_services';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styles: []
})
export class ProjectsListComponent implements OnInit {
  projects: Project[] = [];

  constructor(
    private projectService: ProjectService,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.getProjects();
  }

  getProjects() {
    this.projectService.getAll(this.authService.currentUserValue.username)
      .subscribe(
        data => {
          console.log(data);
          this.projects = data;
        },
        error => {
          console.log(error);
        }
      );
  }
}
