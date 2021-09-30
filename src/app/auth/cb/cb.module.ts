import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CbRoutingModule } from './cb-routing.module';
import { CbComponent } from './cb.component';


@NgModule({
  declarations: [
    CbComponent
  ],
  imports: [
    CommonModule,
    CbRoutingModule
  ]
})
export class CbModule { }
