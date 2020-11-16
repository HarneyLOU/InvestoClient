import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { AuthRoutingModule } from './app-auth-routing.module';

@NgModule({
  declarations: [LayoutComponent, LoginComponent, RegisterComponent],
  imports: [CommonModule, ReactiveFormsModule, AuthRoutingModule],
})
export class AppAuthModule {}
