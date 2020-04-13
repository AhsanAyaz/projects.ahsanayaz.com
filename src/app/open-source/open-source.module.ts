import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OpenSourceRoutingModule } from './open-source-routing.module';
import { OpenSourceComponent } from './open-source.component';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ProjectCardComponent } from './components/project-card/project-card.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [OpenSourceComponent, ProjectCardComponent, ProjectDetailsComponent],
  imports: [
    CommonModule,
    OpenSourceRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    RouterModule,
    SharedModule
  ]
})
export class OpenSourceModule { }
