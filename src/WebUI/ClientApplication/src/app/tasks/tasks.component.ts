import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { ModalService } from '../_modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectService, AuthenticationService, TimerService } from '../_services';
import { Project, Task } from '../_models';
import { TasksService } from '../_services/tasks.service';
import { Router } from '@angular/router';

declare var $:any;

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
  todoTasks: Task[] = [];
  workingTasks: Task[] = [];
  doneTasks: Task[] = [];

  constructor(
    private modalService: ModalService,
    private fb: FormBuilder,
    private projectService: ProjectService,
    private authService: AuthenticationService,
    private taskService: TasksService,
    private timerService: TimerService,
    private router: Router
  ) { }

  initializeSelect() {
    $(document).ready(function(){
      $('select').formSelect();
    });
  }

  todo = [];

  doing = [];

  done = [];

  drop(event: CdkDragDrop<string[]>, board: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }

    const selectedTask = event.container.data[event.currentIndex];
    //console.log(selectedTask);
    this.changeTaskStatus(board, selectedTask.id);
  }

  ngOnInit() {
    this.getProjects();
    //this.initializeSelect();
    
    if (this.projectService.getCurrentProject) {
      this.selectedProject = this.projectService.getCurrentProject;
      this.projectIsSelected = true;
      this.loadTasks();
    }

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

    this.projectService.addTask(newTask)
      .subscribe(
        data => {
          this.loadTasks();
          this.closeModal('create-task-modal');
        }
      );
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

  selectProject() {
    if (!this.selectedProjectName) {
      return;
    }

    this.projectIsSelected = true;
    this.selectedProject = this.projects.filter(x => x.name === this.selectedProjectName)[0];

    if (this.selectedProject) {
      this.projectService.setCurrentProject(this.selectedProject);
      this.loadTasks();
    }
  }

  changeProject() {
    this.projectIsSelected = false;
    this.selectedProject = null;
    this.loadTasks();
  }

  changeTaskStatus(changedStatus, taskId) {
    const task = {
      username: this.authService.currentUserValue.username,
      id: taskId,
      status: changedStatus,
      projectId: this.selectedProject.id
    };

    this.taskService.changeStatus(task)
      .subscribe(
        data => {
          this.loadTasks();
        }
      );
  }

  loadTasks() {
    this.taskService.getAll(this.selectedProject.id)
      .subscribe(
        data => {
          this.setTasks(data);
        }
      );
  }

  deleteTask(taskId) {
    this.taskService.delete(this.selectedProject.id, taskId)
      .subscribe(
        () => this.loadTasks()
      );
  }

  setTasks(data) {
    this.todo = data.result.filter(x => x.status === 'TODO');
    this.doing = data.result.filter(x => x.status === 'DOING');
    this.done = data.result.filter(x => x.status === 'DONE');
  }

  goToTimer() {
    this.timerService.setTimedProject(this.selectedProjectName);
    this.router.navigateByUrl('app/timer');
  }
}
