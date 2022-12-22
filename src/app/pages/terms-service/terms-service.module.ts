import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared.module';
import { TermsServiceComponent } from './terms-service.component';

const routes: Routes = [
  { path: '', component: TermsServiceComponent },
];

@NgModule({
  declarations: [
    TermsServiceComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule
  ],
  exports: [RouterModule],
})
export class TermsModule { }
