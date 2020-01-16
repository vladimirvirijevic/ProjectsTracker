import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Project } from 'src/app/_models';
import { ProjectService } from 'src/app/_services/project.service';
import { AuthenticationService } from 'src/app/_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects-create',
  templateUrl: './projects-create.component.html',
  styles: []
})
export class ProjectsCreateComponent implements OnInit {
  createForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private authService: AuthenticationService,
    private rotuter: Router
  ) {
    this.createForm = this.fb.group({
      'name': ['', Validators.required],
      'description': ['', Validators.required]
    });
  }

  get name() { return this.createForm.get('name') }
  get description() { return this.createForm.get('description') }

  ngOnInit() {
  }

  onSubmit() {
    if (this.createForm.invalid) {
      return;
    }

    const newProject = {
      username: this.authService.currentUserValue.username,
      name: this.name.value,
      description: this.description.value
    };

    this.projectService.create(newProject)
      .subscribe(
        success => {
          this.rotuter.navigateByUrl('/app/projects');
        },
        error => {
          console.log(error);
        }
      );
  }
}
