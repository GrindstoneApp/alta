import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterPortfolioModuleModule } from '../../master-portfolio-module/master-portfolio-module.module';
import { ClubsComponent } from './clubs.component';



@NgModule({
  declarations: [
    ClubsComponent
  ],
  imports: [
    CommonModule,
    MasterPortfolioModuleModule
  ],
  exports: [
    ClubsComponent
  ]
})
export class ClubsModule { }
