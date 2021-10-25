import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RequestService } from 'src/services/http/request.service';
import { PortfolioModuleData } from '../portfolio-module-data';


@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {

  timeout: any;
  skills: any = []

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
    this.getSkills();
    console.log(this.data);
    console.log(this.id);
  }

  async getSkills(): Promise<void> {
    try {
      const response: any = await this.request.get(`${environment.API_URL}/ptfl/grab/skillsList`)
      this.skills = response
      console.log(response)
    } catch (err: any) {
      console.error(err)
    }
  }

  removeSkill(id: number): void {
    this.data.formData.skills = this.data.formData.skills.filter(( obj: any ) => {
      return obj.id !== id;
    });
    this.saveModuleData();
  }

  addSkill(): void {
    const id = $('#selectskill').val()
    const match = this.skills.filter((x: any) => x.id == id)[0]

    if(this.data.formData.skills) {
      this.data.formData.skills.unshift(match)
    } else {
      this.data.formData.skills = [match]
    }
    this.saveModuleData();
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
      console.log(data)
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
