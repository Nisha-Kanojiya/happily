import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HowHappyYouDetailsComponent } from './how-happy-you-details.component';
import { SharedModule } from 'src/app/shared.module';


const routes: Routes = [
  { path: '', component: HowHappyYouDetailsComponent },
];


@NgModule({
  declarations: [HowHappyYouDetailsComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule
  ]
})
export class HowHappyYouDetailsModule { }
