import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LoginGoogleComponent } from './login-google/login-google.component';

import { AppMaterialModule } from '../app-material/app-material.module';
import { AuthRoutingModule } from './app-auth-routing.module';

@NgModule({
  declarations: [
    LayoutComponent,
    LoginComponent,
    RegisterComponent,
    LoginGoogleComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    AppMaterialModule,
  ],
})
export class AppAuthModule {}
