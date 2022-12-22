import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared.module';
import { QuestionComponent } from './question-page.component';
import { CountdownModule } from 'ngx-countdown';
import { Ng5SliderModule } from 'ng5-slider';
import { IgxProgressBarModule } from "igniteui-angular";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  { path: '', component: QuestionComponent },
];

@NgModule({
  declarations: [
    QuestionComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    CountdownModule,
    Ng5SliderModule,
    IgxProgressBarModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [RouterModule],
})
export class QuestionModule { }
