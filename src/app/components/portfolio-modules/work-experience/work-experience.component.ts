import { Component, OnInit, Input } from '@angular/core';

import { PortfolioModuleData } from '../portfolio-module-data';

@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.scss']
})
export class WorkExperienceComponent implements OnInit {

  @Input() id: any;
  @Input() data: PortfolioModuleData = {
    title: '',
    formData: {},
    removeCallback: () => {}
  };

  constructor() { }

  ngOnInit(): void {
    console.log(this.data);
    console.log(this.id);
  }

  delete(): void {
    this.data?.removeCallback();
  }

}
