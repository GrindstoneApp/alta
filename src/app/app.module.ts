import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RequestService } from 'src/services/http/request.service';
import { ErrorService } from 'src/services/qas/error.service';
import { PaginationService } from 'src/services/routing/pagination.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SessionService } from 'src/services/auth/session.service';
import { StorageService } from 'src/services/storage/storage.service';
import { SeoService } from 'src/services/routing/seo.service';
import { TutorialComponent } from './components/tutorial/tutorial.component';
import { ModalService } from 'src/services/app-components/modal.service';
import { ModalComponent } from './components/modal/modal.component';
import { UserProvider } from 'src/providers/user.provider';
import { JwtInterceptor } from 'src/interceptor/jwt.interceptor';
import { PortfolioProvider } from 'src/providers/portfolio.provider';
import { PortfolioService } from 'src/services/portfolio/portfolio.service';

export function sessionServiceFactory(provider: SessionService) {
  return () => provider.initialize();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    RequestService,
    SeoService,
    PortfolioProvider,
    StorageService,
    UserProvider,
    SessionService,
    PortfolioService,
    ErrorService,
    PaginationService,
    ModalService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: APP_INITIALIZER, multi: true, useFactory: sessionServiceFactory,  deps: [SessionService]}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
