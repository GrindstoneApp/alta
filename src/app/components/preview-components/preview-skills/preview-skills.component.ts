import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-preview-skills',
  templateUrl: './preview-skills.component.html',
  styleUrls: ['./preview-skills.component.scss']
})
export class PreviewSkillsComponent implements OnInit {

  @Input() data: any = {
    moduleTitle: '',
    customData: {}
  }

  constructor() { }

  ngOnInit(): void {
    console.log(this.data);
  }

}
