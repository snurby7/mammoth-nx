import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DashboardLoadGuard } from './dashboard.guard';

const routes: Routes = [
  {
    path: 'v1/:budgetId',
    component: DashboardComponent,
    canActivate: [DashboardLoadGuard],
    children: [
      {
        path: 'account',
        loadChildren: () =>
          import('../account/account.module').then((m) => m.AccountModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [DashboardLoadGuard],
})
export class DashboardRoutingModule {}
