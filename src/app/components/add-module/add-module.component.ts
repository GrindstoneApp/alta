import { Component, OnInit, Input } from '@angular/core';
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

  @Input() addCallback: any;
  
  public modules: Array<any> = [];

  constructor(
    private modalService: ModalService,
    private request: RequestService,
    private portfolio: PortfolioProvider,
    private portfolioService: PortfolioService
  ) { }

  async ngOnInit(): Promise<void> {
    this.modules = await this.portfolioService.getModules() || [];
  }

  addModule(id: number): void {
    this.close();
    this.addCallback(id);
  }
  
  close(): void {
    this.modalService.close("add-module");
  }

}
