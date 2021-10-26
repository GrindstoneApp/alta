import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './editor.component';
import { EditorRoutingModule } from './editor-routing.module';
import { TutorialModule } from '../components/tutorial/tutorial.module';
import { ShareLinkModule } from '../components/share-link/share-link.module';
import { VideoModule } from '../components/video/video.module';
import { AddModuleModule } from '../components/add-module/add-module.module';
import { WorkExperienceModule } from '../components/portfolio-modules/work-experience/work-experience.module';
import { VolunteerExperienceModule } from '../components/portfolio-modules/volunteer-experience/volunteer-experience.module';
import { ClubsModule } from '../components/portfolio-modules/clubs/clubs.module';
import { ClassesModule } from '../components/portfolio-modules/classes/classes.module';
import { SkillsModule } from '../components/portfolio-modules/skills/skills.module';
import { InterestsModule } from '../components/portfolio-modules/interests/interests.module';
import { VideoIntroModule } from '../components/portfolio-modules/video-intro/video-intro.module';



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
    VideoIntroModule,
    TutorialModule,
    AddModuleModule,
    WorkExperienceModule,
    SkillsModule,
    InterestsModule,
    ClubsModule,
    ClassesModule,
    VolunteerExperienceModule,
  ]
})
export class EditorModule { }
