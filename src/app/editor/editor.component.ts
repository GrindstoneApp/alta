import { Component, OnInit } from '@angular/core';
import { UserProvider } from 'src/providers/user.provider';
import { ModalService } from 'src/services/app-components/modal.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  constructor(
    private modalService: ModalService,
    public user: UserProvider,
  ) { }

  ngOnInit(): void {

  }

  openTutorialModal(): void {
    this.modalService.open("tutorial");
  }

}
