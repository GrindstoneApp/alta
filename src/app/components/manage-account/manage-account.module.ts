import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageAccountComponent } from './manage-account.component';
import { ModalModule } from '../modal/modal.module';



@NgModule({
  declarations: [
    ManageAccountComponent
  ],
  imports: [
    CommonModule,
    ModalModule
  ],
  exports: [
    ManageAccountComponent
  ]
})

export class ManageAccountModule { }
