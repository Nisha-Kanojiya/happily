import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared.module';
import { SolutionsComponent } from './solutions.component';
const routes: Routes = [
  { path: '', component: SolutionsComponent },
];

@NgModule({
  declarations: [
    SolutionsComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule
  ],
  exports: [RouterModule],
})
export class SolutionsModule { }
