import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterPortfolioModuleModule } from '../../master-portfolio-module/master-portfolio-module.module';
import { InterestsComponent } from './interests.component';



@NgModule({
  declarations: [
    InterestsComponent
  ],
  imports: [
    CommonModule,
    MasterPortfolioModuleModule
  ],
  exports: [
    InterestsComponent
  ]
})
export class ClubsModule { }
