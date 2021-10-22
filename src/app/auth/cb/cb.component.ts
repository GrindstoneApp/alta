import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionService } from 'src/services/auth/session.service';
import { PaginationService } from 'src/services/routing/pagination.service';

@Component({
  selector: 'app-cb',
  templateUrl: './cb.component.html',
  styleUrls: ['./cb.component.scss']
})
export class CbComponent implements OnInit {

  pageParams = ''
  params: any = {}

  constructor(
    private route: ActivatedRoute,
    private pagination: PaginationService,
    private session: SessionService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.pageParams = JSON.stringify(params, null, 4)
      if (params) {
        this.params = params
        this.initialize();
      }
    })
  }

  async initialize(): Promise<void> {
    try {
      const session = await this.session.sessionInService();
      if (session) {console.log("Session Exists"); this.pagination.rootToPage('/editor'); return;}
      
      if (this.params.accessToken && this.params.refreshToken) {
        await this.session.begin({accessToken: this.params.accessToken, refreshToken: this.params.refreshToken});
        await this.session.initialize();
        this.pagination.rootToPage('/editor')
      } else {
        this.pagination.rootToPage('/')
        window.alert('failed to initialize session as the access token and refresh token does not exist')
      }
    } catch(err) {
      
    }
  }

}
