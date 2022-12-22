import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared.module';
import { MoreBenefitsComponent } from './more-benefits.component';

const routes: Routes = [
  { path: '', component: MoreBenefitsComponent },
];

@NgModule({
  declarations: [
    MoreBenefitsComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule
  ],
  exports: [RouterModule],
})
export class MoreBenefitsModule { }
