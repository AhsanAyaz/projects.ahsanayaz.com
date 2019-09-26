import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OpenSourceComponent } from './open-source.component';
import {ProjectDetailsComponent} from './project-details/project-details.component';

const routes: Routes = [{
  path: '',
  component: OpenSourceComponent
}, {
  path: ':id',
  component: ProjectDetailsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpenSourceRoutingModule { }
