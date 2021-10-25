import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/services/app-components/modal.service';

@Component({
  selector: 'app-add-module',
  templateUrl: './add-module.component.html',
  styleUrls: ['./add-module.component.scss']
})
export class AddModuleComponent implements OnInit {

  constructor(
    private modalService: ModalService
  ) { }

  ngOnInit(): void {

  }
  
  close(): void {
    this.modalService.close("add-module");
  }

}
