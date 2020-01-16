import { Component, OnInit } from '@angular/core';
import { Project } from '../_models';
import { ProjectService } from '../_services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styles: []
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];

  constructor(
    private projectService: ProjectService
    ) { }

  ngOnInit() {
    this.getProjects();
  }

  getProjects() {
    this.projectService.getAll()
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
