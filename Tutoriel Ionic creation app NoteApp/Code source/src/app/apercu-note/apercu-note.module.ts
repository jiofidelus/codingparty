import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApercuNotePageRoutingModule } from './apercu-note-routing.module';

import { ApercuNotePage } from './apercu-note.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApercuNotePageRoutingModule
  ],
  declarations: [ApercuNotePage]
})
export class ApercuNotePageModule {}
