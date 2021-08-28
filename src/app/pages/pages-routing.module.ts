import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { PagesComponent } from './pages.component';
import { LoginGuard, RoleGuard, VerifyTokenGuard } from '../guards/guards';
import { SavingsAccountComponent } from './savings-account/savings-account.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [LoginGuard, VerifyTokenGuard],
    canActivateChild: [RoleGuard],
    runGuardsAndResolvers: 'always',
    data: { roles: ['CLIENT'] },
    children: [
      {
        path: 'inicio',
        component: SavingsAccountComponent,
        data: { showRootComponents: true },
      },
      { path: '', redirectTo: '/inicio', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
