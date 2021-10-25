import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './editor.component';
import { EditorRoutingModule } from './editor-routing.module';
import { TutorialModule } from '../components/tutorial/tutorial.module';
import { ShareLinkModule } from '../components/share-link/share-link.module';
import { VideoModule } from '../components/video/video.module';
import { AddModuleModule } from '../components/add-module/add-module.module';
import { WorkExperienceModule } from '../components/portfolio-modules/work-experience/work-experience.module';



@NgModule({
  declarations: [
    EditorComponent
  ],
  imports: [
    CommonModule,
    EditorRoutingModule,
    TutorialModule,
    ShareLinkModule,
    VideoModule,
    TutorialModule,
    AddModuleModule,
    WorkExperienceModule
  ]
})
export class EditorModule { }
