import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{
  path: '',
  redirectTo: 'open-source',
  pathMatch: 'full'
}, {
  path: 'open-source',
  loadChildren: () => import('./open-source/open-source.module').then(m => m.OpenSourceModule)
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
