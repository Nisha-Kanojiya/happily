import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared.module';
import { ResultComponent } from './result.component';
import { ChartsModule } from 'ng2-charts';
import  {  PdfViewerModule  }  from  'ng2-pdf-viewer';
const routes: Routes = [
  { path: '', component: ResultComponent },
];

@NgModule({
  declarations: [
    ResultComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    ChartsModule,
    PdfViewerModule
  ],
  exports: [RouterModule],
})
export class ResultModule { }
