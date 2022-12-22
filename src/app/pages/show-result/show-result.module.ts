import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared.module';
import { ShowResultComponent } from './show-result.component';

const routes: Routes = [
  { path: '', component: ShowResultComponent },
];

@NgModule({
  declarations: [
    ShowResultComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule
  ],
  exports: [RouterModule],
})
export class ShowResultModule { }
