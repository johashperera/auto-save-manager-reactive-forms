import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { DemoPageComponent } from './demo-page/demo-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/customer', pathMatch: 'full' },
  {
    path: 'customer',
    component: CustomerComponent,
  },
  { path: 'demo', component: DemoPageComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
