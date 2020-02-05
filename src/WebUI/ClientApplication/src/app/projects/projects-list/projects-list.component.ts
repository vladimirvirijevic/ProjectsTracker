import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/_models';
import { ProjectService } from 'src/app/_services/project.service';
import { AuthenticationService } from 'src/app/_services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'src/app/_modal';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styles: []
})
export class ProjectsListComponent implements OnInit {
  projects: Project[] = [];
  createProjectForm: FormGroup;

  constructor(
    private projectService: ProjectService,
    private authService: AuthenticationService,
    private fb: FormBuilder,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    this.createProjectForm = this.fb.group({
      'name': ['', Validators.required],
      'description': ['', Validators.required]
    });
    this.getProjects();
  }

  get name() { return this.createProjectForm.get('name') }
  get description() { return this.createProjectForm.get('description') }

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

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  onSubmit() {
    if (this.createProjectForm.invalid) {
      return;
    }

    const newProject = {
      username: this.authService.currentUserValue.username,
      name: this.name.value,
      description: this.description.value
    };

    this.projectService.create(newProject)
      .subscribe(
        () => this.getProjects()
      );
  }
}
