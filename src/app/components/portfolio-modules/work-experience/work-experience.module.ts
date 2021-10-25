import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkExperienceComponent } from './work-experience.component';
import { MasterPortfolioModuleModule } from '../../master-portfolio-module/master-portfolio-module.module';



@NgModule({
  declarations: [
    WorkExperienceComponent
  ],
  imports: [
    CommonModule,
    MasterPortfolioModuleModule
  ],
  exports: [
    WorkExperienceComponent
  ]
})
export class WorkExperienceModule { }
