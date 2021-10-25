import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreviewComponent } from './preview.component';
import { PreviewRoutingModule } from './preview-routing.module';
import { PreviewWorkExperienceModule } from '../components/preview-components/preview-work-experience/preview-work-experience.module';
import { PreviewSkillsModule } from '../components/preview-components/preview-skills/preview-skills.module';



@NgModule({
  declarations: [
    PreviewComponent
  ],
  imports: [
    CommonModule,
    PreviewRoutingModule,
    PreviewWorkExperienceModule,
    PreviewSkillsModule,
  ]
})
export class PreviewModule { }
