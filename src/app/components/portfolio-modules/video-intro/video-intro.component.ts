import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RequestService } from 'src/services/http/request.service';

import { PortfolioModuleData } from '../portfolio-module-data';

@Component({
  selector: 'app-video-intro',
  templateUrl: './video-intro.component.html',
  styleUrls: ['./video-intro.component.scss']
})
export class VideoIntroComponent implements OnInit {

  timeout: any;

  @Input() id: any;
  @Input() data: PortfolioModuleData = {
    title: '',
    icon: '',
    formData: {},
    removeCallback: () => {}
  };

  constructor(
    private request: RequestService
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    console.log(this.id);
  }

  delete(): void {
    this.data?.removeCallback();
  }

  formKeyup(e: any): void {
    // throttle saves
    const value = (e.currentTarget as HTMLInputElement).value
    const key = e.target.getAttribute("data-keyid")
    this.data.formData[key] = value
    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      this.saveModuleData()
    }, 500)
  }

  async saveModuleData() {
    try {
      const data_to_update = Object.assign({}, this.data.formData)
      const data = {
        module_id: this.id,
        data_to_update
      }
      const response: any = await this.request.post(`${environment.API_URL}/ptfl/update/module`, data)
      return
    } catch(err) { 
     console.error(err)
    }
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
