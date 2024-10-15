import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AutoSaveManagerModule } from '../auto-save-manager/auto-save-manager.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CustomerComponent, CustomerFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AutoSaveManagerModule,
    RouterModule.forChild([
      {
        path: '',
        component: CustomerComponent,
        pathMatch: 'full',
      },
    ]),
  ],
})
export class CustomerModule {}
