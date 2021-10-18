import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TutorialComponent } from './tutorial.component';
import { ModalModule } from '../modal/modal.module';

@NgModule({
  declarations: [
    TutorialComponent
  ],
  imports: [
    CommonModule,
    ModalModule
  ],
  exports: [
    TutorialComponent
  ]
})
export class TutorialModule { }
