import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PortfolioProvider } from 'src/providers/portfolio.provider';
import { ModalService } from 'src/services/app-components/modal.service';
import { SessionService } from 'src/services/auth/session.service';
import { RequestService } from 'src/services/http/request.service';
import { PortfolioService } from 'src/services/portfolio/portfolio.service';

@Component({
  selector: 'app-add-module',
  templateUrl: './add-module.component.html',
  styleUrls: ['./add-module.component.scss']
})
export class AddModuleComponent implements OnInit {

  public modules: Array<any> = [];

  constructor(
    private modalService: ModalService,
    private request: RequestService,
    private session: SessionService,
    private portfolio: PortfolioProvider,
    private portfolioService: PortfolioService
  ) { }

  async ngOnInit(): Promise<void> {
    this.modules = await this.portfolioService.getModules() || [];
    console.log(this.modules);
  }

  async addModule(id: number): Promise<void> {
    // add module
    try {
      const data = {
        portfolio_id: this.portfolio.get().id,
        type: id,
      }
      const response: any = await this.request.post(`${environment.API_URL}/ptfl/create/module`, data)
      console.log(response);
      this.close();
      this.session.initializePortfolio();
    } catch(err) { 
      console.error(err)
    }
  }
  
  close(): void {
    this.modalService.close("add-module");
  }

}
