import { Component, OnInit } from '@angular/core';
import { ModalService } from '../_modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectService, AuthenticationService } from '../_services';
import { Project } from '../_models';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styles: []
})
export class TasksComponent implements OnInit {
  createTaskForm: FormGroup;
  projects: Project[];
  selectedProjectName: string;
  selectedProject: Project;
  projectIsSelected = false;

  constructor(
    private modalService: ModalService,
    private fb: FormBuilder,
    private projectService: ProjectService,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.getProjects();
    this.createTaskForm = this.fb.group({
      'taskName': ['', Validators.required]
    });
  }

  get taskName() { return this.createTaskForm.get('taskName'); }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  onSubmit() {
    if (this.createTaskForm.invalid) {
      return;
    }
  }

  getProjects() {
    this.projectService.getAll(this.authService.currentUserValue.username)
      .subscribe(
        data => {
          this.projects = data;
        }
      );
  }

  getSelectedProject() {
    this.projectIsSelected = true;
    this.selectedProject = this.projects.filter(x => x.name === this.selectedProjectName)[0];
    console.log(this.selectedProject);
  }

  changeProject() {
    this.projectIsSelected = false;
    this.selectedProject = null;
  }
}
