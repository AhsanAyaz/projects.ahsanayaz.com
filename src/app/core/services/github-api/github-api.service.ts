import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { PINNED_REPOS } from 'src/app/data/pinned-repos';

@Injectable({
  providedIn: 'root'
})
export class GithubApiService {

  constructor(
    private http: HttpClient
  ) { }

  getProjects(): Observable<Array<any>> {
    // return this.http.get<Array<any>>(`https://api.github.com/users/ahsanayaz/repos`);
    return of(PINNED_REPOS);
  }
}
