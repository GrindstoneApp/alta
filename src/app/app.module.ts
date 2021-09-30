import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RequestService } from 'src/services/http/request.service';
import { ErrorService } from 'src/services/qas/error.service';
import { PaginationService } from 'src/services/routing/pagination.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SessionService } from 'src/services/auth/session.service';
import { StorageService } from 'src/services/storage/storage.service';
import { SeoService } from 'src/services/routing/seo.service';


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
    StorageService,
    SessionService,
    ErrorService,
    PaginationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
