import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { RemoteEntryComponent } from './app/remote-entry/entry.component';
import { appRoutes } from './app/app.routes';
import { provideStore } from '@ngrx/store';

bootstrapApplication(RemoteEntryComponent, {
  providers: [
    provideStore(),
    importProvidersFrom(
      RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' })
    ),
  ],
});
