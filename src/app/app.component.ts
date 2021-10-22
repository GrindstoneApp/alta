import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SessionService } from 'src/services/auth/session.service';
import { filter, map, mergeMap, tap } from 'rxjs/operators';
import { SeoService } from 'src/services/routing/seo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {


  constructor(
    private session: SessionService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private seoService: SeoService
  ) {}

  async ngOnInit() {

    this.router.events
      .pipe(
        filter((e: any) => e instanceof NavigationEnd),
        map((e: any) => this.activatedRoute),
        map((route) => {
          while (route.firstChild) route = route.firstChild;
          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        mergeMap((route) => route.data)
      )
      .subscribe((data) => {
        let seoData = data['seo'];

        if(!seoData) return;

        if(seoData['title']) {
          this.seoService.updateTitle(seoData['title']);
        }
        if(seoData['metaTags']) {
          this.seoService.updateMetaTags(seoData['metaTags']);
        }
      });

    
  }

  async initialize(): Promise<void> {
    try {
      console.log('Initial AppComp');
      await this.session.initialize(); 
      console.log('return');
      return;
    } catch(err) {
      this.session.logout();
      console.error(err)
    }
  }
}
