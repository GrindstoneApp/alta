import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/services/auth/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private session: SessionService
  ) {}

  ngOnInit() {
    this.initialize();
  }

  async initialize(): Promise<void> {
    console.log("Initial AppComp");
    await this.session.initialize();
    return;
  }

}
