import { ElementRef, EventEmitter, QueryList } from '@angular/core';
import { FormGroup } from '@angular/forms';

interface FormStatus {
  isFormValid: boolean;
  isFormDirty: boolean;
}

export interface IAutoSaveConsumer {
  form: FormGroup;
  formInputElements: QueryList<ElementRef>;
  formData: unknown | null;

  autoSave: EventEmitter<unknown>;
  formValuesChange: EventEmitter<unknown>;
  formStatus: EventEmitter<FormStatus>;

  visitedRoutes: string[] | null;

  validate: () => void;
}
