import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ControlsComponent } from './controls/controls.component';

const routes: Routes = [
  {
    path: '', component: ControlsComponent
  },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
