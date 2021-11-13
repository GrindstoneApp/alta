import { Component, OnInit, Input, ViewChild } from '@angular/core';
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
  @ViewChild('linkInput') linkInput: any; 
  newUrl: string = '';
  isProfilePublic = false;
  changes = false;
  saving = false;

  constructor(
    private modalService: ModalService,
    private portfolio: PortfolioProvider,
    private request: RequestService,
    private session: SessionService,
    private editor: EditorComponent,
  ) { }

  ngOnInit(): void {

  }

  togglePublicProfile(e: any): void {
    this.isProfilePublic = !this.isProfilePublic;
  }


  close(): void {
    this.modalService.close("share-link");
  }

  copyLink(): void {
    navigator.clipboard.writeText(`https://grst.one/${this.url}`);
    this.close();
  }

  input(e: any): void {
    const elem = e.target;
    const val = elem.value;
    this.newUrl = val;
    this.changes = this.newUrl != this.url;
  }

  saveChanges(): void {
    this.saving = true;
    setTimeout(() => { // Remove settimout after adding post
      if(true) { // IF LINK IS AVAILABLE AND CLAIMED
        this.saving = false;
        this.changes = false;
        this.url = this.newUrl;
      } else { // IF LINK IS NOT AVAILABLE
        this.saving = false;
        // I will add alerts once I create a service for them
      }
    }, 300);
  }

  cancelChanges(): void {
    this.changes = false;
    this.newUrl = '';
    this.linkInput.nativeElement.value = this.url;
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
