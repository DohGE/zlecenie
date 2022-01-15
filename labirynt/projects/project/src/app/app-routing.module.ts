import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutsComponent } from './core/layouts/layouts.component';
import { AuthGuard } from './modules/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutsComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/home/home.module').then((x) => x.HomeModule),
      },
      {
        path: 'create',
        loadChildren: () =>
          import('./modules/create/create.module').then((x) => x.CreateModule),
      },
      {
        path: 'custom',
        loadChildren: () =>
          import('./modules/custom/custom.module').then((x) => x.CustomModule),
      },
      {
        path: 'games',
        loadChildren: () =>
          import('./modules/games/games.module').then((x) => x.GamesModule),
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./modules/user/user.module').then((x) => x.UserModule),
      },
      {
        path: 'play',
        loadChildren: () =>
          import('./modules/game-play/game-play.module').then(
            (x) => x.GamePlayModule
          ),
      },
    ],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((x) => x.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
