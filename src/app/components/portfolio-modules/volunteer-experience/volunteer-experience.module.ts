import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VolunteerExperienceComponent } from './volunteer-experience.component';
import { MasterPortfolioModuleModule } from '../../master-portfolio-module/master-portfolio-module.module';



@NgModule({
  declarations: [
    VolunteerExperienceComponent
  ],
  imports: [
    CommonModule,
    MasterPortfolioModuleModule
  ],
  exports: [
    VolunteerExperienceComponent
  ]
})
export class VolunteerExperienceModule { }
