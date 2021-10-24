import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from 'src/services/app-components/modal.service';

@Component({
  selector: 'app-share-link',
  templateUrl: './share-link.component.html',
  styleUrls: ['./share-link.component.scss']
})
export class ShareLinkComponent implements OnInit {

  @Input() url: string = '';

  constructor(
    private modalService: ModalService
  ) { }

  ngOnInit(): void {

  }

  close(): void {
    this.modalService.close("share-link");
  }

  copyLink(): void {
    navigator.clipboard.writeText(`https://grst.one/${this.url}`);
    this.close();
  }

}
