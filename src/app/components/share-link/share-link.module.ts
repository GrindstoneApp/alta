import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareLinkComponent } from './share-link.component';
import { ModalModule } from '../modal/modal.module';

@NgModule({
  declarations: [
    ShareLinkComponent
  ],
  imports: [
    CommonModule,
    ModalModule
  ],
  exports: [
    ShareLinkComponent
  ]
})
export class ShareLinkModule { }
