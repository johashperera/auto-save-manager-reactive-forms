import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {
  FormBuilder,
  FormControlName,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CustomerFormData } from './customer-model';
import { AUTOSAVECONSUMER } from '../../auto-save-manager/auto-save-consumer.token';
import { IAutoSaveConsumer } from '../../auto-save-manager/auto-save-consumer.interface';

interface FormStatus {
  isFormValid: boolean;
  isFormDirty: boolean;
}

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css'],
  providers: [
    {
      provide: AUTOSAVECONSUMER,
      useExisting: CustomerFormComponent,
    },
  ],
})
export class CustomerFormComponent implements IAutoSaveConsumer {
  form!: FormGroup;

  recommendedFields = ['firstName', 'lastName'];

  @Input()
  formData!: CustomerFormData | null | undefined;

  @Input()
  visitedRoutes: string[] | null = [];

  @Output()
  autoSave = new EventEmitter();

  @Output()
  formStatus = new EventEmitter<FormStatus>();

  @Output()
  formValuesChange = new EventEmitter();

  @Output()
  recommendedFieldsFilled = new EventEmitter();

  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements!: QueryList<ElementRef>;

  validate(): void {
    console.log('validate');
  }

  constructor(private fb: FormBuilder) {
    this.initializeForm();
  }

  initializeForm() {
    this.form = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null],
      address: [null],
      email: [null, [Validators.email]],
      company: [null],
    });
  }
}
