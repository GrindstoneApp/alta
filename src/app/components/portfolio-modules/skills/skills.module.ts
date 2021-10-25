import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterPortfolioModuleModule } from '../../master-portfolio-module/master-portfolio-module.module';
import { SkillsComponent } from './skills.component';



@NgModule({
  declarations: [
    SkillsComponent
  ],
  imports: [
    CommonModule,
    MasterPortfolioModuleModule
  ],
  exports: [
    SkillsComponent
  ]
})
export class SkillsModule { }
