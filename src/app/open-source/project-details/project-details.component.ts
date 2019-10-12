import { Component, OnInit } from '@angular/core';
import { GithubApiService } from '../../core/services/github-api/github-api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'aa-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  project: any;
  isPortal = false;
  constructor(
    private githubApi: GithubApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe((params) => {
        this.getProject(params.id);
      });
    this.route.queryParams
      .subscribe(params => {
        this.isPortal = !!params.portal;
        if (this.isPortal) {
          document.body.classList.add('is-portal');
        } else {
          document.body.classList.remove('is-portal');
        }
      });
  }

  getProject(id) {
    this.githubApi.getProjects()
      .subscribe(projects => {
        // tslint:disable-next-line:triple-equals
        this.project = projects.find(proj => proj.id == id);
      });
  }

}
