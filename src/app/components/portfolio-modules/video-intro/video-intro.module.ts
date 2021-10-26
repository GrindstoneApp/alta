import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterPortfolioModuleModule } from '../../master-portfolio-module/master-portfolio-module.module';
import { VideoIntroComponent } from './video-intro.component';



@NgModule({
  declarations: [
    VideoIntroComponent
  ],
  imports: [
    CommonModule,
    MasterPortfolioModuleModule
  ],
  exports: [
    VideoIntroComponent
  ]
})
export class VideoIntroModule { }
