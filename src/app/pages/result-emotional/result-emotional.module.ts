import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared.module';
import { ResultEmotionalComponent } from './result-emotional.component';
import { ChartsModule } from 'ng2-charts';
import { Ng5SliderModule } from 'ng5-slider';
import { NgxPrintModule } from 'ngx-print';

const routes: Routes = [
  { path: '', component: ResultEmotionalComponent },
];

@NgModule({
  declarations: [
    ResultEmotionalComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    ChartsModule,
    Ng5SliderModule,
    NgxPrintModule
  ],
  exports: [RouterModule],
})
export class ResultEmotionalModule { }
