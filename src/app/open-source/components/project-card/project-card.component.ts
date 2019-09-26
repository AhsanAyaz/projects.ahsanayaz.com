import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'aa-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {
  @Input() project: any;
  constructor() { }

  ngOnInit() {
  }

  starProject(project) {
    project.starred = !project.starred;
  }

}
