import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlansComponent } from './plans.component'
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared.module';

const routes: Routes = [
  { path: '', component: PlansComponent },
];

@NgModule({
  declarations: [
    PlansComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class PlansModule { }
