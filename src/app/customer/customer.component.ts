import { Component } from '@angular/core';
import { ConfirmationModalService } from '../util/confirmation-modal.service';
import { CustomerFormData } from './customer-form/customer-model';

interface FormStatus {
  isFormValid: boolean;
  isFormDirty: boolean;
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent {
  recommendedFieldsFilled: boolean = true;

  constructor(private confirmationModalService: ConfirmationModalService) {}

  onFormValueChanges(formData: CustomerFormData): void {
    console.log('FormValueChanges', formData);
  }

  onSave(formData: CustomerFormData): void {
    console.log('Auto save triggered');
  }

  onFormStatusChange(formStatus: FormStatus): void {
    // console.log(formStatus);
  }

  onRecommendedFieldsFilled(status: boolean): void {
    // console.log('recommendedFieldsFilled', status);
    this.recommendedFieldsFilled = status;
  }

  canLeaveWithRecommendedFields(): Promise<boolean> | boolean {
    if (!this.recommendedFieldsFilled) {
      return this.confirmationModalService.showConfirmationModal();
    } else {
      return true;
    }
  }
}
