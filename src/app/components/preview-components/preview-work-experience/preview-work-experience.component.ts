import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-preview-work-experience',
  templateUrl: './preview-work-experience.component.html',
  styleUrls: ['./preview-work-experience.component.scss']
})
export class PreviewWorkExperienceComponent implements OnInit {

  @Input() data: any = {
    moduleTitle: '',
    customData: {}
  }

  constructor() { }

  ngOnInit(): void {
    console.log(this.data);
  }

}
