import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared.module';
import { ContactComponent } from './contact-us.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: ContactComponent },
];

@NgModule({
  declarations: [
    ContactComponent,
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
export class ContactModule { }
