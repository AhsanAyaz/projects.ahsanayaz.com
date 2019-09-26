import { Component, OnInit } from '@angular/core';
import { GithubApiService } from '../core/services/github-api/github-api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'aa-open-source',
  templateUrl: './open-source.component.html',
  styleUrls: ['./open-source.component.scss']
})
export class OpenSourceComponent implements OnInit {
  githubProjects$: Observable<Array<any>>;
  constructor(
    private githubApi: GithubApiService
  ) { }

  ngOnInit() {
    this.githubProjects$ = this.githubApi.getProjects();
  }

}
