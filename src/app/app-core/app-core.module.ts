import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AlertComponent } from './components/alert/alert.component';

@NgModule({
  declarations: [AlertComponent],
  imports: [CommonModule, HttpClientModule],
  exports: [AlertComponent],
})
export class AppCoreModule {}
