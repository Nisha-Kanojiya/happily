import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared.module';
import { LogInComponent } from './login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LogInComponent },

];

@NgModule({
  declarations: [
    LogInComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  exports: [RouterModule],
})
export class LogInModule { }
