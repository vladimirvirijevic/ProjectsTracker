import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/_models';
import { ProjectService } from 'src/app/_services/project.service';
import { AuthenticationService } from 'src/app/_services';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styles: []
})
export class ProjectDetailComponent implements OnInit {
  projectId: number;
  project: Project;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.projectId = Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.projectId);

    this.getProject();
  }

  getProject() {
    this.projectService.get(this.projectId)
      .subscribe(
        data => {
          console.log(data);
          this.project = data;
        },
        error => {
          console.log(error);
        }
      );
  }

}
