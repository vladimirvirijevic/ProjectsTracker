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
    if (this.projectService.getCurrentProject) {
      this.selectedProject = this.projectService.getCurrentProject;
      this.projectIsSelected = true;
    }

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

    const newTask = {
      name: this.taskName.value,
      projectId: this.selectedProject.id
    };

    console.log(newTask);

    this.projectService.addTask(newTask)
      .subscribe();
  }

  getProjects() {
    this.projectService.getAll(this.authService.currentUserValue.username)
      .subscribe(
        data => {
          this.projects = data;
        }
      );
  }

  selectProject() {
    this.projectIsSelected = true;
    this.selectedProject = this.projects.filter(x => x.name === this.selectedProjectName)[0];

    if (this.selectedProject) {
      this.projectService.setCurrentProject(this.selectedProject);
      console.log(this.selectedProject);
    }
  }

  changeProject() {
    this.projectIsSelected = false;
    this.selectedProject = null;
  }
}
