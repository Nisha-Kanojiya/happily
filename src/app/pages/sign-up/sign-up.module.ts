import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared.module';
import { SignUpComponent } from './sign-up.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { NgxCaptchaModule } from 'ngx-captcha';
// import { CaptchaModule } from 'src/app/captcha/captcha.module';
const routes: Routes = [
  { path: '', component: SignUpComponent },
];

@NgModule({
  declarations: [
    SignUpComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    CommonModule
    // CaptchaModule,
  ],
  exports: [RouterModule],
})
export class SignUpModule { }
