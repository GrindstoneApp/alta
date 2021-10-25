import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddModuleComponent } from './add-module.component';
import { ModalModule } from '../modal/modal.module';



@NgModule({
  declarations: [
    AddModuleComponent
  ],
  imports: [
    CommonModule,
    ModalModule
  ],
  exports: [
    AddModuleComponent
  ]
})
export class AddModuleModule { }
