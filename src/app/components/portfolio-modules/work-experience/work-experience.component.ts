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
    icon: '',
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

  formKeyup(e: any): void {
    // throttle saves
  }

  formInputFocused(e: any): void {
    const elem = e.target;
    const labelElem = elem.nextSibling;

    labelElem.classList.add('active');
  }

  formInputBlurred(e: any): void {
    const elem = e.target;
    const val = elem.value;
    const labelElem = elem.nextSibling;

    if(val.trim().length > 0) return;
    
    labelElem.classList.remove('active');
  }

}
