import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterPortfolioModuleComponent } from './master-portfolio-module.component';



@NgModule({
  declarations: [
    MasterPortfolioModuleComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MasterPortfolioModuleComponent
  ]
})
export class MasterPortfolioModuleModule { }
