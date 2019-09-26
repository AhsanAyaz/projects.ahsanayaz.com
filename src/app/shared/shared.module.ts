import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalDirective } from './directives/portal/portal.directive';



@NgModule({
  declarations: [PortalDirective],
  imports: [
    CommonModule
  ],
  exports: [
    PortalDirective
  ]
})
export class SharedModule { }
