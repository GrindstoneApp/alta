import { Component, OnInit, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Portfolio } from 'src/providers/portfolio.provider';
import { RequestService } from 'src/services/http/request.service';
import { InterestsComponent } from '../components/portfolio-modules/interests/interests.component';
import { SkillsComponent } from '../components/portfolio-modules/skills/skills.component';
import { PreviewSkillsComponent } from '../components/preview-components/preview-skills/preview-skills.component';
import { PreviewWorkExperienceComponent } from '../components/preview-components/preview-work-experience/preview-work-experience.component';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

  @ViewChild('previewModulesContainer', {read: ViewContainerRef}) previewModulesContainer?: ViewContainerRef;

  portfolioID: number | null = null
  routeStr: string | null = null

  loaded: boolean = false;

  portfolio: any = {
    "id": 20,
    "user_id": 6,
    "status": {
      "id": 1,
      "name": "Active",
      "short_name": "active"
    },
    "profile": {
      "display_name": "",
      "display_email": true,
      "bio": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. incididunt ut labore et do",
      "external_link": "jlawrence.io",
      "pronouns": "he/him",
      "location": "Boston, MA",
      "video_url": null,
      "inserted_at": "2021-10-24T17:16:28Z",
      "updated_at": "2021-10-24T17:16:28Z"
    },
    "user": {
      "profile_image_url": "https://user-content.grindstoneapp.com/profile_pictures/6.jpeg"
    },
    "routes": [
      {
        "id": 11,
        "url": "test",
        "active": true,
        "inserted_at": "2021-10-24T20:53:43Z"
      },
      {
        "id": 13,
        "url": "jlawrence",
        "active": true,
        "inserted_at": "2021-10-24T21:26:42Z"
      }
    ],
    modules: [
      {
        module_type: {
          id: 1,
          name: 'Work Experience'
        },
        data: {
          title: "Lorem Ipsum Dolor Sit",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae suscipit tellus mauris a diam maecenas. Odio eu feugiat pretium nibh."
        }
      }
    ],
    "inserted_at": "2021-10-24T17:16:28Z",
    "updated_at": "2021-10-24T17:16:28Z"
  }
  stringPortfolio: string | null = null;
  private components: any = {
    "component-1": PreviewWorkExperienceComponent,
    "component-2": PreviewWorkExperienceComponent,
    "component-3": PreviewSkillsComponent,
    "component-4": PreviewWorkExperienceComponent,
    "component-5": PreviewWorkExperienceComponent,
    "component-6": PreviewSkillsComponent,
  }

  constructor(
    private route: ActivatedRoute,
    private request: RequestService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;

    this.routeStr = String(routeParams.get('route'));
    if (this.routeStr) {
      this.getPortfolio();
    }


    // -------- IMPORTANT --------
    // To work on page locally, edit the portfolio object above and comment out
    // all the lines above

    // Then uncomment the line below

    // setTimeout(() => {
    //   this.addAllComponents();
    // }, 200);

  }

  async getPortfolio(): Promise<void> {
    try {
      const response: any = await this.request.get(`${environment.API_URL}/ptfl/grab/portfolioByRoute/${this.routeStr}`)
      console.log(response)
      this.portfolio = response;
      this.addAllComponents();
      this.stringPortfolio = JSON.stringify(this.portfolio, null, 2);
      console.log(this.stringPortfolio)
    } catch(err) {
      console.error(err)
    }
  }

  addAllComponents(): void {
    this.portfolio.modules.forEach((m: any) => {
      const data = {
        moduleTitle: m.module_type.name,
        customData: m.data
      }
      this.addComponent(m.module_type.id, data);
    })
  }

  addComponent(type: number, data: any = {}): void {
    const componentClass = this.components[`component-${type}`];
    if(!componentClass) return;
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
    const component = this.previewModulesContainer?.createComponent(componentFactory);
    (component as any).instance.data = data;
  }

}
