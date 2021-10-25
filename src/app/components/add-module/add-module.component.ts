import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/services/app-components/modal.service';
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
    private portfolioService: PortfolioService
  ) { }

  async ngOnInit(): Promise<void> {
    this.modules = await this.portfolioService.getModules() || [];
    console.log(this.modules);
  }

  addModule(id: number): void {
    // add module
  }
  
  close(): void {
    this.modalService.close("add-module");
  }

}
