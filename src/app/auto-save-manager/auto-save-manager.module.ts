import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoSaveManagerComponent } from './auto-save-manager.component';

@NgModule({
  declarations: [AutoSaveManagerComponent],
  exports: [AutoSaveManagerComponent],
  imports: [CommonModule],
})
export class AutoSaveManagerModule {}
