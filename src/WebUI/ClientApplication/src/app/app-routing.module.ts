import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { TimerComponent } from './timer/timer.component';
import { ProjectsComponent } from './projects/projects.component';
import { AuthGuard } from './_helpers';
import { ProjectsCreateComponent } from './projects/projects-create/projects-create.component';
import { ProjectsListComponent } from './projects/projects-list/projects-list.component';
import { ProjectDetailComponent } from './projects/project-detail/project-detail.component';
import { TasksComponent } from './tasks/tasks.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: AuthComponent },
  { path: 'register', component: AuthComponent },
  { path: 'app', canActivate: [AuthGuard], component: HomeComponent, children: [
    { path: 'tasks', component: TasksComponent},
    { path: 'projects', component: ProjectsComponent, children: [
      { path: '', component: ProjectsListComponent },
      { path: 'create', component: ProjectsCreateComponent },
      { path: ':id', component: ProjectDetailComponent }
    ] },
    { path: 'timer', component: TimerComponent },
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }