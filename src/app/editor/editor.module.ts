import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './editor.component';
import { EditorRoutingModule } from './editor-routing.module';
import { TutorialModule } from '../components/tutorial/tutorial.module';



@NgModule({
  declarations: [
    EditorComponent
  ],
  imports: [
    CommonModule,
    EditorRoutingModule,
    TutorialModule
  ]
})
export class EditorModule { }
