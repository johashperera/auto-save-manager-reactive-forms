import { InjectionToken } from '@angular/core';
import { IAutoSaveConsumer } from './auto-save-consumer.interface';
export const AUTOSAVECONSUMER = new InjectionToken<IAutoSaveConsumer>(
  'autoSaveForm',
);
