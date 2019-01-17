import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'customers', loadChildren: './customers-list/customers-list.module#CustomersListPageModule' },
  { path: 'customers/view/:id', loadChildren: './customers-view/customers-view.module#CustomersViewPageModule' },
  { path: 'customers/edit/:id', loadChildren: './customers-edit/customers-edit.module#CustomersEditPageModule' },
  { path: 'customers/edit/', loadChildren: './customers-edit/customers-edit.module#CustomersEditPageModule' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
