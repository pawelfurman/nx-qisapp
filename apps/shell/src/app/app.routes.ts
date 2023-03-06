import { NxWelcomeComponent } from './nx-welcome.component';
import { Route } from '@angular/router';
import { AuthTokenGuard } from '@qisapp/utils/auth';

export const appRoutes: Route[] = [
  {
    path: '',
    children: [
      {
        path: 'access',
        loadChildren: () => import('access/Routes').then((m) => m.remoteRoutes),
      },
      {
        path: 'database',
        canActivate: [AuthTokenGuard],
        loadChildren: () =>
          import('database/Routes').then((m) => m.remoteRoutes),
      },
      {
        path: 'insights',
        canActivate: [AuthTokenGuard],
        loadChildren: () =>
          import('insights/Routes').then((m) => m.remoteRoutes),
      },
      {
        path: '',
        canActivate: [AuthTokenGuard],
        component: NxWelcomeComponent,
      },
    ],
  },
];
