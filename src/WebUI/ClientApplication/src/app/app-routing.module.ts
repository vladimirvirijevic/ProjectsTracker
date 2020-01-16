import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { TimerComponent } from './timer/timer.component';
import { ProjectsComponent } from './projects/projects.component';
import { AuthGuard } from './_helpers';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: AuthComponent },
  { path: 'register', component: AuthComponent },
  { path: 'app', canActivate: [AuthGuard], component: HomeComponent, children: [
    { path: 'projects', component: ProjectsComponent },
    { path: 'timer', component: TimerComponent },
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }