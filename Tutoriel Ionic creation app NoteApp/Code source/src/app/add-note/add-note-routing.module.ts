import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddNotePage } from './add-note.page';

const routes: Routes = [
  {
    path: '',
    component: AddNotePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddNotePageRoutingModule {}
