import { Component, OnInit, Input } from '@angular/core';
import { EditorComponent } from 'src/app/editor/editor.component';
import { environment } from 'src/environments/environment';
import { PortfolioProvider } from 'src/providers/portfolio.provider';
import { ModalService } from 'src/services/app-components/modal.service';
import { SessionService } from 'src/services/auth/session.service';
import { RequestService } from 'src/services/http/request.service';

@Component({
  selector: 'app-share-link',
  templateUrl: './share-link.component.html',
  styleUrls: ['./share-link.component.scss']
})
export class ShareLinkComponent implements OnInit {

  @Input() url: string = '';

  constructor(
    private modalService: ModalService,
    private portfolio: PortfolioProvider,
    private request: RequestService,
    private session: SessionService,
    private editor: EditorComponent,
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

  async claimLink(): Promise<void> {
    try {
      const route: string = String($('#claim-url-input-s').val()).trim();
      const response: any = await this.request.get(`${environment.API_URL}/ptfl/check/route/${route}`, true)
      if(response.status === 202) {
        // Available
        const data = {
          portfolio_id: this.portfolio.get().id,
          url: route,
        }
        const claimRequest: any = await this.request.post(`${environment.API_URL}/ptfl/create/route`, data)
        await this.session.initializePortfolio();
        await this.editor.setData();
        window.alert('Successfully claimed this url.')
      } else {
        // Unavailable
        window.alert('This URL is already taken.')
      }
    } catch(err) { 
      console.error(err)
    }
  }


}
