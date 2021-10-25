import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Portfolio } from 'src/providers/portfolio.provider';
import { RequestService } from 'src/services/http/request.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

  portfolioID: number | null = null
  routeStr: string | null = null

  portfolio: any = {
    "id": 20,
    "user_id": 6,
    "status": {
      "id": 1,
      "name": "Active",
      "short_name": "active"
    },
    "profile": {
      "display_name": "Jackson Lawrence",
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
    "inserted_at": "2021-10-24T17:16:28Z",
    "updated_at": "2021-10-24T17:16:28Z"
  }
  stringPortfolio: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private request: RequestService,
  ) { }

  ngOnInit(): void {
    // const routeParams = this.route.snapshot.paramMap;
    // this.routeStr = String(routeParams.get('route'));
    // if (this.routeStr) {
    //   this.getPortfolio();
    // }
    console.log(this.portfolio);
  }

  async getPortfolio(): Promise<void> {
    try {
      const response: any = await this.request.get(`${environment.API_URL}/ptfl/grab/portfolioByRoute/${this.routeStr}`)
      console.log(response)
      this.portfolio = response;
      this.stringPortfolio = JSON.stringify(this.portfolio, null, 2);
    } catch(err) { 
      console.error(err)
    }
  }

}
