import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LandingGuard } from './guards/landing.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'editor',
    pathMatch: 'full',
  },
  {
    path: 'auth/cb',
    loadChildren: () => import('./auth/cb/cb.module').then((m) => m.CbModule),
    canLoad: [LandingGuard],
    canActivate: [LandingGuard],
  },
  {
    path: 'editor',
    loadChildren: () =>
      import('./editor/editor.module').then((m) => m.EditorModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    data: {
      seo: {
        title: 'Grindstone | Editor',
      },
    },
  },
  {
    path: 'preview',
    loadChildren: () =>
      import('./preview/preview.module').then((m) => m.PreviewModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    data: {
      seo: {
        title: 'Grindstone Portfolios',
      },
    },
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
  },
  {
    path: 'l/:listingID',
    loadChildren: () =>
      import('./redirectors/listing/listing.module').then(
        (m) => m.ListingModule
      ),
    data: {
      seo: {
        title: 'Check out this Grindstone job!',
        metaTags: [
          {
            name: 'description',
            content: 'Check out this job that was posted using Grindstone!',
          },
          { property: 'og:title', content: 'Check out this job!' },
          {
            property: 'og:description',
            content: 'Check out this job that was posted using Grindstone!',
          },
          {
            property: 'og:image',
            content: 'https://grindstoneapp.com/assets/meta/socialImage.png',
          },
          { property: 'og:url', content: 'https://grst.one/l/128' },
          { name: 'twitter:card', content: 'summary_large_image' },
        ],
      },
    },
  },
  {
    path: ':route',
    loadChildren: () =>
      import('./preview/preview.module').then((m) => m.PreviewModule),
    data: {
      seo: {
        title: 'Grindstone Portfolios',
      },
    },
  },
  {
    path: 'auth/logout',
    loadChildren: () =>
      import('./auth/logout/logout.module').then((m) => m.LogoutModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
