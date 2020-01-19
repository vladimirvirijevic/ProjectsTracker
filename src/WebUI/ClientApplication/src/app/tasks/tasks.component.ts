import { Component, OnInit } from '@angular/core';
import { ModalService } from '../_modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from '../_services';
import { Project } from '../_models';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styles: []
})
export class TasksComponent implements OnInit {
  createTaskForm: FormGroup;
  projects: Project[];
  currentProject: Project;

  constructor(
    private modalService: ModalService,
    private fb: FormBuilder,
    private projectService: ProjectService
  ) { }

  ngOnInit() {
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
    //this.projectService.getAll()
  }
}
