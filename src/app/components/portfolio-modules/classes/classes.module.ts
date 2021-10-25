import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterPortfolioModuleModule } from '../../master-portfolio-module/master-portfolio-module.module';
import { ClassesComponent } from './classes.component';



@NgModule({
  declarations: [
    ClassesComponent
  ],
  imports: [
    CommonModule,
    MasterPortfolioModuleModule
  ],
  exports: [
    ClassesComponent
  ]
})
export class ClassesModule { }
