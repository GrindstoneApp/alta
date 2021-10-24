import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './editor.component';
import { EditorRoutingModule } from './editor-routing.module';
import { TutorialModule } from '../components/tutorial/tutorial.module';
import { ShareLinkModule } from '../components/share-link/share-link.module';



@NgModule({
  declarations: [
    EditorComponent
  ],
  imports: [
    CommonModule,
    EditorRoutingModule,
    TutorialModule,
    ShareLinkModule
  ]
})
export class EditorModule { }
