import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from 'src/services/app-components/modal.service';

@Component({
  selector: 'app-master-portfolio-module',
  templateUrl: './master-portfolio-module.component.html',
  styleUrls: ['./master-portfolio-module.component.scss']
})
export class MasterPortfolioModuleComponent implements OnInit {

  @Input() moduleTitle: string = '';
  @Input() moduleIcon: string = '';
  @Input() removeCallback: any;
  @Input() id: any;

  public confirmDeleteActive: boolean = false;

  constructor() { }

  ngOnInit(): void {}

  deleteModule(): void {
    this.removeCallback(parseInt(this.id));
  }

  confirmDelete(): void {
    this.confirmDeleteActive = true;
  }

  cancelDelete(): void {
    this.confirmDeleteActive = false;
  }

}
