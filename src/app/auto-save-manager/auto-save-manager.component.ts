import {
  AfterContentInit,
  Component,
  ContentChild,
  OnDestroy,
} from '@angular/core';
import { AUTOSAVECONSUMER } from './auto-save-consumer.token';
import { IAutoSaveConsumer } from './auto-save-consumer.interface';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  Subject,
  takeUntil,
} from 'rxjs';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NavigationStart, Router } from '@angular/router';
import { omit } from 'lodash';

@Component({
  selector: 'app-auto-save-manager',
  templateUrl: './auto-save-manager.component.html',
})
export class AutoSaveManagerComponent implements AfterContentInit, OnDestroy {
  @ContentChild(AUTOSAVECONSUMER)
  autoSavableForm!: IAutoSaveConsumer;

  private autoSaveUnsubscribe = new Subject<void>();

  form!: FormGroup;

  constructor(private router: Router) {}

  ngAfterContentInit(): void {
    this.form = this.autoSavableForm.form;

    this.form.valueChanges
      .pipe(takeUntil(this.autoSaveUnsubscribe), distinctUntilChanged())
      .subscribe((formData) => {
        this.autoSavableForm.formStatus.emit({
          isFormValid: this.form.valid,
          isFormDirty: this.form.dirty,
        });
        const updatedFormData = this.getFormDataWithoutInvalidFields(formData);
        this.autoSavableForm.formValuesChange.emit(updatedFormData);
      });

    this.form.valueChanges
      .pipe(debounceTime(1000), takeUntil(this.autoSaveUnsubscribe))
      .subscribe(() => {
        if (!this.hasRequiredFields()) {
          this.autoSavableForm.autoSave.emit();
        }
      });

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationStart),
        takeUntil(this.autoSaveUnsubscribe),
      )
      .subscribe(() => {
        if (this.form.invalid && (this.form.dirty || this.form.touched)) {
          this.validateForm();
        }
      });
  }

  private hasRequiredFields(): boolean {
    const controlsWithRequiredValidator: AbstractControl[] = [];
    Object.keys(this.form.controls).forEach((controlName) => {
      const control = this.form.get(controlName);
      if (control?.hasValidator(Validators.required)) {
        controlsWithRequiredValidator.push(control);
      }
    });

    if (controlsWithRequiredValidator.length === 0) {
      return false;
    } else {
      return controlsWithRequiredValidator.some((control) =>
        control.hasError('required'),
      );
    }
  }

  private validateForm(): void {
    this.form.markAllAsTouched();
    this.autoSavableForm.validate();
    this.autoSavableForm.formStatus.emit({
      isFormValid: this.form.valid,
      isFormDirty: this.form.dirty,
    });
  }

  private getFormDataWithoutInvalidFields(formData: unknown): unknown {
    let updatedFormData;
    Object.keys(this.form.controls).forEach((controlName) => {
      const control = this.form.get(controlName);
      if (control?.invalid) {
        updatedFormData = omit(formData as any, controlName);
      }
    });

    if (!updatedFormData) {
      return formData;
    } else {
      return updatedFormData;
    }
  }

  ngOnDestroy() {
    this.autoSaveUnsubscribe.next();
  }
}
