import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApercuNotePage } from './apercu-note.page';

const routes: Routes = [
  {
    path: ':id/:index',
    component: ApercuNotePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApercuNotePageRoutingModule {}
