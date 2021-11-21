import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/services/auth/session.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
    private session: SessionService,
  ) { 
    this.session.logout()
  }

  ngOnInit(): void {
  }

}
