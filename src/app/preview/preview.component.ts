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

  portfolio: Portfolio | null = null
  stringPortfolio: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private request: RequestService,
  ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.routeStr = String(routeParams.get('route'));
    if (this.routeStr) {
      this.getPortfolio();
    }
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
