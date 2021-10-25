import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from 'src/services/app-components/modal.service';

@Component({
  selector: 'app-confirm-delete-module',
  templateUrl: './confirm-delete-module.component.html',
  styleUrls: ['./confirm-delete-module.component.scss']
})
export class ConfirmDeleteModuleComponent implements OnInit {

  @Input() confirmCallback: any;
  
  constructor(
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
  }

  close(): void {
    this.modalService.close("confirm-delete-module");
  }

  confirm(): void {
    this.close();
    this.confirmCallback();
  }

}
