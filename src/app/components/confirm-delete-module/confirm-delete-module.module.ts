import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDeleteModuleComponent } from './confirm-delete-module.component';
import { ModalModule } from '../modal/modal.module';



@NgModule({
  declarations: [
    ConfirmDeleteModuleComponent
  ],
  imports: [
    CommonModule,
    ModalModule
  ],
  exports: [
    ConfirmDeleteModuleComponent
  ]
})
export class ConfirmDeleteModuleModule { }
